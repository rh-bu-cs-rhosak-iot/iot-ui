import fastify, { FastifyInstance } from 'fastify';
import fastifyHttpProxy from 'fastify-http-proxy';
import {NODE_ENV, HTTP_PORT, IOT_GRAPHQL_API_URL} from './config';

const app: FastifyInstance = fastify({ logger: NODE_ENV === 'dev', disableRequestLogging: NODE_ENV != 'dev' });

const port: number = Number(process.env.PORT) || 9090;

//Provides a health endpoint to check
app.register(require('./plugins/health'), {
    options: {}
});

const iotGraphQLApiUrl = IOT_GRAPHQL_API_URL;
app.register(fastifyHttpProxy, {
    upstream: iotGraphQLApiUrl!,
    prefix: '/meters-graphql'
});

const start = async () => {
    try {
        await app.listen(HTTP_PORT, '0.0.0.0');
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}
start()
