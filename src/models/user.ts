import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { Document, model, Schema } from "mongoose";
import { isEmail } from "validator";
export interface UserType extends Document {
  name: string;
  email: string;
  phone?: string;
  createdAt: Date;
  token: string;
  password: string;
  hashPassword();
  authenticateUser(password: string);
  createToken();
  toJSON();
}

export const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: {unique: true, dropDups: true},
    validate: [isEmail, "Invalid Email"]
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    trim: true,
    minlength: [6, "Password need to be longer!"],
  },
  role: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.pre("save", function(next) {
  this.role = "Student";
  this.updatedAt = Date.now();
  if (this.isModified("password")) {
    this.password = this.hashPassword(this.password);
  }
  return next();
});

userSchema.methods = {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },
  authenticateUser(password) {
    return bcrypt.compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign({
      _id: this._id,
      name: this.name,
      email: this.email,
      role: this.role
    },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  },
  toJSON() {
    return {
      _id: this._id,
      email: this.email,
      name: this.name,
      token: this.createToken(),
    };
  },
};

const User = model<UserType>("User", userSchema);
export default User;
