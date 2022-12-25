const autoBind = require('auto-bind');

class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    autoBind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistWithSongs = await this._playlistsService.getPlaylistWithSongs({ playlistId });
      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(playlistWithSongs),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
