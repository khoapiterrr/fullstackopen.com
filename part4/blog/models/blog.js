const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
blogSchema.plugin(uniqueValidator);

blogSchema.set('toJSON', {
  transform: (_, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

blogSchema.pre('findOneAndUpdate', function (next) {
  console.log(this.docs);
  this.options.runValidators = true;
  this.options.context = 'query';
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
