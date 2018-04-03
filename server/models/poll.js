const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');


const PollSchema = new Schema({
  cuid:           { type: String, default: cuid(), required: false },
  user_id:        { type: String, required: true },
  user_name:      { type: String, required: true },
  title:          { type: String, required: true },
  choices:        { type: Array, required: true },

  open:           { type: Boolean, default: false, required: true },
  votes:          { type: Number, default: 0, required: true },
  date_created:   { type: 'Date', default: (new Date().toISOString()), required: true },
  date_updated:   { type: 'Date', default: (new Date().toISOString()), required: true }
});

PollSchema.pre('save', function(next) {
  var poll = this;

  poll.user_name = sanitizeHtml(poll.user_name);
  poll.title = sanitizeHtml(poll.title);

  // if choices is modified or the poll is new
  if (poll.isModified('choices')) {
    // choices arrive as first ele array - labels separated by comma.
    var choices = poll.choices[0];
    if (choices.constructor === String) {
      var mapped = choices.split(',')
        .map(choice => choice.trim())
        .filter(e =>  e.replace(/(\r\n|\n|\r)/gm,''));
      mapped = mapped.map((label, id) => ({ id, label, vote: 0 }));
      poll.choices = mapped;
    };
  };

  poll.open = Boolean(poll.open);
  poll.votes = Number(poll.votes);
  poll.date_updated = new Date().toISOString();
  next();
});


module.exports = mongoose.model('Poll', PollSchema);
