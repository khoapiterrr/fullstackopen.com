const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const uri = process.env.MONGODB_URI;
console.log('connecting to :', uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
  },
});
personsSchema.plugin(uniqueValidator);
personsSchema.pre('findOneAndUpdate', function (next) {
  console.log(this.docs);
  this.options.runValidators = true;
  this.options.context = 'query';
  next();
});
personsSchema.set('toJSON', {
  transform: (_, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

const Person = mongoose.model('PhoneBook', personsSchema);

module.exports = Person;
