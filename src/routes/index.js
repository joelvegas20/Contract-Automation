// Third party modules.
const express = require('express');
require('dotenv').config();

// Local Modules.
const TemplateRoleService = require('../services/TemplateRole');
const EnvelopeApiService = require('../services/EnvelopeApi');

// Router Instance.
const router = express.Router();

// Environment variables.
const { ACCOUNT_ID, TEMPLATE_ID } = process.env;

// Send Document Route.
router.post('/sendDocument', async (req, res) => {
    // Get the merchant Data.
    const { merchant } = req.body;

    try {
        // Create a new TemplateRoleService object.
        let templateRole = await new TemplateRoleService().createTemplateRole(merchant);

        // Create an EnvelopeApiService object.
        let envelope = await new EnvelopeApiService()

        // Create the envelope and send it.
        let results = await envelope.createEnvelope(templateRole, ACCOUNT_ID, TEMPLATE_ID);

        // Return the results.
        return res.send({
            results
        })

    } catch (error) {
        // Return the error.
        return res.status(
            error.status || 500
        ).send({
            error: error.message
        });
    }

});

// Webhook Notification Route.
router.post('/notification', async (req, res) => {
    // Get the notification data.
    const { envelopeId, status } = req.body;

    try {
        // Return the results.
        return res.send({
            envelopeId,
            status
        })

    } catch (error) {
        // Return the error.
        return res.status(
            error.status || 500
        ).send({
            error: error.message
        });
    }

});

module.exports = router;
