import { z } from "zod";
import { isValidPhoneNo } from "../../../utils/helpers";

export const getIntouch = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNo: z.string().refine((value) => isValidPhoneNo(value), {
    message: "invalid phone number",
  }),
  message: z.string()
});
