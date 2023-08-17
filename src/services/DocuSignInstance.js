// Third party modules.
const docusign = require('docusign-esign');
require('dotenv').config();

// Local Modules.
const DsApiClient = require('./ApiClient');

// DocuSign Instance Structured.
class DocuSignInstance {
  /**
   * @memberof DocuSignInstance
   * @description DocuSignInstance Constructor.
   * @param {object} api
   * @returns {DocuSignInstance}
  **/
  constructor({ api }) {
    this.api = api;
  }

  /**
   * @memberof DocuSignInstance
   * @description Get the actual instance of the API.
   * @returns {object}
  **/
  async getInstance() {
    // Create a new API Client.
    const apiClient = await new DsApiClient();

    // Set the API Client Token.
    apiClient.setConfig(process.env.TOKEN);

    // Set the API Client Base Path and Configuration.
    docusign.Configuration.default.setDefaultApiClient(apiClient.dsApi);

    // Return the actual instance of the API.
    return new docusign[this.api]();
  }
}

module.exports = DocuSignInstance;