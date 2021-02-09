const docusign = require("docusign-esign");
const args = require("./args.json");

function makeEnvelope(envelopeArgs) {
  let envelope = new docusign.EnvelopeDefinition();

  envelope.templateId = envelopeArgs.templateId;

  let { templateRole } = envelopeArgs;

  envelope.templateRoles = [templateRole[0]];

  envelope.status = envelopeArgs.status;

  return envelope;
}

const sendEnvelope = async (mainArgs) => {
  let dsApiClient = new docusign.ApiClient();

  dsApiClient.setBasePath(mainArgs.basePath);

  dsApiClient.addDefaultHeader(
    "Authorization",
    "Bearer " + mainArgs.accessToken
  );

  let envelopesApi = new docusign.EnvelopesApi(dsApiClient);

  let envelope = makeEnvelope(mainArgs.envelopeArgs);

  let results = await envelopesApi.createEnvelope(mainArgs.accountId, {
    envelopeDefinition: envelope,
  });

  let envelopeId = results.envelopeId;

  console.log(`Envelope was created. EnvelopeId ${envelopeId}`);

  return { envelopeId: envelopeId };
};

sendEnvelope(args);
