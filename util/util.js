module.exports = function(req, res, next) {
	if(!req.isAuthenticated()) {
		console.log('Not logged in')
		req.flash('message', 'Please log in to continue.')
		return res.redirect('/login')
	}
	next()
}