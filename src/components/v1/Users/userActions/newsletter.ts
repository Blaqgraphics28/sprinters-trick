import { Request, Response } from "express";
import Newsletter from "../newsletter.model";

export const subscribe = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        // Check if the email is already in the database
        const existingEmail = await Newsletter.findOne({ email });

        if (existingEmail) {
            res.status(409).json({ message: 'Email already subscribed' });
            return;
        }

        // Save the new email address to the database
        const newEmail = new Newsletter({ email });
        await newEmail.save();

        res.status(201).json({ message: 'Email subscribed successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};