import axios from "axios";
import appConfig from "..";

async function sendMail() {
  try {
    const { mailChimpApiKey, mailChimpDC, mailChimpHashPepper } = appConfig;
    const authString = `${mailChimpHashPepper}:${mailChimpApiKey}`;

    const apiUrl = `https://${mailChimpDC}.api.mailchimp.com/3.0/ping`;

    const { data } = await axios.get(apiUrl, {
      auth: {
        username: String(mailChimpHashPepper),
        password: String(mailChimpApiKey),
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export default sendMail;
