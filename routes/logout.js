module.exports = function(app) {
	app.get('/logout', function(req, res){
	  req.logout();
	  req.flash('message', 'You have been log out successfully.')
	  res.redirect('/');
	});
}