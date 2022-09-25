import mongoose, { Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
export interface IUser extends mongoose.Document {
  id?: string;
  name: string;
  email: string;
  password: string;
  image: string;
  places: mongoose.Types.DocumentArray<mongoose.Types.ObjectId>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String, required: true },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Place",
    },
  ],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model<IUser>("User", userSchema);
