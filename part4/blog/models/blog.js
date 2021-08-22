const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
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
