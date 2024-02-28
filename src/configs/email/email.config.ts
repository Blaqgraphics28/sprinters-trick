import axios from "axios";
import appConfig from "..";
const mailchimp = require("@mailchimp/mailchimp_marketing");

const {
  mailChimpApiKey,
  mailchimpServerPrefix,
  mailChimpDC,
  mailChimpHashPepper,
} = appConfig;
async function sendMail() {
  try {
    mailchimp.setConfig({
      apiKey: mailChimpApiKey,
      server: mailchimpServerPrefix,
    });

    const response = await mailchimp.ping.get();
    return response;
  } catch (error) {
    throw error;
  }
}

export default sendMail;

async function createAudience() {
  try {
    const audience = await mailchimp.lists.createList({
      name: "Amidst",
      contact: {
        company: "company",
        address1: "address",
        city: "city",
        state: "state",
        zip: "zip",
        country: "country",
      },
      permission_reminder: "*|LIST:DESCRIPTION|*",
      email_type_option: true,
      campaign_defaults: {
        from_name: "from_name",
        from_email: "from_email",
        subject: "subject",
        language: "language",
      },
    });
    return `Successfully created an audience. The audience id is ${audience.id}.`;
  } catch (err: any) {
    throw err;
  }
}

const addListMember = async (listId: string) => {
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: "email@ghmail.com",
      status: "subscribed",
      email_type: "html",
      merge_fields: {
        FNAME: "firstname",
        LNAME: "lastname",
      },
      tags: ["customer"],
    });
    return `Successfully added contact as an audience member. The contact's id is ${response.id}.`;
  } catch (err) {
    throw err;
  }
};

//Grouping the audiences

const createSegment = async (listId: string) => {
  try {
    const response = await mailchimp.lists.createSegment(listId, {
      name: "Newsletter",
      options: {
        match: "any",
        conditions: [
          { field: "EMAIL", op: "contains", value: "SRETsd@email.com" },
        ],
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
};
