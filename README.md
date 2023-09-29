# Elysia Status Code
ELysia plugin to for http status code

## Installation
```bash
bun add @sylvain12/elysia-http-status-code
```

## Usage
```ts
import Elysia from 'elysia'
import { HttpStatusCode } from 'elysia-http-status-code';

new Elysia()
  .use(HttpStatusCode())
  .get('/'. ({set, httpStatus}) => {
    set.status = httpStatus.HTTP_200_OK;
    return `Hello With response ${httpStatus.HTTP_200_OK}`;
  })
  .post('/user', ({set, body, httpStatus}) => {
    set.status = httpStatus.HTTP_200_OK;
    return {"user": body.name}
  })
  .listen(3000);
```
