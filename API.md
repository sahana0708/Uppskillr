# Uppskillr LMS - API Documentation

Base URL: `http://localhost:5000/api`

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### POST /auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Cookies Set:**
- `refreshToken` (HTTP-only, 30 days)

### POST /auth/logout
Logout and invalidate refresh token.

**Headers:**
- Cookie: refreshToken=...

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

### POST /auth/refresh
Refresh access token using refresh token.

**Headers:**
- Cookie: refreshToken=...

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

## Users Endpoints

### GET /users/me
Get current user profile and progress.

**Headers:**
- Authorization: Bearer {accessToken}

**Response (200):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "stats": {
    "completedVideos": 5,
    "inProgressVideos": 3
  },
  "inProgress": [
    {
      "video": {
        "id": "uuid",
        "title": "Introduction to Python",
        "section": {
          "subject": {
            "id": "uuid",
            "title": "Python Programming",
            "thumbnail": "url"
          }
        }
      },
      "progress": 120
    }
  ]
}
```

## Subjects Endpoints

### GET /subjects
Get all published subjects.

**Response (200):**
```json
[
  {
    "id": "uuid",
    "title": "Python Programming",
    "slug": "python-programming",
    "description": "Learn Python from basics...",
    "thumbnail": "https://...",
    "isPublished": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "_count": {
      "sections": 5
    }
  }
]
```

### GET /subjects/:id
Get subject by ID.

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Python Programming",
  "slug": "python-programming",
  "description": "Learn Python from basics...",
  "thumbnail": "https://...",
  "isPublished": true,
  "createdAt": "2024-01-01T00:00:00Z",
  "_count": {
    "sections": 5
  }
}
```

### GET /subjects/:id/tree
Get subject with sections and videos (with lock status).

**Headers:**
- Authorization: Bearer {accessToken}

**Response (200):**
```json
{
  "id": "uuid",
  "title": "Python Programming",
  "slug": "python-programming",
  "description": "Learn Python from basics...",
  "thumbnail": "https://...",
  "isPublished": true,
  "sections": [
    {
      "id": "uuid",
      "subjectId": "uuid",
      "title": "Introduction to Python",
      "orderIndex": 0,
      "videos": [
        {
          "id": "uuid",
          "sectionId": "uuid",
          "title": "What is Python?",
          "description": "Learn about Python history...",
          "youtubeUrl": "https://youtube.com/watch?v=...",
          "orderIndex": 0,
          "durationSeconds": 300,
          "locked": false,
          "completed": true
        },
        {
          "id": "uuid",
          "sectionId": "uuid",
          "title": "Setting Up Environment",
          "youtubeUrl": "https://youtube.com/watch?v=...",
          "orderIndex": 1,
          "durationSeconds": 420,
          "locked": false,
          "completed": false
        },
        {
          "id": "uuid",
          "sectionId": "uuid",
          "title": "First Python Program",
          "youtubeUrl": "https://youtube.com/watch?v=...",
          "orderIndex": 2,
          "durationSeconds": 360,
          "locked": true,
          "completed": false
        }
      ]
    }
  ]
}
```

## Videos Endpoints

### GET /videos/:id
Get video by ID with lock status and progress.

**Headers:**
- Authorization: Bearer {accessToken}

**Response (200):**
```json
{
  "id": "uuid",
  "sectionId": "uuid",
  "title": "What is Python?",
  "description": "Learn about Python history...",
  "youtubeUrl": "https://youtube.com/watch?v=...",
  "orderIndex": 0,
  "durationSeconds": 300,
  "locked": false,
  "progress": {
    "id": "uuid",
    "userId": "uuid",
    "videoId": "uuid",
    "lastPositionSec": 120,
    "isCompleted": false,
    "completedAt": null
  },
  "section": {
    "subject": {
      "id": "uuid",
      "title": "Python Programming"
    }
  }
}
```

## Progress Endpoints

### GET /progress/videos/:videoId
Get user's progress for a specific video.

**Headers:**
- Authorization: Bearer {accessToken}

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "videoId": "uuid",
  "lastPositionSec": 120,
  "isCompleted": false,
  "completedAt": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:05:00Z"
}
```

If no progress exists:
```json
{
  "lastPositionSec": 0,
  "isCompleted": false
}
```

### POST /progress/videos/:videoId
Save or update video progress.

**Headers:**
- Authorization: Bearer {accessToken}

**Request Body:**
```json
{
  "last_position_seconds": 120,
  "is_completed": false
}
```

**Response (200):**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "videoId": "uuid",
  "lastPositionSec": 120,
  "isCompleted": false,
  "completedAt": null,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:05:00Z"
}
```

To mark as completed:
```json
{
  "last_position_seconds": 300,
  "is_completed": true
}
```

## Health Check

### GET /health
Check if the API is running.

**Response (200):**
```json
{
  "status": "ok"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
// or
{
  "message": "Invalid token"
}
// or
{
  "message": "Token expired"
}
```

### 404 Not Found
```json
{
  "message": "Video not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Authentication Flow

1. **Register**: `POST /auth/register`
2. **Login**: `POST /auth/login` → Get accessToken + refreshToken cookie
3. **Access Protected Routes**: Include `Authorization: Bearer {accessToken}` header
4. **Token Expires**: API returns 401
5. **Auto Refresh**: Frontend automatically calls `POST /auth/refresh`
6. **Retry**: Original request retried with new accessToken
7. **Logout**: `POST /auth/logout` → Clears refreshToken cookie

## Video Lock Logic

Videos are locked/unlocked based on completion of previous videos:

- **First video** in each section: Always unlocked
- **Subsequent videos**: Unlocked only if previous video is completed
- **Completion criteria**: Watched at least 90% of video duration

Lock status is calculated dynamically on each request based on user progress.

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- Express rate limiting middleware
- Token bucket algorithm
- Redis-based distributed rate limiting

## CORS Configuration

Backend accepts requests from: `http://localhost:3000`

Configure in `backend/src/app.ts`:
```typescript
cors({
  origin: env.FRONTEND_URL,
  credentials: true,
})
```

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d "{\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

### Get Subjects
```bash
curl http://localhost:5000/api/subjects
```

### Get Subject Tree (with auth)
```bash
curl http://localhost:5000/api/subjects/{id}/tree \
  -H "Authorization: Bearer {accessToken}"
```

### Save Progress
```bash
curl -X POST http://localhost:5000/api/progress/videos/{videoId} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {accessToken}" \
  -d "{\"last_position_seconds\":120,\"is_completed\":false}"
```

---

For more information, see README.md
