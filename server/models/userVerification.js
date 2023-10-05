import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserVerificationSchema = new Schema({
userId: String,
uniqueString: String,
createdAt: Date,
})

export default mongoose.model('UserVerification', UserVerificationSchema);

