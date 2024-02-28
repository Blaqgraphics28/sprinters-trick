import phone from "phone";

export const isValidPhoneNo = (phoneNo: string): boolean =>
  phone(phoneNo).isValid;

  