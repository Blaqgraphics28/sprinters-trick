import { Schema, model, Document  } from 'mongoose';

interface NewsletterDocument extends Document {
    email: string;
}

const newsletterSchema = new Schema<NewsletterDocument>({
    email: { type: String, required: true, unique: true },
});

const Newsletter = model<NewsletterDocument>('Newsletter', newsletterSchema);

export default Newsletter;