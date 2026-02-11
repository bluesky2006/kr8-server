create table if not exists playlists (
  id bigserial primary key,
  user_id bigint not null,
  playlist_name text not null,
  playlist_notes text,
  favourite boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists playlist_tracks (
  id bigserial primary key,
  playlist_id bigint not null references playlists(id) on delete cascade,
  playlist_position int not null,
  track_artist text not null,
  track_title text not null,
  track_bpm text,
  track_length double precision,
  favourite boolean not null default false,
  track_image_mime text,
  track_image_base64 text
);

create index if not exists playlists_user_id_idx on playlists(user_id);
create index if not exists playlist_tracks_playlist_id_idx on playlist_tracks(playlist_id);