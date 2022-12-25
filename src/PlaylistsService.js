const { Pool } = require('pg');
const { mapPlaylistWithSongsDBToModel } = require('./utils/mapper');
const NotFoundError = require('./exceptions/NotFoundError');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistWithSongs({ playlistId }) {
    const query = {
      text: `SELECT P.id, P.namem JSON_AGG(JSON_BUILD_OBJECT('id', S.id, 'title', S.title, 'performer', S.performer)) AS songs FROM playlists P
        LEFT JOIN users U ON U.id = P.owner
        LEFT JOIN playlists_songs PS ON PS.playlist_id = P.id
        LEFT JOIN songs S ON PS.song_id = S.id
        WHERE P.id = $1
        GROUP BY P.id`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotFoundError('Id given is not found. Get data failed');
    }

    return mapPlaylistWithSongsDBToModel(result.rows[0]);
  }
}

module.exports = PlaylistsService;
