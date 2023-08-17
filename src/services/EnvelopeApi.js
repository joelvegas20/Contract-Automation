// Local Modules.
const DocuSignInstance = require('./DocuSignInstance');

// Envelope API Service Structured.
class EnvelopeApiService {
    /**
     * @memberof EnvelopeApiService
     * @description EnvelopeApiService Constructor.
     * @returns {EnvelopeApiService}
    **/
    constructor() {
        this.docuSignInstance = new DocuSignInstance({ api: 'EnvelopesApi' });
    }

    /**
     * @memberof EnvelopeApiService
     * @description Create Envelope.
     * @param {object} templateRole
     * @param {string} accountId
     * @param {string} templateId
     * @returns {object}
    **/
    async createEnvelope(templateRole, accountId, templateId) {
        // Get the actual instance of EnvelopesApi.
        let envelopeApi = await this.docuSignInstance.getInstance();

        // Create an EnvelopeDefinition Instance.
        let envelopeDefinitionInstance = new DocuSignInstance({ api: 'EnvelopeDefinition' });

        // Get the actual instance of EnvelopeDefinition.
        let envelopeDefinition = await envelopeDefinitionInstance.getInstance();

        // Set the Envelope Definition.
        envelopeDefinition.templateId = templateId;
        envelopeDefinition.templateRoles = [templateRole];
        envelopeDefinition.status = "sent";

        // Create and Send the Envelope.
        const results = await envelopeApi.createEnvelope(accountId,  { envelopeDefinition: envelopeDefinition });

        // Return the results.
        return results;
    }
}

module.exports = EnvelopeApiService;