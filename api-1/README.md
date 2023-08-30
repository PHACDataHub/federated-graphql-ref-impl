# GraphQL NodeJS API Example

## Application Architecture

![Application Architecture](../docs/architecture.svg)

## Authorization with GraphQL

Suppose that there are two roles that a requestor can take on: **Manager** and **Employee**, where **Manager** has permission to see certain fields that the employee does not.
The identity of an employee along with their role can be stored in the claims of a JWT.
For this exercise, it is helpful to use [jwt.io](https://jwt.io/) to create some test cases.

Suppose that we have two requestors: Jane Doe (Manager) and John Doe (Employee).
We can see both the decoded and base64 encoded tokens for each requestor.

**Note**: in these illustrative examples, `"changeme"` is used as the secret key for the HMAC algorithm. In a real application, this should be treated as a sensitive value and managed appropriately. 

### Jane Doe (Manager)

**Decoded JWT**

```json
# Header
{
  "alg": "HS256",
  "typ": "JWT"
}
# Payload (claims)
{
  "role": "Manager",
  "name": "Jane Doe",
  "iat": 1516239022
}
# Verify Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  "changeme"
)
```

**Base 64 Encoded JWT**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTWFuYWdlciIsIm5hbWUiOiJKYW5lIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.eKBeOr0NX8lZnVNJEG2ijvrFZ-URLy4ce5fuQK_Klio
```

### John Doe (Employee)

**Decoded JWT**

```json
# Header
{
  "alg": "HS256",
  "typ": "JWT"
}
# Payload (claims)
{
  "role": "Employee",
  "name": "John Doe",
  "iat": 1516239022
}
# Verify Signature
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  "changeme"
)
```

**Base 64 Encoded JWT**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiRW1wbG95ZWUiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.SHeaNy8YZ2WjbnMCbXop4eQbmrRc9XPKvjt1xSG3ElU
```


## Helpful Resources

- [Net Ninja GraphQL Crash Course](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUxtblNUahcsg0WLxmrK_y) playlist on YouTube.