# Login API: Manual QA Guide

This guide describes the manual test process for `POST /api/auth/login`.

## Preparation

1. Update the local repository and switch to the branch or commit specified in
   the Trello card.
2. Run `npm install` from the repository root.
3. Obtain `apps/api/.env` from the developer through a private channel.
   Never add this file to Git or a Trello comment.
4. Make sure a test user has already been registered and record the exact test
   email and password in a private location.
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

1. Import `docs/openapi.yaml` into Postman again so the login operation is
   available.
2. Open the generated **Auto Ledger API** collection.
3. Run `GET /api/health` and confirm status `200`.
4. Open `POST /api/auth/login`.
5. Clear any old `refreshToken` cookie before starting the test cases.

## Test Cases

### LOGIN-01: Successful login

Send the registered user's exact credentials.

Expected:

- status `200`;
- response contains `user.id`, `firstName`, `lastName`, `email`, and
  `accessToken`;
- response does not contain `password`, `passwordHash`, or `refreshToken`;
- Postman stores a `refreshToken` cookie;
- the cookie is marked `HttpOnly`, has path `/api/auth`, and uses
  `SameSite=Lax`.

### LOGIN-02: Email normalization

Send the valid registered email with uppercase letters and surrounding spaces.

Expected:

- status `200`;
- login succeeds;
- the returned email is lowercase and has no surrounding spaces.

### LOGIN-03: Incorrect password

Send a valid registered email with an incorrect password.

Expected:

- status `401`;
- error code `INVALID_CREDENTIALS`;
- message `Invalid email or password`;
- response does not reveal whether the email exists.

### LOGIN-04: Unknown email

Send a valid but unregistered email.

Expected:

- status `401`;
- status and response body are identical to LOGIN-03;
- no refresh token cookie is created.

### LOGIN-05: Invalid fields

Check an invalid email, a missing password, and an empty password separately.

Expected:

- status `400`;
- error code `VALIDATION_ERROR`;
- `error.fields` identifies the invalid field;
- no refresh token cookie is created.

### LOGIN-06: Malformed JSON

Send an incomplete raw JSON body:

```text
{"email":
```

Expected:

- status `400`;
- error code `INVALID_JSON`;
- message `Invalid JSON request body`;
- API remains running.

### LOGIN-07: Repeated successful login

Run LOGIN-01 twice.

Expected:

- both requests return `200`;
- each response contains an access token;
- the latest response replaces the `refreshToken` cookie in Postman;
- no credentials or refresh token appear in either response body.

## Test Report

Add the report as a comment to the Trello feature card.

### Passed

```text
QA PASSED
Branch/commit: <branch or commit SHA>
Environment: Windows, Node.js <version>, local API
Passed: LOGIN-01 - LOGIN-07
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

Do not include passwords, access tokens, refresh tokens, database credentials,
`.env` contents, or connection strings in Trello comments or screenshots.
