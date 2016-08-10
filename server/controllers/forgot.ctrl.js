var mailer = require('../common/mailer.js');
var mongoose = require('mongoose');
var Token = mongoose.model('Token');
var Developer = mongoose.model('Developer');

exports.sendEmail = function(req, res) {

  Developer.findOne({primaryEmail: req.body.primaryEmail}, function(err, developer) {
    if(!developer) {
      return res.status(200);
    }



    developer.save(function(err, developer) {
      var token = new Token;

      console.log('developer here')
      console.log(developer._id)

      token.generateToken(req.body.primaryEmail);
      token.developer = developer._id;
      token.save(function(err, token) {
        if(err) {
          return res.status(400)
            .send({
              success: false,
              reason: err
            })
        }

        mailer.sendForgotEmail(req.body.primaryEmail, token.value, developer._id)
          .then(function(response) {
            return res.send('done')
          }, function(reason) {
            res.status('403')
              .send({
                success: false,
                reason: reason
              })
          })


      })
    })
  })



};

exports.verify = function(req, res) {
  var tokenId = req.params.tokenId;

  console.log('testing testing')
  console.log(tokenId)

  var query = Token.findOne({value: tokenId});

  query.populate('developer')
  query.exec(function(err, token) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    if(!token) {
      return res.redirect('/forgot?error=true');
    }

    console.log('Found Found Found')
    console.log(token)

    return res.render('verify', {
      tokenId: token.value
    })
  })


};


exports.reset = function(req, res) {
  var tokenId = req.body.tokenId;
  var password = req.body.password;

  console.log(tokenId)

  var query = Token.findOne({value: tokenId});

  query.populate('developer')
  query.exec(function(err, token) {
    if(err) {
      return res.status(400).send({
        success: false,
        reason: err.toString()
      })
    }

    if(!token) {
      return res.status(403)
        .send({
          success: false,
          reason: 'Link has expired'
        });
    }

    Developer.findById(token.developer._id, function(err, developer) {
      if(err) {
        return res.status(400).send({
          success: false,
          reason: err.toString()
        })
      }
      
      developer.password = password;

      developer.save(function(err) {
        if(err) {
          return res.status(400).send({
            success: false,
            reason: err.toString()
          })
        }


        token.remove({}, function(err){

          if(err) {
            return res.status(400).send({
              success: false,
              reason: err.toString()
            })
          }

          return res.send({
            success: true
          })

        })


      })


    })



  })


};
