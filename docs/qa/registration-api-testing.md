# Registration API: Manual QA Guide

This guide describes the manual test process for `POST /api/auth/register`.

## Preparation

1. Install Node.js and Git.
2. Clone the repository or update the existing local copy.
3. Switch to the branch specified in the Trello card.
4. Run `npm install` from the repository root.
5. Obtain `apps/api/.env` from the developer through a private channel.
   Never add this file to Git or a Trello comment.
6. Start the API:

   ```powershell
   npm run dev:api
   ```

7. Confirm that the terminal contains both messages:

   ```text
   Database connected
   Server is running at http://localhost:3000
   ```

## Postman Setup

1. Open Postman and select **Import**.
2. Import `docs/openapi.yaml` from the repository.
3. Open the generated **Auto Ledger API** collection.
4. Run `GET /api/health`.
5. Confirm status `200` and body:

   ```json
   {
     "status": "ok"
   }
   ```

## Test Cases

Use a new email for each successful registration, for example
`masha.test+001@example.com`.

### REG-01: Successful registration

Send a valid request:

```json
{
  "firstName": "Masha",
  "lastName": "Tester",
  "email": "masha.test+001@example.com",
  "password": "password1"
}
```

Expected:

- status `201`;
- response contains `user.id`, `firstName`, `lastName`, and `email`;
- `user.id` is a 24-character hexadecimal string;
- response does not contain `password` or `passwordHash`.

### REG-02: Duplicate email

Send the REG-01 request again without changing the email.

Expected:

- status `409`;
- error code `EMAIL_ALREADY_EXISTS`;
- message `Email already exists`.

### REG-03: Required fields

Send empty `firstName`, `lastName`, `email`, and `password` values.

Expected:

- status `400`;
- error code `VALIDATION_ERROR`;
- `error.fields` contains errors for all invalid fields;
- no user is created.

### REG-04: Email normalization

Send a valid unused email containing uppercase letters and surrounding spaces.

Expected:

- status `201`;
- returned email is lowercase and contains no surrounding spaces.

### REG-05: Name normalization

Send valid names with surrounding spaces.

Expected:

- status `201`;
- returned names contain no surrounding spaces.

### REG-06: Password validation

Check the following passwords separately:

| Value | Expected result |
|---|---|
| `12345` | `400`, fewer than 6 characters |
| `password` | `400`, no digit |
| `123456` | `400`, no letter |
| `pass word1` | `400`, contains whitespace |
| More than 20 characters | `400`, exceeds maximum length |

The response must never include the submitted password.

### REG-07: Malformed JSON

In Postman, select raw JSON and send an incomplete body:

```text
{"email":
```

Expected:

- status `400`;
- error code `INVALID_JSON`;
- message `Invalid JSON request body`;
- API remains running after the request.

## Test Report

Add the report as a comment to the Trello feature card.

### Passed

```text
QA PASSED
Branch/commit: <branch or commit SHA>
Environment: Windows, Node.js <version>, local API
Passed: REG-01 - REG-07
Failed: none
Notes: none
```

Move the card from **Testing** to **Done**.

### Failed

Create a bug card and move the feature card from **Testing** to **Needs Rework**.

Use this bug report format:

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

Do not include passwords, database credentials, `.env` contents, or connection
strings in Trello comments or screenshots.
