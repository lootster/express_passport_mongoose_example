# express_passport_mongoose_example

## Setup

- Fork and clone repo
- Install dependencies: `npm install`
- Run tests: `npm run test:watch`
- Start application: `npm run dev`

## API endpoints

The sample application supports the following API endpoints

- POST /api/users

Register a new user.

Sample request body:

```json
{
  "user": {
    "username": "test user",
    "email": "test@example.com",
    "password: "testpassword"
  }
}
```

- POST /api/users/login

Login as the specified user.

Sample request body:

```json
{
  "user": {
    "email": "test@example.com",
    "password: "testpassword"
  }
}
```

- GET /api/user

Get the information of the current user in session.
Note: you need a JWT token to access this API. 

- PUT /api/user

Update the profile of the current user in session.
Note: you need a JWT token to access this API. 

Sample request body:

```json
{
  "user": {
    "bio": "blah blah blah",
    "image: "http://image.io/pic/1123"
  }
}
```

- GET /api/profiles/:username

Get the profile of the specified user
Note: you need a JWT token to access this API. 

## Access protected API endpoints with JWT token

In order to get access to the protected API, you need to include a "Authorization" HTTP header in your requests, e.g.

```txt
Authorization: Token <put your JWT token value here>
```

The JWT token is returned in the JSON response of the login API.
