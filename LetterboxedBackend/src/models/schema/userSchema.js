  import mongoose from "mongoose";

  const userSchema = mongoose.Schema(
    {
      userName: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePic: { type: String, default: "" },
      bio: { type: String, default: "" },
      isAdmin: { type: Boolean, default: false },
      isBlocked: { type: Boolean, default: false },
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
      following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
      favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "filims" }],
      resetPasswordToken: { type: String },
      resetPasswordExpires: { type: Date },
      isSixteen:{type:Boolean, required:true},
      isPAP:{type:Boolean, required:true}

    },
    { timestamps: true }
  );

  export default mongoose.model("users", userSchema);
