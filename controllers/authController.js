const User = require('../models/User');
const jwt = require('jsonwebtoken');

//
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
  //incorrect email and password for login page
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }
  if (err.message === 'incorrect password') {
    errors.password = 'that password is not incorrect';
  }
  //
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
  }
  //
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    // console.log(Object.values(err.errors));
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
//
const maxAge = 3 * 24 * 60 * 60; //time in second unlike cookie expect in millisecond
const createToken = (id) => {
  return jwt.sign({ id }, 'apple', { expiresIn: maxAge });
};
//
module.exports.signup_get = (req, res) => {
  res.render('signup');
};
//
module.exports.login_get = (req, res) => {
  res.render('login');
};
//
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  // res.send(' new signup');
  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    // res.status(201).json(user);
    res.status(201).json({ user: user._id });
  } catch (err) {
    // console.log(error);
    const errors = handleErrors(err);
    // res.status(400).send('error,user not created');
    res.status(400).json({ errors });
  }
};
//
module.exports.login_post = async (req, res) => {
  //   console.log(req.body);
  const { email, password } = req.body;
  // console.log(email, password);
  // res.send('user login');
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
