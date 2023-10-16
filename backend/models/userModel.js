import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);


userSchema.methods.matchPassword = async function (enteredPassword) {  // to match the entered password with the hashed password in the database
    return await bcrypt.compare(enteredPassword, this.password);  // this.password ==> hashed password in the database 😊
}

// Encrypt password before saving the user
userSchema.pre('save', async function (next) {  // to hash the password before saving the user in the database
    if (!this.isModified('password')) {  // if the password is not modified (i.e. if the user is not created or updated)
        next();  // go to the next middleware
    }

    const salt = await bcrypt.genSalt(10);  // generate a salt
    this.password = await bcrypt.hash(this.password, salt);  // hash the password


});
const User = mongoose.model('User', userSchema);

export default User;
