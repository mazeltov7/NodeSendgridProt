var express = require('express');
var router = express.Router();

const mailContent = `やったね！\n
おれおれアドミンからメールがきたよ\n
(*´ω｀*)`;


var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('admin@oreore.jp', 'おれおれアドミンメール');
var toEmail = new helper.Email('ishikawayuki2@gmail.com');
var subject = 'おれおれアドミンからメールが届きました';
var content = new helper.Content('text/plain', mailContent);
var mail = new helper.Mail(fromEmail, subject, toEmail, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON()
});


/* GET home page. */
router.get('/', function(req, res, next) {

	sg.API(request, function (error, response) {
	  if (error) {
	    console.log('Error response received');
	  }
	  console.log(response.statusCode);
	  console.log(response.body);
	  console.log(response.headers);
	});

  res.render('index', { title: 'Express' });
});

module.exports = router;
