'use strict';

const Hapi = require('hapi');
const nodemailer = require('nodemailer');
// setup mailer
nodemailer.createTestAccount((err, account) => {
	// create reusable transporter object using the default SMTP transport
	transporter = nodemailer.createTransport({
			host: 'email-smtp.us-west-2.amazonaws.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
					user: 'AKIAIEDFNQJ2RG3DHJVQ', // generated ethereal user
					pass: 'Akeq6MHEjQjL+ZpF2QWm6QdoTMuutqwST493ABM4mFF9' // generated ethereal password
			}
	});
	console.log('transporter started');
});

let logEmail = 'log@xyz.com';
let transporter // created transport for mailer
let mailOptions = {
		from: 'tt175695@gmail.com', // sender address
		to: '', // list of receivers
		subject: 'Verification email from test system.', // Subject line
		text: `Hello, please run this command to verify your email:\n
					curl curl -X POST http://localhost:3000/egister`, // plain text body
		// html: '<b>Hello world?</b>' // html body
};

if (process.argv[2] !== '–logging_email') {
	console.warn(`Only argument is --logging_email, defaulting to ${logEmail}`);
}
// log@xyz.com
logEmail = process.argv[3] 

// email validator


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route({
    method: 'POST',
    path: '/account-registration',
    handler: (request, h) => {

			mailOptions.to = request.payload['user-email']
			console.log('mailOptions: ', mailOptions);

			transporter.sendMail(mailOptions, (error, info) => { // kinda slow
					if (error) return console.log(error);

					console.log('Message sent: %s', info.messageId);
					// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
			});

			return 'Verification email sent';
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
		console.log(email);

		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

if (!module.parent) {  // for testing
	init();
}

module.exports = server;
