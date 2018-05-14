const Note = require('../models/Note');
const userCtrl = require('./userController');
const authCtrl = require('./authController');

function sendUserNotes(req, res) {
  const { token } = req.cookies;
  const userId = authCtrl.verifyToken(token);

  Note
    .find({ author: userId })
    .exec((err, notes) => {
      if (err) res.send(500);
      res.send(notes);
    });
}

exports.create = (req, res) => {
  const { token } = req.cookies;
  const userId = authCtrl.verifyToken(token);

  if (userId) {
    const { title, text, tag } = req.body;
    const newNote = new Note({
      title,
      text,
      tag,
      author: userId,
    });


    newNote.save((err, note) => {
      userCtrl.addNote(userId, note._id);
      res.send(note);
    });
  }
};

exports.update = (req, res) => {
  const { noteId } = req.params;
  const { title, text, tag } = req.body;

  Note.findOneAndUpdate({ _id: noteId }, { title, text, tag }, (err, note) => {
    res.send(note);
  });
};

exports.getNote = (req, res) => {
  const { noteId } = req.params;

  Note
    .findOne({ _id: noteId })
    .exec((err, note) => {
      res.send(note);
    });
};

exports.getUserNotes = (req, res) => {
  sendUserNotes(res, res);
};

exports.delete = (req, res) => {
  const { noteId } = req.params;

  Note.deleteOne({ _id: noteId }, (err) => {
    if (err) { res.send(500); return; }
    sendUserNotes(req, res);
  });
};
