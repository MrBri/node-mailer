
Should work fine with npm:
`npm install`

Run the tests:
`npm test`
tests in watch mode (to iterator without manually re-running tests:
`npm test:w`

Start the server:
`npm start`

Works better with json header:
`curl -X POST http://localhost:3000/account-registration  -d '{"user-name": "Bob", "user-email":"bob@example.com"}' -H "Content-Type: application/json"`
