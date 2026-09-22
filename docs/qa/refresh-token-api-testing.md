# Refresh Token API: Manual QA Guide

This guide describes the manual test process for `POST /api/auth/refresh`.

## Preparation

1. Update the local repository and switch to the branch or commit specified in
   the Trello card.
2. Run `npm install` from the repository root.
3. Obtain `apps/api/.env` from the developer through a private channel.
4. Make sure a test user has already been registered.
5. Start the API:

   ```powershell
   npm run dev:api
   ```

6. Confirm that the terminal contains:

   ```text
   Database connected
   Server is running at http://localhost:3000
   ```

## Postman Setup

1. Import `docs/openapi.yaml` into Postman again so the refresh operation is
   available.
2. Open the generated **Auto Ledger API** collection.
3. Run `GET /api/health` and confirm status `200`.
4. Run `POST /api/auth/login` with valid test credentials.
5. Confirm that Postman stores the `refreshToken` cookie for `localhost`
   with path `/api/auth`.
6. Open `POST /api/auth/refresh`. The request body must be empty.

## Test Cases

### REFRESH-01: Successful token refresh

Before sending the request:

1. Save the current refresh token value as `R1`.
2. Open the latest matching document in the MongoDB `authSessions`
   collection.
3. Record its `_id`, `createdAt`, `updatedAt`, `expiresAt`, and
   `refreshTokenHash`.

Send `POST /api/auth/refresh`.

Expected:

- status `200`;
- response contains a non-empty `accessToken`;
- response does not contain a refresh token;
- the response contains a `Set-Cookie` header;
- Postman replaces the refresh token cookie with a new value, called `R2`;
- the cookie is `HttpOnly`, has path `/api/auth`, and uses
  `SameSite=Lax`;
- the MongoDB document keeps the same `_id`, `userId`, `createdAt`, and
  `expiresAt`;
- `updatedAt` and `refreshTokenHash` change;
- `revokedAt` remains `null`.

### REFRESH-02: Reuse the previous refresh token

1. Save the current valid token `R2`.
2. Replace the Postman cookie value with the previously used token `R1`.
3. Send `POST /api/auth/refresh`.

Expected:

- status `401`;
- error code `INVALID_REFRESH_TOKEN`;
- message `Invalid or expired refresh token`;
- no `Set-Cookie` response header;
- the MongoDB session document does not change.

Restore `R2` in Postman and send the request again.

Expected:

- status `200`;
- the failed attempt with `R1` did not invalidate `R2`;
- Postman stores the newly rotated token `R3`.

### REFRESH-03: Missing refresh token

Delete the `refreshToken` cookie and send the request.

Expected:

- status `401`;
- error code `INVALID_REFRESH_TOKEN`;
- message `Invalid or expired refresh token`;
- no new cookie is created.

### REFRESH-04: Unknown refresh token

Create a `refreshToken` cookie with a random value and send the request.

Expected:

- status `401`;
- the response body is identical to REFRESH-02 and REFRESH-03;
- no new cookie is created;
- no MongoDB session document changes.

### REFRESH-05: Expired session

1. Log in again to create a fresh test session.
2. In MongoDB, set that session's `expiresAt` to a time in the past.
3. Send the refresh request with that session's cookie.

Expected:

- status `401`;
- error code `INVALID_REFRESH_TOKEN`;
- no new cookie is created.

MongoDB may remove the expired document automatically through the TTL index.

### REFRESH-06: Revoked session

1. Log in again to create a fresh test session.
2. In MongoDB, set that session's `revokedAt` to the current date.
3. Send the refresh request with that session's cookie.

Expected:

- status `401`;
- error code `INVALID_REFRESH_TOKEN`;
- no new cookie is created;
- the session remains revoked.

## Cleanup

Delete temporary test sessions if necessary and log in again to restore a valid
Postman cookie for further testing.

## Test Report

Add the report as a comment to the Trello feature card.

### Passed

```text
QA PASSED
Branch/commit: <branch or commit SHA>
Environment: Windows, Node.js <version>, local API
Passed: REFRESH-01 - REFRESH-06
Failed: none
Notes: none
```

Move the card from **Testing** to **Done**.

### Failed

Create a bug card and move the feature card from **Testing** to
**Needs Rework**.

Use this report format:

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
Attachments: screenshot or terminal output
```

Use a dedicated test account. Do not include database credentials, `.env`
contents, or connection strings in Trello comments or screenshots.
