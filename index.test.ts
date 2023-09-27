import {Elysia, t} from 'elysia';
import { HttpStatusCode } from '.';
import { describe, expect, it } from 'bun:test';

export const req = (path: string, requestInit?: RequestInit) => new Request(`http:127.0.0.1${path}`, requestInit)

describe('Http Status Code', () => {
  const app = new Elysia()
  .use(HttpStatusCode())
  .get('/user', ({set, httpStatus}) => {
    set.status = httpStatus.HTTP_200_OK
    return 'Hello';
  })
  .post('/user', ({set, httpStatus, body, request}) => {
    set.status = httpStatus.HTTP_201_CREATED
    return body.name
  }, {
    type: 'json',
    body: t.Object({
      name: t.String(),
    })
  })
  .get('/user/:id', ({params: {id}, set, httpStatus}) => {
    set.status = httpStatus.HTTP_404_NOT_FOUND;
    return {"message": `User ${id} not find`}
  }, {
    params: t.Object({
      id: t.Numeric()
    })
  })

  it('Test Status code for get resource (200)', async () => {
    const res = await app.handle(req('/user'))
    expect(res.status).toBe(200)
  })

  it('Test Status code for resource creation (201)', async () => {
    const res = await app.handle(req('/user', { method: 'post', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ name: 'John Doe' }) }));
    expect(res.status).toBe(201);
  });

  it('Test status code for resource not found (404)', async () => {
    const id = 4
    const res = await app.handle(req(`/user/${id}`))
    expect(res.status).toBe(404);
  })

})