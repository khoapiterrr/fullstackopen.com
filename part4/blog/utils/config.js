require('dotenv').config();

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3003;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
const JWT_SECRET = 'fullstackjwt';

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  ENV,
};
