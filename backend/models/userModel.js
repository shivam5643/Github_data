import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    location: { type: String },
    blog: { type: String },
    bio: { type: String },
    public_repos: { type: Number },
    public_gists: { type: Number },
    followers: { type: Number },
    following: { type: Number },
    avatar_url: { type: String },
    created_at: { type: Date },
    isDeleted: { type: Boolean, default: false }, // For soft delete
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
