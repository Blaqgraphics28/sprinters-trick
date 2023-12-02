import mongoose, { Document } from 'mongoose';
import { z } from 'zod'
// Define the User Schema Interface
interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userMessage?: string;
  
}

// Defining the User Profil Schema
const userSchema = new mongoose.Schema<UserInterface>({
  firstName: {
    type: String,
    required: [true, 'please enter your first name'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'please enter your last name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'please enter your email'],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'please enter your phone number'],
  },
  userMessage: {
    type: String,
  },
},
{ timestamps: true}
);



// Creating the User  Model
const UserModel = mongoose.model<UserInterface>('UserModel', userSchema);

// Exporting the User Model 
export default UserModel;
export { UserInterface };

