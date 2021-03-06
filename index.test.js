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

test('endpoint test | POST /register | valid response-> 200 OK', async (done) => {
	const request  = Object.assign({}, requestDefaults, {
		url: '/register',
		payload: { uuid: 'b75dbc0e-144c-4558-be17-bed0f78021c1' } // id that was already generated
  });
	const res = await server.inject(request)
	expect(res.statusCode).toEqual(200)
	expect(res.payload).toEqual("Registered")
	done()
});
