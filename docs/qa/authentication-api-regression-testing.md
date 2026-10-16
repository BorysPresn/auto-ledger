# Authentication API: Regression QA Guide

This guide covers the authentication regression flow after adding
`POST /api/auth/logout`. It verifies login, refresh-token rotation, logout,
and independent sessions.

Detailed validation scenarios remain in:

- `docs/qa/login-api-testing.md`;
- `docs/qa/refresh-token-api-testing.md`.

## Preparation

1. Update the repository and switch to the branch or commit specified in the
   Trello card.
2. Run `npm install` from the repository root.
3. Obtain `apps/api/.env` and MongoDB QA access from the developer through a
   private channel.
4. Do not place credentials, connection strings, `.env` contents, refresh
   tokens, or access tokens in Trello or Git.
5. Start the API:

   ```powershell
   npm run dev:api
   ```

6. Confirm that `GET http://localhost:3000/api/health` returns status `200`.
7. Import the current `docs/openapi.yaml` into Postman.
8. In MongoDB Compass, open `autoLedgerDB` and the `authSessions` collection.

Use one dedicated test account for all scenarios.

## Regression Scope

Before testing logout, run the login scenarios from
`docs/qa/login-api-testing.md` and the refresh scenarios from
`docs/qa/refresh-token-api-testing.md`.

## Logout Test Cases

### LOGOUT-01: Log out an active session

1. Log in with valid credentials.
2. Confirm that Postman stores the `refreshToken` cookie.
3. Find the new session in MongoDB and record its `_id`, `updatedAt`, and
   `revokedAt`.
4. Send `POST /api/auth/logout` with an empty request body.

Expected:

- status `204`;
- the response body is empty;
- the response clears the `refreshToken` cookie;
- Postman no longer has a usable refresh token for `localhost`;
- the same MongoDB session has `revokedAt` set to a date;
- `updatedAt` changes;
- `_id`, `userId`, `createdAt`, and `expiresAt` do not change.

### LOGOUT-02: Refresh after logout

1. Before LOGOUT-01, save the active refresh token as `R1`.
2. After logout, manually create the `refreshToken` cookie again with value
   `R1` and path `/api/auth`.
3. Send `POST /api/auth/refresh`.

Expected:

- status `401`;
- error code `INVALID_REFRESH_TOKEN`;
- message `Invalid or expired refresh token`;
- no new refresh cookie is created;
- the MongoDB session remains revoked.

### LOGOUT-03: Repeated logout

Send `POST /api/auth/logout` again after the session has already been logged
out.

Expected:

- status `204`;
- the response body is empty;
- no server error occurs;
- no MongoDB session changes.

### LOGOUT-04: Logout without a cookie

1. Delete the `refreshToken` cookie in Postman.
2. Send `POST /api/auth/logout`.

Expected:

- status `204`;
- the response body is empty;
- no new cookie is created;
- no MongoDB session changes.

### LOGOUT-05: Logout with an unknown token

1. Create a `refreshToken` cookie with a random value and path `/api/auth`.
2. Send `POST /api/auth/logout`.

Expected:

- status `204`;
- the response body is empty;
- the cookie is cleared;
- no MongoDB session changes.

### LOGOUT-06: Independent sessions

1. Log in and save the first refresh token as `A`.
2. Log in again and save the second refresh token as `B`.
3. Confirm that MongoDB contains two active sessions with different `_id`
   values and token hashes.
4. Keep cookie `B` in Postman and send `POST /api/auth/logout`.
5. Confirm that only session `B` is revoked.
6. Replace the Postman cookie with token `A` and send
   `POST /api/auth/refresh`.

Expected:

- logout for session `B` returns status `204`;
- session `A` remains active;
- refresh with token `A` returns status `200` and a new access token;
- session `A` rotates its refresh token hash;
- session `B` remains revoked.

## Test Report

Add the report as a comment to the Trello QA card.

### Passed

```text
QA PASSED
Branch/commit: <branch or commit SHA>
Environment: Windows, Node.js <version>, local API
Passed: login guide, REFRESH-01 - REFRESH-06, LOGOUT-01 - LOGOUT-06
Failed: none
Notes: none
```

Move the QA card from **Testing** to **Done**.

### Failed

Create a bug card, move the QA card from **Testing** to **Needs Rework**, and
use this report format:

```text
Title: [API] Short description

Environment:
- Branch/commit:
- OS:
- Node.js version:

Preconditions:

Steps to reproduce:
1.
2.
3.

Expected result:

Actual result:

HTTP status and response body:

Reproducibility: always / sometimes / once
Attachments: screenshot or terminal output without secrets or tokens
```
