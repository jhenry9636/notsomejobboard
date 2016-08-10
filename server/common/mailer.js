var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var q = require('q');
var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path');

exports.sendForgotEmail = function(emailAddress, token, userId) {
  var deferred = q.defer();

  var templateDir = path.join(__dirname, '../email', 'forgot')

  var newsletter = new EmailTemplate(templateDir)
  
  newsletter.render({token: token, userId: userId}, function (err, result) {
    if(err) {
      return deferred.reject(err)
    }

    function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

    var mailData = {
      from: {
        name: 'NotSomeJobboard',
        address: 'noreply@notsomejobboard.com'
      },
      to: emailAddress,
      subject: result.subject,
      text: result.text,
      html: result.html
    };

    var transporter = nodemailer.createTransport(smtpTransport({
      host : 'hs26.name.com',
      port: 465,
      auth : {
        user : "jarrad@notsomejobboard.com",
        pass : "somejobboard1234"
      }
    }));

    if(!validateEmail(emailAddress)) {
      deferred.reject('Invalid Email Address')
    }

    transporter.sendMail(mailData, function (error, response) {
      if(error) {
        return deferred.reject(error)
      }
      return deferred.resolve(response)
    });


  })


  return deferred.promise

}
