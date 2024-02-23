// import { Request, Response } from "express";
// import { z } from "zod";

// import { NewsletterModel } from "../user.model";
// import { handleResponse } from "../../../../utils/response";
// import { newsletterSchema } from "../user.policies";

// const subscribeToNewsletter = async (req: Request, res: Response) => {
//   const { email }: z.infer<typeof newsletterSchema> = req.body;

//   try {
//     const existingEmail = await NewsletterModel.findOne({ email });
//     if (existingEmail) {
//       return handleResponse({
//         res,
//         status: 409,
//         message: "Email already subscribed",
//       });
//     }

//     await new NewsletterModel({ email }).save();

//     return handleResponse({
//       res,
//       message: "subscribed to newsletter successfully",
//     });
//   } catch (err: any) {
//     handleResponse({
//       res,
//       status: 500,
//       message: `Internal Server Error:  ${err.message}`,
//     });
//   }
// };

// export default subscribeToNewsletter;


import { Request, Response } from "express";
import { z } from "zod";
import mailchimp from '@mailchimp/mailchimp_marketing';
import { NewsletterModel } from "../user.model";
import { handleResponse } from "../../../../utils/response";
import { newsletterSchema } from "../user.policies";

mailchimp.setConfig({
  apiKey: process.env.SPRINTERS_MAILCHIMP_KEY,
  server: process.env.MAILCHIMP_SERVER
});



const subscribeToNewsletter = async (req: Request, res: Response) => {
  const { email }: z.infer<typeof newsletterSchema> = req.body;

  try {
    const existingEmail = await NewsletterModel.findOne({ email });
    if (existingEmail) {
      return handleResponse({
        res,
        status: 409,
        message: "Email already subscribed",
      });
    }

    await new NewsletterModel({ email }).save();

    const audienceId = process.env.MAILCHIMP_AUDIENCEID;
  
    
    if (!audienceId) {
      throw new Error("MAILCHIMP_AUDIENCEID environment variable is not defined");
    }

    // Add subscriber to Mailchimp audience
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed',
    });


    return handleResponse({
      res,
      message: "Subscribed to newsletter successfully",
    });
  } catch (err: any) {
    handleResponse({
      res,
      status: 500,
      message: `Internal Server Error:  ${err.message}`,
    });
  }
};

export default subscribeToNewsletter;
