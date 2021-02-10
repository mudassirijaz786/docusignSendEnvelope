const docusign = require("docusign-esign");
const args = require("./args.json");

function makeEnvelope(envelopeArgs) {
  let envelope = new docusign.EnvelopeDefinition();

  envelope.templateId = envelopeArgs.templateId;

  let [templateRoles] = envelopeArgs.templateRoles;

  let { tabs } = templateRoles;
  let [dateSignedTabs] = tabs.dateSignedTabs;
  let [
    company,
    title,
    address,
    city,
    fullName,
    spellPercentage,
    percentage,
    spellDays,
    voilationDays,
    notifyDays,
    terminationDays,
    companyAgain,
  ] = tabs.textTabs;

  const c = "Lahore";
  const s = "Punjab";
  const z = "54000";

  dateSignedTabs.value = new Date();
  company.value = "Kwanso";
  title.value = "Nadeem Yasin";
  address.value = "353-A, Johar Town";
  fullName.value = "Developer";
  city.value = `${c}, ${s} ${z}`;
  spellPercentage.value = "Fifteen Percent";
  percentage.value = "15%";
  spellDays.value = "thirty days";
  voilationDays.value = "30";
  notifyDays.value = "30";
  terminationDays.value = "30";
  companyAgain.value = "Kwanso";

  envelope.templateRoles = [templateRoles];

  envelope.status = envelopeArgs.status;

  return envelope;
}

const sendEnvelope = async (mainArgs) => {
  let dsApiClient = new docusign.ApiClient();

  dsApiClient.setBasePath(mainArgs.baseUrl);

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
