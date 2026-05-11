# Uber App Backend API Documentation

## User Registration Endpoint

### POST /users/register

Registers a new user in the system. This endpoint creates a new user account with email and password authentication.

---

### Description

The `/register` endpoint accepts user details (fullname, email, and password), validates them, and creates a new user account in the database. Upon successful registration, it returns user information along with an authentication token.

---

### Request

**Method:** `POST`

**URL:** `/users/register`

**Content-Type:** `application/json`

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Required Fields

| Field | Type | Description | Validation |
|-------|------|-------------|-----------|
| `fullname.firstname` | String | User's first name | Required, minimum 3 characters |
| `fullname.lastname` | String | User's last name | Optional, minimum 3 characters if provided |
| `email` | String | User's email address | Required, must be valid email format |
| `password` | String | User's password | Required, minimum 6 characters |

---

### Response

#### Success Response (201 Created)

**Status Code:** `201`

```json
{
  "statusCode": 201,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com",
      "createdAt": "2026-04-30T10:30:00.000Z",
      "updatedAt": "2026-04-30T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User registered successfully",
  "success": true
}
```

#### Error Response (400 Bad Request)

**Status Code:** `400`

**Occurs when:** Validation fails

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password"
    }
  ]
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `201` | User registered successfully |
| `400` | Validation error - Invalid input data |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/users/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: {
      firstname: 'John',
      lastname: 'Doe'
    },
    email: 'john.doe@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- Password is hashed using bcrypt before storage in the database
- The returned token should be used for authentication in subsequent requests
- Email must be unique in the system
- Password field is not included in the response for security reasons

---

## User Login Endpoint

### POST /users/login

Authenticates a user with their email and password credentials. This endpoint validates the user's credentials and returns an authentication token upon successful login.

---

### Description

The `/login` endpoint accepts a user's email and password, validates them against the stored credentials in the database, and returns an authentication token that can be used for subsequent authenticated requests.

---

### Request

**Method:** `POST`

**URL:** `/users/login`

**Content-Type:** `application/json`

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Required Fields

| Field | Type | Description | Validation |
|-------|------|-------------|-----------|
| `email` | String | User's email address | Required, must be valid email format |
| `password` | String | User's password | Required, minimum 6 characters |

---

### Response

#### Success Response (200 OK)

**Status Code:** `200`

```json
{
  "statusCode": 200,
  "data": {
    "user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "User logged in successfully",
  "success": true
}
```

#### Error Response (400 Bad Request)

**Status Code:** `400`

**Occurs when:** Validation fails (missing email or password)

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password"
    }
  ]
}
```

#### Error Response (401 Unauthorized)

**Status Code:** `401`

**Occurs when:** Invalid credentials provided

```json
{
  "statusCode": 401,
  "message": "Invalid email or password",
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `200` | User logged in successfully |
| `400` | Validation error - Invalid input data |
| `401` | Unauthorized - Invalid credentials |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "password123"
  }'
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- The authentication token should be sent in subsequent requests (typically in the Authorization header) to access protected endpoints
- Passwords are compared against the hashed password stored in the database using bcrypt
- Invalid email or password combination returns a generic error message for security reasons
- The token format depends on your JWT configuration

---

## User Profile Endpoint

### GET /users/profile

Retrieves the authenticated user's profile information. This endpoint requires a valid authentication token.

---

### Description

The `/profile` endpoint returns the profile information of the currently authenticated user. It requires a valid JWT token to be sent in the Authorization header or as a cookie.

---

### Request

**Method:** `GET`

**URL:** `/users/profile`

**Authentication:** Required (Bearer token or cookie)

### Request Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | Bearer `<token>` | JWT authentication token (alternative to cookie) |
| `Cookie` | `accessToken=<token>` | JWT token as HTTP-only cookie (alternative to header) |

---

### Response

#### Success Response (200 OK)

**Status Code:** `200`

```json
{
  "statusCode": 200,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2026-04-30T10:30:00.000Z",
    "updatedAt": "2026-04-30T10:30:00.000Z"
  },
  "message": "User profile fetched successfully",
  "success": true
}
```

#### Error Response (404 Not Found)

**Status Code:** `404`

**Occurs when:** User not found

```json
{
  "statusCode": 404,
  "message": "User not found",
  "success": false
}
```

#### Error Response (401 Unauthorized)

**Status Code:** `401`

**Occurs when:** Invalid or missing authentication token

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `200` | User profile fetched successfully |
| `401` | Unauthorized - Invalid or missing token |
| `404` | User not found |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/users/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- This endpoint requires authentication
- The user's password is never included in the response
- Token should be obtained from the `/login` endpoint

---

## User Logout Endpoint

### GET /users/logout

Logs out the authenticated user by clearing authentication tokens and adding the token to a blacklist. This endpoint requires a valid authentication token.

---

### Description

The `/logout` endpoint invalidates the user's authentication tokens by clearing cookies and adding the token to a blacklist. This prevents the token from being used for future authenticated requests. Blacklisted tokens are automatically removed from the database after 24 hours.

---

### Request

**Method:** `GET`

**URL:** `/users/logout`

**Authentication:** Required (Bearer token or cookie)

### Request Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Authorization` | Bearer `<token>` | JWT authentication token (alternative to cookie) |
| `Cookie` | `accessToken=<token>` | JWT token as HTTP-only cookie (alternative to header) |

---

### Response

#### Success Response (200 OK)

**Status Code:** `200`

```json
{
  "statusCode": 200,
  "data": null,
  "message": "User logged out successfully",
  "success": true
}
```

#### Error Response (401 Unauthorized)

**Status Code:** `401`

**Occurs when:** Invalid or missing authentication token

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `200` | User logged out successfully |
| `401` | Unauthorized - Invalid or missing token |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/users/logout', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- This endpoint requires authentication
- The token is added to a blacklist to prevent further usage
- Access tokens are cleared from cookies upon logout
- Refresh tokens are also cleared if present
- Blacklisted tokens are automatically removed after 24 hours
- After logout, the user must login again to access protected endpoints

---

# Caption Routes

## Caption Registration Endpoint

### POST /captions/register

Registers a new caption (driver) in the system. This endpoint creates a new captain account with email, password, and vehicle information.

---

### Description

The `/captions/register` endpoint accepts captain details (fullname, email, password, and vehicle information), validates them, and creates a new captain account in the database. Upon successful registration, it returns captain information along with an authentication token.

---

### Request

**Method:** `POST`

**URL:** `/captions/register`

**Content-Type:** `application/json`

### Request Body

```json
{
  "fullname": {
    "firstname": "James",
    "lastname": "Wilson"
  },
  "email": "james.wilson@example.com",
  "password": "password123",
  "vehicle": {
    "color": "Blue",
    "plate": "ABC1234",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Required Fields

| Field | Type | Description | Validation |
|-------|------|-------------|-----------|
| `fullname.firstname` | String | Captain's first name | Required, minimum 3 characters |
| `fullname.lastname` | String | Captain's last name | Required, minimum 3 characters |
| `email` | String | Captain's email address | Required, must be valid email format, unique |
| `password` | String | Captain's password | Required, minimum 6 characters |
| `vehicle.color` | String | Vehicle color | Required, minimum 3 characters |
| `vehicle.plate` | String | Vehicle license plate | Required, minimum 3 characters |
| `vehicle.capacity` | Number | Vehicle passenger capacity | Required, minimum 1 |
| `vehicle.vehicleType` | String | Type of vehicle | Required, must be one of: `car`, `motorcycle`, `auto` |

---

### Response

#### Success Response (201 Created)

**Status Code:** `201`

```json
{
  "statusCode": 201,
  "data": {
    "caption": {
      "_id": "507f1f77bcf86cd799439012",
      "fullname": {
        "firstname": "James",
        "lastname": "Wilson"
      },
      "email": "james.wilson@example.com",
      "vehicle": {
        "color": "Blue",
        "plate": "ABC1234",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "location": {
        "ltd": null,
        "lng": null
      },
      "createdAt": "2026-05-06T10:30:00.000Z",
      "updatedAt": "2026-05-06T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Caption registered successfully",
  "success": true
}
```

#### Error Response (400 Bad Request)

**Status Code:** `400`

**Occurs when:** Validation fails or email already exists

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    },
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password"
    },
    {
      "msg": "Invalid vehicle type",
      "param": "vehicle.vehicleType"
    }
  ]
}
```

**OR**

```json
{
  "statusCode": 400,
  "message": "Caption with this email already exists",
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `201` | Caption registered successfully |
| `400` | Validation error - Invalid input data or email already exists |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X POST http://localhost:3000/captions/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "James",
      "lastname": "Wilson"
    },
    "email": "james.wilson@example.com",
    "password": "password123",
    "vehicle": {
      "color": "Blue",
      "plate": "ABC1234",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/captions/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fullname: {
      firstname: 'James',
      lastname: 'Wilson'
    },
    email: 'james.wilson@example.com',
    password: 'password123',
    vehicle: {
      color: 'Blue',
      plate: 'ABC1234',
      capacity: 4,
      vehicleType: 'car'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- Password is hashed using bcrypt before storage in the database
- The returned token should be used for authentication in subsequent requests
- Email must be unique in the system
- Password field is not included in the response for security reasons
- Vehicle types supported: `car`, `motorcycle`, `auto`
- Captain status is set to `inactive` by default upon registration
- Capacity must be a positive integer (minimum 1)

---

## Caption Login Endpoint

### POST /captions/login

Authenticates a caption (driver) with their email and password credentials. This endpoint validates the captain's credentials and returns an authentication token upon successful login.

---

### Description

The `/captions/login` endpoint accepts a captain's email and password, validates them against the stored credentials in the database, and returns an authentication token that can be used for subsequent authenticated requests.

---

### Request

**Method:** `POST`

**URL:** `/captions/login`

**Content-Type:** `application/json`

### Request Body with Comments

```json
{
  "email": "james.wilson@example.com",        // Required: Valid email format (must be registered captain email)
  "password": "password123"                    // Required: Minimum 6 characters (will be compared with hashed password)
}
```

### Required Fields

| Field | Type | Description | Validation |
|-------|------|-------------|-----------|
| `email` | String | Captain's email address | Required, must be valid email format |
| `password` | String | Captain's password | Required, minimum 6 characters |

---

### Response

#### Success Response (200 OK)

**Status Code:** `200`

```json
{
  "statusCode": 200,                          // HTTP status code
  "data": {
    "caption": {
      "_id": "507f1f77bcf86cd799439012",     // Unique captain ID
      "fullname": {
        "firstname": "James",                  // Captain's first name
        "lastname": "Wilson"                   // Captain's last name
      },
      "email": "james.wilson@example.com",    // Captain's email address
      "vehicle": {
        "color": "Blue",                       // Vehicle color
        "plate": "ABC1234",                    // License plate number
        "capacity": 4,                         // Passenger capacity
        "vehicleType": "car"                   // Type: car, motorcycle, or auto
      },
      "status": "inactive",                    // Status: inactive or active
      "location": {
        "ltd": null,                           // Latitude coordinate
        "lng": null                            // Longitude coordinate
      },
      "createdAt": "2026-05-06T10:30:00.000Z",
      "updatedAt": "2026-05-06T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // JWT authentication token
  },
  "message": "Caption logged in successfully",
  "success": true
}
```

#### Error Response (400 Bad Request)

**Status Code:** `400`

```json
{
  "statusCode": 400,
  "message": "Email and password are required",
  "success": false
}
```

#### Error Response (401 Unauthorized)

**Status Code:** `401`

```json
{
  "statusCode": 401,
  "message": "Invalid caption credentials",  // Invalid email or password
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `200` | Captain logged in successfully |
| `400` | Validation error - Missing required fields |
| `401` | Unauthorized - Invalid credentials |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X POST http://localhost:3000/captions/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "james.wilson@example.com",
    "password": "password123"
  }'
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/captions/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'james.wilson@example.com',
    password: 'password123'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- The authentication token should be sent in subsequent requests (typically in the Authorization header) to access protected endpoints
- Passwords are compared against the hashed password stored in the database using bcrypt
- Invalid email or password combination returns a generic error message for security reasons
- The token format is JWT (JSON Web Token)

---

## Caption Profile Endpoint

### GET /captions/profile

Retrieves the authenticated captain's profile information. This endpoint requires a valid authentication token.

---

### Description

The `/captions/profile` endpoint returns the profile information of the currently authenticated captain. It requires a valid JWT token to be sent in the Authorization header or as a cookie.

---

### Request

**Method:** `GET`

**URL:** `/captions/profile`

**Authentication:** Required (Bearer token or cookie)

### Request Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // JWT token (alternative to cookie)
  "Cookie": "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."         // JWT token as HTTP-only cookie
}
```

---

### Response

#### Success Response (200 OK)

**Status Code:** `200`

```json
{
  "statusCode": 200,
  "data": {
    "caption": {
      "_id": "507f1f77bcf86cd799439012",     // Unique captain ID
      "fullname": {
        "firstname": "James",                  // Captain's first name
        "lastname": "Wilson"                   // Captain's last name
      },
      "email": "james.wilson@example.com",    // Captain's email address
      "vehicle": {
        "color": "Blue",                       // Vehicle color
        "plate": "ABC1234",                    // License plate number
        "capacity": 4,                         // Passenger capacity (min: 1)
        "vehicleType": "car"                   // Type: car, motorcycle, or auto
      },
      "status": "inactive",                    // Status: inactive or active
      "location": {
        "ltd": null,                           // Latitude coordinate
        "lng": null                            // Longitude coordinate
      },
      "createdAt": "2026-05-06T10:30:00.000Z",
      "updatedAt": "2026-05-06T10:30:00.000Z"
    }
  },
  "message": "Caption profile retrieved successfully",
  "success": true
}
```

#### Error Response (401 Unauthorized)

**Status Code:** `401`

```json
{
  "statusCode": 401,
  "message": "Unauthorized",                 // Invalid or missing token
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `200` | Captain profile retrieved successfully |
| `401` | Unauthorized - Invalid or missing token |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X GET http://localhost:3000/captions/profile \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/captions/profile', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- This endpoint requires authentication
- The captain's password is never included in the response for security reasons
- Token should be obtained from the `/captions/login` endpoint

---

## Caption Logout Endpoint

### GET /captions/logout

Logs out the authenticated captain by clearing authentication tokens and adding the token to a blacklist. This endpoint requires a valid authentication token.

---

### Description

The `/captions/logout` endpoint invalidates the captain's authentication tokens by clearing cookies and adding the token to a blacklist. This prevents the token from being used for future authenticated requests. Blacklisted tokens are automatically removed from the database after 24 hours.

---

### Request

**Method:** `GET`

**URL:** `/captions/logout`

**Authentication:** Required (Bearer token or cookie)

### Request Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // JWT token (alternative to cookie)
  "Cookie": "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."         // JWT token as HTTP-only cookie
}
```

---

### Response

#### Success Response (200 OK)

**Status Code:** `200`

```json
{
  "statusCode": 200,
  "data": null,                              // No data returned on logout
  "message": "Caption logged out successfully",
  "success": true
}
```

#### Error Response (401 Unauthorized)

**Status Code:** `401`

```json
{
  "statusCode": 401,
  "message": "Unauthorized",                 // Invalid or missing token
  "success": false
}
```

#### Error Response (400 Bad Request)

**Status Code:** `400`

```json
{
  "statusCode": 400,
  "message": "No token provided",            // Token not found in header or cookie
  "success": false
}
```

---

### Status Codes

| Code | Description |
|------|-------------|
| `200` | Captain logged out successfully |
| `400` | Bad request - No token provided |
| `401` | Unauthorized - Invalid or expired token |
| `500` | Internal server error |

---

### Example Usage

#### cURL

```bash
curl -X GET http://localhost:3000/captions/logout \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### JavaScript (Fetch)

```javascript
fetch('http://localhost:3000/captions/logout', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

---

### Notes

- This endpoint requires authentication
- The token is added to a blacklist to prevent further usage
- Access tokens are cleared from cookies upon logout
- Blacklisted tokens are automatically removed after 24 hours
- After logout, the captain must login again to access protected endpoints
#   U b e r _ a p p 
 
 