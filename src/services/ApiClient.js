// Third party modules.
var docusign = require('docusign-esign');
const { readFileSync } = require('fs');
require('dotenv').config();

// Environment variables.
const {
    DOCUSIGN_OAUTH_BASE_PATH,
    DOCUSIGN_BASE_PATH,
    INTEGRATION_KEY,
    ACCOUNT_ID,
    SCOPE,
} = process.env;

// DocuSign API Client Service Structured.
class DsApiClient {
    /**
     * @memberof DsApiclient // Constructor.
     * @description Initialize the DocuSign API Client.
     * @returns {object}
    **/
    constructor() {
        // Initialize the DocuSign API Client for use with the environment variables.
        this.dsApi = new docusign.ApiClient(
            {
                // Base path is used to know where to make requests.
                basePath: DOCUSIGN_BASE_PATH,
                // OAuth base path is used to know where to make authentication requests.
                oAuthBasePath: DOCUSIGN_OAUTH_BASE_PATH,
            }
        )
    }

    /**
     * @memberof DsApiclient
     * @description Get the access token for the user.
     * @returns {object}
    **/
    // NOTA: CORREGIR
    async getToken(pathPrivateKey) {
        // Transforms the private key into a string.
        const private_key = readFileSync(pathPrivateKey, 'utf8');

        // Request JWT User Token.
        const { body } = await this.dsApi.requestJWTUserToken(
            INTEGRATION_KEY,
            ACCOUNT_ID,
            SCOPE,
            private_key,
            3600
        );

        // Return the access token.
        return body.access_token;
    }

    /**
     * @memberof DsApiclient
     * @description Set Headers.
     * @param {string} token
     * @returns {void}
    **/
    setConfig(token) {
        // Set the Default Header.
        this.dsApi.addDefaultHeader(
            'Authorization',
            `Bearer ${token}`
        )
    }
}

module.exports = DsApiClient;