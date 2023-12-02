import phone from "phone";

export const isValidPhoneNo = (phoneNo: string) => phone(phoneNo)