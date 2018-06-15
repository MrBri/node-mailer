const server = require('./index');

const requestDefaults = {
  method: 'POST',
  headers: { "Content-Type": "application/json" },
  url: '/account-registration',
  payload: {}
};

// test('endpoint test | POST /account-registration | empty payload -> 400 Bad Request', t => {
//   const request = Object.assign({}, requestDefaults);

//   return server.inject(request)
//     .then(response => {
//       t.is(response.statusCode, 400, 'status code is 400');
//     });
// });

test('endpoint test | POST /account-registration | valid email address -> 200 OK', async (done) => {
  const request = Object.assign({}, requestDefaults, {
    payload: {
			"user-name": "Tyler", 
			"user-email": "tyler@mrbri.com"
    }
  });

	setTimeout(async function() { // wait for nodemailer to start
		const res = await server.inject(request)
		expect(res.statusCode).toEqual(200)
		expect(res.payload).toEqual("Verification email sent")
		done()
	}, 2000);
});
