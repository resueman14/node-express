module.exports=function(req,res,next){
  if(!req.session.isAdmin){
    return res.redirect('/auth')
  }

  next()
}