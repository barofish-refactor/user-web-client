/* eslint-disable @typescript-eslint/no-var-requires */
const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const env = require('dotenv').config();

if (require.main === module) {
  generateApi({
    url: `${env.parsed.NEXT_PUBLIC_END_POINT}/api-docs/json`, // -p {URL}
    output: path.resolve(__dirname, 'src/api/swagger'), // -o src/api/swagger
    modular: true, // --modular
    httpClientType: 'axios', // --axios
    defaultResponseAsSuccess: true, // -d
    extractRequestBody: true, // --extract-request-body
    extractResponseBody: true, // --extract-response-body
    extractResponseError: true, // --extract-response-error
    generateResponses: true, // --r
    cleanOutput: true, // --clean-output
  }).catch(e => console.error(e));
}
