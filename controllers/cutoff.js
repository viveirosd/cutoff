//setup for email using sendgrid and handlebars templates
var nodemailer = require('nodemailer');
var hbsMailer = require('nodemailer-express-handlebars');
var options = {
  viewEngine: {
    extname: '.hbs',
    layoutsDir: './views/emails/layouts',
    defaultLayout : 'main_email',
    partialsDir : './views/emails/partials/'
  },
  viewPath: './views/emails/',
 	extName: '.hbs'
};
var sgTransport = require('nodemailer-sendgrid-transport');
var send_grid = {
  //need to replace with account values
  auth: {
    api_user: '',
    api_key: ''
  }
};
var mailer = nodemailer.createTransport(sgTransport(send_grid));
mailer.use('compile', hbsMailer(options));

//sends the email using sendgrid or reports an error to the console
var handleSendMail = function() {
  mailer.sendMail({
    from: 'cutoff@cutoff.com',
    to: 'viveirosd@gmail.com',
    subject: 'Any Subject',
    template: 'emailcontent',
    context: {
      variable1 : 'value1',
      variable2 : 'value2'
    }
  }, function (error, response) {
    if (error) {
      console.log('Error senting mail ' + error);
    }
    mailer.close();
  });
};

//setup for mongodb
var mongoose = require('mongoose');
var data = require('../models/data');


exports.cutoffdisplay = function(req, res) {
  res.render('cutoffform');
};

exports.cutoffnotification = function(req, res) {
  //save the expenditure
  var expenditure = new data.Expenditure({
    amount: req.param('amount'),
    expenditureDesc: req.param('expensedesc'),
    expenditureDate: new Date(req.param('date'))
  });
  console.log(expenditure);
  expenditure.save(function (err) {
    if (err) return console.error(err);
  });

  //save the relationship
  var relationship = new data.Relationship({   
    relationshipEmail: req.param('spenderemail'),
    relationshipType: req.param('relationship'),
    threshold: req.param('category'),
    expenditure: expenditure
  });
  console.log(relationship);
  relationship.save(function (err) {
    if (err) return console.error(err);
  });

	res.render('emailsent');
};
