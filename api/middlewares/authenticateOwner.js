module.exports = function(req,res,next){
	// Verify if the User that is requesting the reuest is the owner itself of that resouce so he can edit, delete etc.
	if(req.mainObj && (req.mainObj._user == req.user.id)) return next();

	// iF not owner return below.
	next(new Error("You have permissions to be here, no permiso"))
}