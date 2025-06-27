# URL Shortener Microservice (Backend Test Submission)

This project is a production-ready **HTTP URL Shortener Microservice** built for the Affordmed Backend Evaluation. It features core URL shortening functionality with link analytics and integrates a custom reusable logging middleware that communicates with the Affordmed logging server.

---

## Features

- Create short URLs (with optional custom shortcode)
- Link expiry (default 30 minutes or user-defined)
- Redirect to long URL from short link
- Track click analytics (timestamp, referrer, location)
- Custom shortcode uniqueness enforcement
- Logging to Affordmed Evaluation Server
- Modular code structure with separation of concerns

---

## 🗂Project Structure

BackendTestSubmission/
├── middleware/
│   └── logger.js   
├── routes/
├── controllers/
├── models/
├── utils/
├── app.js
├── server.js
├── .gitignore
└── README.md


---

## Tech Stack

- **Node.js + Express** — REST API server
- **UUID + Base62** — Custom short code generator
- **Axios** — HTTP client to connect to log API
- **JavaScript (ES6)** — Full implementation
- **Postman** — Used for API testing and screenshots

---

## API Endpoints

### 1. Create Short URL

- **POST** `/shorturls`
```json
{
  "url": "https://long-url.com/page/xyz",
  "validity": 45,
  "shortcode": "custom123"
}
```
-- Response(201)
```json
{
  "shortLink": "http://hostname:port/custom123",
  "expiry": "2025-06-27T10:45:00Z"
}
```
---

### 2. Redirect via Short URL

- **GET** `/:shortcode`
-- Redirects to original long URL
-- Tracks click metadata

### 3. Retrieve URL Stats
- **GET** `/shorturls/:shortcode`
-- Response 
```json
{
  "url": "https://original-long-url.com",
  "createdAt": "2025-06-27T10:00:00Z",
  "expiry": "2025-06-27T10:45:00Z",
  "clicks": 3,
  "clickData": [
    {
      "timestamp": "2025-06-27T10:05:00Z",
      "referrer": "https://google.com",
      "location": "India"
    },
    ...
  ]
}
```

## Logging Middleware
- This app uses a custom middleware to log all events to:
```
POST http://20.244.56.144/evaluation-service/logs
```
- Each log includes:
-- Stack (backend)
-- Level (info, error, etc.)
-- Package (middleware, handler, etc.)
-- Descriptive message

- Middleware Paths
-- BackendTestSubmission/middleware/logger.js


## Screenshots
![Screenshot 2025-06-27 140458](https://github.com/user-attachments/assets/00216f66-e95e-4d03-9a11-b7a00c9452aa)
![Screenshot (8)](https://github.com/user-attachments/assets/0073a1f5-8f41-48ea-95e2-12e53ece41a5)
![Screenshot (9)](https://github.com/user-attachments/assets/abe6bd75-dc37-4b7a-a313-effb46e75659)

## Assumptions
- No user authentication (as per spec)
- In-memory storage used (DB hooks can be added later)
- Valid URL and shortcode format checked server-side
- Geolocation is mocked or approximated


