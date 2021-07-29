import fastify, { FastifyInstance } from 'fastify';
import fastifyHttpProxy from 'fastify-http-proxy';
import fastifyStatic from 'fastify-static';
import path from 'path';
import {NODE_ENV, HTTP_PORT, IOT_GRAPHQL_API_URL, IOT_GRAPHQL_API_USER_KEY_HEADER, IOT_GRAPHQL_API_USER_KEY_VALUE} from './config';

const app: FastifyInstance = fastify({ logger: NODE_ENV === 'dev', disableRequestLogging: NODE_ENV != 'dev' });

const port: number = Number(process.env.PORT) || 9090;

const isEmpty = (str?: string) => !str || str.length === 0;

app.register(fastifyStatic, {
    root: path.join(__dirname, 'client/build')
});

//Provides a health endpoint to check
app.register(require('./plugins/health'), {
    options: {}
});

const iotGraphQLApiUrl = IOT_GRAPHQL_API_URL;
app.register(fastifyHttpProxy, {
    upstream: iotGraphQLApiUrl!,
    prefix: '/meters-graphql',
    replyOptions: {
        rewriteRequestHeaders: (originalRequest, headers) => {
            if (isEmpty(IOT_GRAPHQL_API_USER_KEY_HEADER) || isEmpty(IOT_GRAPHQL_API_USER_KEY_VALUE)) {
                return headers;
            }
            return {
                ...headers,
                [IOT_GRAPHQL_API_USER_KEY_HEADER!]: IOT_GRAPHQL_API_USER_KEY_VALUE,
            }
        }
    }
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
