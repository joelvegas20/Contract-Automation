// Local Modules.
const DocuSignInstance = require('./DocuSignInstance');

// Template Role Service Structured.
class TemplateRoleService {
    /**
     * @memberof TemplateRoleService
     * @description TemplateRoleService Constructor.
     * @returns {TemplateRoleService}
    **/
    constructor() {
        this.docuSignInstance = new DocuSignInstance({ api: 'TemplateRole' })
    }

    /**
     * @memberof TemplateRoleService
     * @description Create TemplateRole.
     * @param {object} args
     * @returns {object}
    **/
    async createTemplateRole(args) {
        // Get the actual instance of TemplateRole.
        const templateRole = await this.docuSignInstance.getInstance();
        
        // Set the Template Role.
        templateRole.email = args.email;
        templateRole.name = args.name;
        templateRole.roleName = args.roleName;
        templateRole.tabs = args.tabs;

        // Return the Template Role.
        return templateRole;
    }
}

module.exports = TemplateRoleService;
