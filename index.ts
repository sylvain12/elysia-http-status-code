import { Elysia, t } from "elysia";
import { HttpStatusEnum } from './status';

export const HttpStatusCode = () => 
  new Elysia({ name: 'elysia-http-status-code' })
	.decorate({httpStatus: HttpStatusEnum})