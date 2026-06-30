# API Documentation — Flowstate SaaS

Base URL: `http://localhost:3000/api`

## Authentication

All protected endpoints require a valid session. Sessions are managed via NextAuth.js cookies.

### Public Endpoints

- `POST /auth/register` — Register a new user
- `POST /auth/[...nextauth]` — NextAuth callbacks (sign in, sign out, etc.)

### Protected Endpoints

- `GET /automations` — List automations
- `POST /automations` — Create automation
- `GET /automations/:id` — Get automation
- `PATCH /automations/:id` — Update automation
- `DELETE /automations/:id` — Delete automation
- `GET /analytics` — Get analytics

---

## Endpoints

### Register

**POST** `/auth/register`

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": "clj...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Errors:**
- `400` — Missing email or password
- `409` — User already exists
- `500` — Server error

---

### Sign In (NextAuth)

**POST** `/auth/[...nextauth]`

Sign in via email/password or OAuth. Handled by NextAuth.js.

See [NextAuth Documentation](https://next-auth.js.org/).

---

## Automations

### List Automations

**GET** `/automations`

Get all automations for the authenticated user.

**Response:** `200 OK`
```json
[
  {
    "id": "clj...",
    "name": "Daily Report",
    "description": "Generate and send reports",
    "enabled": true,
    "config": "{...}",
    "userId": "clj...",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z",
    "lastRun": null
  }
]
```

**Errors:**
- `401` — Unauthorized
- `500` — Server error

---

### Create Automation

**POST** `/automations`

Create a new automation.

**Request:**
```json
{
  "name": "Daily Report",
  "description": "Generate and send daily reports",
  "config": {
    "trigger": "schedule",
    "schedule": "0 9 * * MON-FRI",
    "actions": [
      { "type": "fetch_data", "source": "analytics" },
      { "type": "send_email", "to": "team@example.com" }
    ]
  }
}
```

**Response:** `201 Created`
```json
{
  "id": "clj...",
  "name": "Daily Report",
  "description": "Generate and send daily reports",
  "enabled": true,
  "config": "{...}",
  "userId": "clj...",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "lastRun": null
}
```

**Errors:**
- `400` — Missing required fields
- `401` — Unauthorized
- `500` — Server error

---

### Get Automation

**GET** `/automations/:id`

Get details of a specific automation.

**Response:** `200 OK`
```json
{
  "id": "clj...",
  "name": "Daily Report",
  "description": "Generate and send daily reports",
  "enabled": true,
  "config": "{...}",
  "userId": "clj...",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z",
  "lastRun": null
}
```

**Errors:**
- `401` — Unauthorized
- `404` — Automation not found
- `500` — Server error

---

### Update Automation

**PATCH** `/automations/:id`

Update an automation's settings.

**Request:**
```json
{
  "name": "Daily Report - Updated",
  "description": "Updated description",
  "enabled": false,
  "config": { "updated": "config" }
}
```

All fields are optional.

**Response:** `200 OK`
```json
{
  "id": "clj...",
  "name": "Daily Report - Updated",
  "description": "Updated description",
  "enabled": false,
  "config": "{...}",
  "userId": "clj...",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-02T00:00:00Z",
  "lastRun": null
}
```

**Errors:**
- `401` — Unauthorized
- `404` — Automation not found
- `500` — Server error

---

### Delete Automation

**DELETE** `/automations/:id`

Delete an automation permanently.

**Response:** `200 OK`
```json
{
  "success": true
}
```

**Errors:**
- `401` — Unauthorized
- `404` — Automation not found
- `500` — Server error

---

## Analytics

### Get Analytics

**GET** `/analytics`

Get analytics summary and recent events for the authenticated user.

**Query Parameters:**
- `limit` (optional) — Number of events to return (default: 100)
- `event` (optional) — Filter by event type

**Response:** `200 OK`
```json
{
  "totalEvents": 42,
  "eventCounts": {
    "automation_run": 40,
    "automation_error": 2
  },
  "events": [
    {
      "id": "clj...",
      "userId": "clj...",
      "event": "automation_run",
      "metadata": "{\"automationId\": \"clj...\", \"duration\": 2500}",
      "createdAt": "2024-01-02T09:00:00Z"
    }
  ]
}
```

**Errors:**
- `401` — Unauthorized
- `500` — Server error

---

## Example Usage with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

### Create Automation
```bash
curl -X POST http://localhost:3000/api/automations \
  -H "Content-Type: application/json" \
  -b "sessionToken=YOUR_TOKEN" \
  -d '{
    "name": "My Automation",
    "description": "Does something useful",
    "config": {
      "trigger": "manual",
      "actions": []
    }
  }'
```

### Get Analytics
```bash
curl http://localhost:3000/api/analytics \
  -b "sessionToken=YOUR_TOKEN"
```

---

## Error Responses

All errors return consistent JSON format:

```json
{
  "error": "Description of what went wrong"
}
```

Common HTTP status codes:
- `200` — Success
- `201` — Created
- `400` — Bad request (invalid data)
- `401` — Unauthorized (not authenticated)
- `404` — Not found
- `409` — Conflict (e.g., user already exists)
- `500` — Server error

---

## Rate Limiting (Future)

Currently no rate limiting. Implement on production deployments using middleware or a reverse proxy.

---

## SDK / Client Libraries

### Fetch API (JavaScript)

```typescript
// Create automation
const automation = await fetch('/api/automations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'My Automation',
    config: {}
  })
}).then(r => r.json())

// Get automations
const automations = await fetch('/api/automations')
  .then(r => r.json())
```

### TypeScript Types

Add to your types file:

```typescript
interface Automation {
  id: string
  name: string
  description?: string
  enabled: boolean
  config: Record<string, any>
  userId: string
  createdAt: string
  updatedAt: string
  lastRun?: string
}

interface AnalyticsEvent {
  id: string
  userId: string
  event: string
  metadata?: Record<string, any>
  createdAt: string
}
```

---

For more info, see the main [README.md](./README.md)
