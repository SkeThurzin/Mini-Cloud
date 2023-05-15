import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  idU: {
    type: String,
  },
});

const User = mongoose.model('Users', userSchema);

export default User;