import mongoose from 'mongoose';

const { Schema } = mongoose;

const guildSchema = new Schema({
  idS: {
    type: String,
  },
  registro: {
    type: Boolean, default: false
  },
  coins: {
    type: Number, default: 0
  }
});

const Guild = mongoose.model('Guilds', guildSchema);

export default Guild;