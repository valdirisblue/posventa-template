export const API_DEFAULT_PORT = process.env.PORT || 3000;
export const API_DEFAULT_PREFIX = '/api/interpreter/v1'; //Change the resource name

/**
 * Swagger configuration
 *
 * Change the valuesz
 */
export const SWAGGER_TITLE = 'API';
export const SWAGGER_DESCRIPTION = 'API INTERPRETER';
export const SWAGGER_PREFIX = `${API_DEFAULT_PREFIX}/docs`;
export const APP_VERSION = require('../../../package.json').version

