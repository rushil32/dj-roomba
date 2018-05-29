const io = require('./www').io;

module.exports = (socket) => {
  socket.on('vote', (partyId, trackId) => {
    socket.broadcast.emit('vote', partyId, trackId);
  });
};
