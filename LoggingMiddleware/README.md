# Logging Middleware

This reusable logging middleware is built for use in both frontend and backend Node.js applications. It integrates with the **Affordmed Evaluation Logging API**, automatically sending structured logs for debugging, monitoring, and audit purposes.

---

## API Endpoint Used

```http
POST http://20.244.56.144/evaluation-service/logs
```

## Tech Stack
- Node.js
- Axios (HTTP Request)
- CommonJS

## Folder Structure
```
LoggingMiddleware/
├── logger.js        # Reusable log() function
├── .gitignore
└── README.md        # You're reading it!
```

## Features
- Simple reusable ```log()``` function
- Sends logs with appropriate structure
- Supports all required fields: ```stack```, ```level```, ```package```, ```message```
- Fails silently if logging fails (does not crash app)
- Can be integrated in any Node.js app via ```require('./LoggingMiddleware/logger')```

## Accepted Fields
```
| Field     | Accepted Values                                                              |
| --------- | ---------------------------------------------------------------------------- |
| `stack`   | `backend`, `frontend`                                                        |
| `level`   | `debug`, `info`, `warn`, `error`, `fatal`                                    |
| `package` | `auth`, `config`, `middleware`, `utils`, `route`, `handler`, etc. (per docs) |
| `message` | Custom message (string)                                                      |
```

## Example Usage
```
const log = require('./LoggingMiddleware/logger');
log("backend", "info", "handler", "Short URL created successfully");
log("backend", "error", "service", "Database connection failed");
```

## Setup Authentication
The logging API requires an Authorization Token.

Update this line inside ```logger.js``` with your token from the ```/auth``` API:
```
const AUTH_TOKEN = "your_access_token_here"; // Replace this before using
```

- Sample Log Request Payload
```
{
  "stack": "backend",
  "level": "error",
  "package": "handler",
  "message": "received string, expected bool"
}
```

## Export
This function is exported using:
```
module.exports = log;
```
It can be reused in any project by simply importing it.

## Assumptions
- The log server is always up; if it fails, we catch the error silently.
- Only valid values (as specified in the prompt) should be passed to ```log()```.
