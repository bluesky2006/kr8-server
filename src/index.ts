import express from "express";
import cors from "cors";
import { z } from "zod";
import { Pool } from "pg";
import "dotenv/config";

const app = express();

/**
 * IMPORTANT: base64 artwork makes payloads big.
 * Raise JSON limit to something reasonable for MVP.
 */
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgres://user:pass@localhost:5432/kr8
});

// ---- Validation (matches your payload) ----
const TrackImageSchema = z
  .object({
    mime: z.string().min(1),
    base64: z.string().min(1),
  })
  .nullable()
  .optional();

const TrackSchema = z.object({
  playlist_position: z.number().int().positive(),
  track_artist: z.string().min(1),
  track_title: z.string().min(1),
  track_bpm: z.union([z.string(), z.number()]).optional().nullable(),
  track_length: z.number().optional().nullable(),
  track_image: TrackImageSchema, // ✅
  favourite: z.boolean().optional().default(false),
});

const CreatePlaylistSchema = z.object({
  user_id: z.number().int().positive(),
  playlist_name: z.string().min(1),
  playlist_notes: z.string().optional().nullable(),
  favourite: z.boolean().optional().default(false),
  playlist_tracks: z.array(TrackSchema).default([]),
});

// ---- Routes ----

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.post("/users/:userId/playlists", async (req, res) => {
  const userIdParam = Number(req.params.userId);

  const parsed = CreatePlaylistSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.issues,
    });
  }

  const payload = parsed.data;

  // Guard: URL param must match body (prevents accidental cross-user writes)
  if (payload.user_id !== userIdParam) {
    return res.status(400).json({
      error: "user_id in body must match :userId param",
    });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const playlistInsert = await client.query(
      `
      insert into playlists (user_id, playlist_name, playlist_notes, favourite)
      values ($1, $2, $3, $4)
      returning id
      `,
      [payload.user_id, payload.playlist_name, payload.playlist_notes ?? null, payload.favourite]
    );

    const playlistId = playlistInsert.rows[0].id as number;

    // Insert tracks
    for (const t of payload.playlist_tracks) {
      const bpm = t.track_bpm == null ? null : String(t.track_bpm);

      await client.query(
        `
        insert into playlist_tracks (
          playlist_id,
          playlist_position,
          track_artist,
          track_title,
          track_bpm,
          track_length,
          favourite,
          track_image_mime,
          track_image_base64
        )
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        `,
        [
          playlistId,
          t.playlist_position,
          t.track_artist,
          t.track_title,
          bpm,
          t.track_length ?? null,
          t.favourite ?? false,
          t.track_image?.mime ?? null,
          t.track_image?.base64 ?? null,
        ]
      );
    }

    await client.query("COMMIT");
    return res.status(201).json({ id: playlistId });
  } catch (err: any) {
    await client.query("ROLLBACK");
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  } finally {
    client.release();
  }
});

app.get("/users/:userId/playlists", async (req, res) => {
  const userId = Number(req.params.userId);

  const result = await pool.query(
    `
    select id, user_id, playlist_name, playlist_notes, favourite, created_at
    from playlists
    where user_id = $1
    order by created_at desc
    `,
    [userId]
  );

  res.json(result.rows);
});

app.get("/playlists/:playlistId", async (req, res) => {
  const playlistId = Number(req.params.playlistId);

  const playlist = await pool.query(
    `
    select id, user_id, playlist_name, playlist_notes, favourite, created_at
    from playlists
    where id = $1
    `,
    [playlistId]
  );

  if (playlist.rowCount === 0) {
    return res.status(404).json({ error: "Playlist not found" });
  }

  const tracks = await pool.query(
    `
    select
      playlist_position,
      track_artist,
      track_title,
      track_bpm,
      track_length,
      favourite,
      track_image_mime,
      track_image_base64
    from playlist_tracks
    where playlist_id = $1
    order by playlist_position asc
    `,
    [playlistId]
  );

  // Shape response back into the same structure your mobile app expects
  res.json({
    ...playlist.rows[0],
    playlist_tracks: tracks.rows.map((t) => ({
      playlist_position: t.playlist_position,
      track_artist: t.track_artist,
      track_title: t.track_title,
      track_bpm: t.track_bpm ?? "",
      track_length: t.track_length ?? 0,
      favourite: t.favourite,
      track_image: t.track_image_base64
        ? { mime: t.track_image_mime, base64: t.track_image_base64 }
        : null,
    })),
  });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

const port = Number(process.env.PORT || 8787);
app.listen(port, "0.0.0.0", () => console.log(`API listening on http://0.0.0.0:${port}`));
