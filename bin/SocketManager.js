const io = require('./www').io;

module.exports = (socket) => {
  socket.on('vote', (partyId) => {
    socket.broadcast.emit('vote', partyId);
  });

  socket.on('add-track', (partyId) => {
    socket.broadcast.emit('add-track', partyId);
  });

  socket.on('remove-track', (partyId) => {
    socket.broadcast.emit('remove-track', partyId);
  });
};
