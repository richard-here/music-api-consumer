const mapPlaylistWithSongsDBToModel = ({
  id,
  name,
  songs,
}) => ({
  id,
  name,
  songs: songs.filter((song) => song)
    .map((song) => ({ id: song.id, title: song.title, performer: song.performer })),
});

module.exports = mapPlaylistWithSongsDBToModel;
