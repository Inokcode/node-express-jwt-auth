const User = require('../models/User');

//
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
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
    res.status(201).json(user);
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
  console.log(email, password);
  res.send('user login');
};
