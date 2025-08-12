# setup

npm install

main dependencies

- sequelize orm
- express

Okay for testing:

- If model changes
  run update-test-db to update schema in test db

same for Main db
run sync

If fails order is

setup db script
run seed

```mermaid
    USER ||--o{ PLAYLIST : "has many"
    PLAYLIST }o--|| USER : "belongs to"
    PLAYLIST ||--o{ PLAYLIST_TRACK : "has many"
    TRACK ||--o{ PLAYLIST_TRACK : "has many"
    PLAYLIST }o--o{ TRACK : "many-to-many via PlaylistTrack"
    PLAYLIST_TRACK }o--|| PLAYLIST : "belongs to"
    PLAYLIST_TRACK }o--|| TRACK : "belongs to"

    USER {
        int id PK
        string username
        datetime createdAt
        datetime updatedAt
    }
    PLAYLIST {
        int id PK
        string playlist_name
        text playlist_notes
        blob playlist_image
        boolean favourite
        int user_id FK
        datetime createdAt
        datetime updatedAt
    }
    TRACK {
        int id PK
        string track_title
        string track_artist
        int track_bpm
        decimal track_length
        blob track_image
        datetime createdAt
        datetime updatedAt
    }
    PLAYLIST_TRACK {
        int id PK
        int playlist_id FK
        int track_id FK
        int playlist_position
        datetime createdAt
        datetime updatedAt
    }
```

# todo

add testing for endpoints
add proper joins for queries playlist/tracks
add post for all methods
add intergration testing for all
add endpoint docs

# Roadmap

# Music Playlist API Roadmap

## Overview

RESTful API for managing users, playlists, and tracks with many-to-many relationships between playlists and tracks.

## Base URL

```
/api/v1
```

## Authentication

- Consider implementing JWT authentication for user-specific operations
- Public endpoints for track browsing, private for playlist management

## Core Endpoints

### Users

- **GET** `/users` - List all users (admin only) (added) no testing
- **POST** `/users` - Create new user
- **POST** `/users/:id/playlist` - Create new user, playlist and track object at user ID
- **GET** `/users/:id` - Get user by ID (added) no testing
- **PUT** `/users/:id` - Update user
- **DELETE** `/users/:id` - Delete user
- **GET** `/users/:id/playlists` - Get all playlists for a user (added) no testing
- **GET** `/users/:id/playlists/:id/tracks` - Get full nested data object for user (added) no testing
- **POST** `/users/:id/playlists` - POST full nested data object for user (added) no testing

### Tracks

- **GET** `/tracks` - List all tracks (with pagination, search, filtering) (added) no testing
- **POST** `/tracks` - Upload/create new track \*\*\*\*
- **GET** `/tracks/:id` - Get track details
- **PUT** `/tracks/:id` - Update track metadata
- **DELETE** `/tracks/:id` - Delete track
- **GET** `/tracks/:id/playlists` - Get playlists containing this track
- **GET** `/tracks/search` - Search tracks by title, artist, BPM range

### Playlists

- **GET** `/playlists` - List playlists (public or user-specific) (added) no testing
- **POST** `/playlists` - Create new playlist **\***
- **GET** `/playlists/:id` - Get playlist with tracks
- **GET** `/playlists/:id/tracks` - Get playlist by id with all tracks \*\*\*
- **PUT** `/playlists/:id` - Update playlist metadata
- **DELETE** `/playlists/:id` - Delete playlist
- **POST** `/playlists/:id/tracks` - Add track to playlist
- **DELETE** `/playlists/:id/tracks/:trackId` - Remove track from playlist
- **PUT** `/playlists/:id/tracks/:trackId/position` - Reorder track in playlist
- **PUT** `/playlists/:id/favourite` - Toggle favourite status

### Playlist Management

- **GET** `/playlists/:id/tracks` - Get all tracks in playlist (ordered by position)
- **POST** `/playlists/:id/tracks/bulk` - Add multiple tracks at once
- **PUT** `/playlists/:id/reorder` - Reorder all tracks in playlist

## Advanced Features

### Statistics & Analytics

- **GET** `/users/:id/stats` - User listening statistics
- **GET** `/tracks/:id/stats` - Track popularity metrics
- **GET** `/stats/popular-tracks` - Most popular tracks
- **GET** `/stats/popular-playlists` - Most popular playlists

### Media Management

- **GET** `/tracks/:id/image` - Get track artwork
- **POST** `/tracks/:id/image` - Upload track artwork
- **GET** `/playlists/:id/image` - Get playlist artwork
- **POST** `/playlists/:id/image` - Upload playlist artwork

### Import/Export

- **POST** `/playlists/:id/export` - Export playlist (various formats)
- **POST** `/playlists/import` - Import playlist from file
- **GET** `/users/:id/backup` - Backup user data

## Query Parameters

### Pagination

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

### Filtering

- `artist` - Filter by artist name
- `bpm_min`, `bpm_max` - BPM range filtering
- `length_min`, `length_max` - Track length filtering
- `favourite` - Filter favourite playlists

### Sorting

- `sort` - Sort field (title, artist, bpm, created_at)
- `order` - Sort direction (asc, desc)

## Response Format

All responses follow consistent JSON structure:

```json
{
  "success": true,
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  },
  "meta": {}
}
```

## Error Handling

- Standard HTTP status codes
- Consistent error response format
- Validation error details

## Implementation Priority

### Phase 1 (Core MVP)

1. User CRUD operations
2. Track CRUD operations
3. Basic playlist management
4. Track-playlist associations

### Phase 2 (Enhanced Features)

1. Image upload/management
2. Search and filtering
3. Playlist reordering
4. Favourite functionality

### Phase 3 (Advanced Features)

1. Statistics and analytics
2. Import/export functionality
3. Bulk operations
4. Advanced querying

## Technical Considerations

- Implement proper validation for all inputs
- Handle BLOB data efficiently for images
- Consider pagination for large datasets
- Implement proper transaction handling for playlist operations
- Add rate limiting for API endpoints
- Consider caching for frequently accessed data
