import { FastifyPluginAsync, RequestGenericInterface } from 'fastify'


interface partnerRequest extends RequestGenericInterface {
  Querystring: {
    document: string
  }
}

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

  fastify.get<partnerRequest>('/checkuser/:document', async function (request, reply) {
    const { document } = request.query
    reply.send({ ok: document })
  })
}

export default root;

