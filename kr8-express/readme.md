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
