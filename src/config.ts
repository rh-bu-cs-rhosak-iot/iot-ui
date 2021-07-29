'use strict';

import { get } from 'env-var';

const config = {
    NODE_ENV: get('NODE_ENV').default('dev').asEnum(['dev', 'prod']),
    LOG_LEVEL: get('LOG_LEVEL').asString(),

    HTTP_PORT: get('HTTP_PORT').default(8080).asPortNumber(),

    IOT_GRAPHQL_API_URL: get('IOT_GRAPHQL_API_URL').asString(),
    IOT_GRAPHQL_API_USER_KEY_HEADER: get('IOT_GRAPHQL_API_USER_KEY_HEADER').asString(),
    IOT_GRAPHQL_API_USER_KEY_VALUE: get('IOT_GRAPHQL_API_USER_KEY_VALUE').asString(),
};

export = config;