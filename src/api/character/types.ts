import { FastifyRequest } from 'fastify';

export type REGIONS = 'eu' | 'us';
export type CharacterQueryRequest = FastifyRequest<{
  Querystring: {
    code: string;
    name: string;
    slug: string;
    region: string;
  };
}>;
