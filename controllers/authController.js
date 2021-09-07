module.exports.signup_get = (res, res) => {
  res.render('signup');
};
module.exports.login_get = (res, res) => {
  res.render('login');
};
module.exports.signup_post = (res, res) => {
  res.send(' new signup');
};
module.exports.login_post = (res, res) => {
  res.send('user login');
};
