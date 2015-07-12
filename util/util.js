module.exports = function(req, res, next) {
	if(!req.isAuthenticated()) {
		console.error('verify', req.user)
		req.flash('message', 'Please log in to continue.')
		res.redirect('/login')
	}
	next()
}