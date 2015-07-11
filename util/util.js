module.exports = function(req, res, next) {
	if(!req.isAuthenticated()) {
		req.flash('message', 'Please log in to continue.')
		res.redirect('/login')
	}
	next()
}