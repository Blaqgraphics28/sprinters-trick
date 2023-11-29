import { Request, Response } from 'express';
import UserModel from '../models/GetInTouchModel';
import { UserInterface } from '../models/GetInTouchModel';

interface SuscribeRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userMessage: string;
}

const suscribe = async (req: Request<{}, {}, SuscribeRequest>, res: Response) => {
  const { firstName, lastName, email, phoneNumber, userMessage } = req.body;

  const userDetails: UserInterface = new UserModel({
    firstName,
    lastName,
    email,
    phoneNumber,
    userMessage,
  });

  try {
    const user = await userDetails.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user details.' });
  }
};

export default suscribe;
