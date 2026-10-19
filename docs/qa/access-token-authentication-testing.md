# Access Token Authentication: Manual QA Guide

This guide covers access-token authentication and
`GET /api/auth/me`.

## Preparation

1. Update the repository and switch to the branch or commit specified in the
   Trello card.
2. Obtain `apps/api/.env` from the developer through a private channel.
3. Start the API:

   ```powershell
   npm run dev:api
   ```

4. Import the current `docs/openapi.yaml` into Postman.
5. Run `POST /api/auth/login` with valid test credentials and save the
   returned `accessToken`.

Do not publish access tokens, refresh tokens, credentials, connection strings,
or `.env` contents in Trello, Git, or screenshots.

## Test Cases

### AUTH-01: Get the current user

1. Open `GET /api/auth/me`.
2. Select **Bearer Token** authorization.
3. Enter the access token returned by login.
4. Send the request.

Expected:

- status `200`;
- response contains `user.id`, `user.firstName`, `user.lastName`, and
  `user.email`;
- response does not contain `passwordHash`;
- returned user matches the account used for login.

### AUTH-02: Missing access token

Send `GET /api/auth/me` without an `Authorization` header.

Expected:

- status `401`;
- error code `UNAUTHORIZED`;
- message `Authentication required`.

### AUTH-03: Malformed authorization header

Send the request with one of these headers:

```text
Authorization: Basic <access-token>
Authorization: Bearer
Authorization: Bearer <access-token> extra
```

Expected for every request:

- status `401`;
- error code `UNAUTHORIZED`;
- no user data is returned.

### AUTH-04: Invalid access token

Change one character in a valid access token and send the request.

Expected:

- status `401`;
- error code `UNAUTHORIZED`;
- no technical JWT error is exposed in the response.

### AUTH-05: Expired access token

1. Set `ACCESS_TOKEN_TTL_SECONDS=15` in the local `.env` file.
2. Restart the API and log in again.
3. Wait more than 15 seconds.
4. Send `GET /api/auth/me` with that access token.

Expected:

- status `401`;
- error code `UNAUTHORIZED`;
- message `Authentication required`.

After the test, restore `ACCESS_TOKEN_TTL_SECONDS=900` and restart the API.

## Important Behavior

Logout revokes the refresh-token session and prevents future token refreshes.
An access token that was already issued remains valid until its short
expiration time. This is expected behavior for the current implementation.

## Test Report

Add the result to the Trello QA card:

```text
QA PASSED
Branch/commit: <branch or commit SHA>
Environment: Windows, Node.js <version>, local API
Passed: AUTH-01 - AUTH-05
Failed: none
Notes: none
```

If a test fails, create a bug card and include the request, response status,
response body, reproduction steps, and a screenshot without secrets or tokens.
