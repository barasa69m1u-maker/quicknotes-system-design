# QuickNotes REST API Specification

This document details the production REST API design for the QuickNotes service backend.

## 1. REST Endpoints Overview

| Method | Endpoint Path | Description | Success Status |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/users/register` | Register a new user account | `201 Created` |
| `POST` | `/api/v1/auth/login` | Authenticate user and issue JWT token | `200 OK` |
| `GET` | `/api/v1/notes` | List authenticated user's notes | `200 OK` |
| `POST` | `/api/v1/notes` | Create a new note | `201 Created` |
| `GET` | `/api/v1/notes/:id` | Fetch details of a specific note | `200 OK` |
| `DELETE` | `/api/v1/notes/:id` | Soft delete a specific note | `200 OK` |

---

## 2. Request & Response Examples

### A. Creating a Note (`POST /api/v1/notes`)
**Request Headers:**
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>


### A. Creating a Note (`POST /api/v1/notes`)
**Request Headers:**
```http
Content-Type: application/json
Authorization: Bearer <jwt_token>


{
  "title": "System Design Architecture",
  "body": "Ensure read replicas handle search queries to offload primary DB.",
  "tags": ["backend", "scaling"]
}


{
  "id": 1052,
  "user_id": 42,
  "title": "System Design Architecture",
  "body": "Ensure read replicas handle search queries to offload primary DB.",
  "tags": ["backend", "scaling"],
  "created_at": "2026-11-06T10:30:00Z"
}


{
  "title": "System Design Architecture",
  "body": "Ensure read replicas handle search queries to offload primary DB.",
  "tags": ["backend", "scaling"]
}


{
  "id": 1052,
  "user_id": 42,
  "title": "System Design Architecture",
  "body": "Ensure read replicas handle search queries to offload primary DB.",
  "tags": ["backend", "scaling"],
  "created_at": "2026-11-06T10:30:00Z",
  "updated_at": "2026-11-06T10:30:00Z"
}


{
  "page": 1,
  "limit": 10,
  "total": 1,
  "data": [
    {
      "id": 1052,
      "title": "System Design Architecture",
      "body": "Ensure read replicas handle search queries to offload primary DB.",
      "tags": ["backend", "scaling"],
      "created_at": "2026-11-06T10:30:00Z"
    }
  ]
}


{
  "error": {
    "code": 400,
    "message": "Validation Failed",
    "details": [
      {
        "field": "title",
        "issue": "Title is required and must be between 1 and 100 characters."
      }
    ]
  }
}
