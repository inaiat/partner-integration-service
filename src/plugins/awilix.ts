import fp from 'fastify-plugin'
import { FastifyAwilixOptions, fastifyAwilixPlugin } from 'fastify-awilix/lib/classic';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default fp<FastifyAwilixOptions>(async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
    fastify.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: false });
 });

