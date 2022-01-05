import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  ID: String,
  password: String,
  address: String,
  privateKey: String,
  CharacterName: String,
  HavingLands: {
    type: [String],
    default: [],
  },
});

export const UserDB = mongoose.model("User", UserSchema);

const CharacterSchema = mongoose.Schema({
  CharacterName: String,
  Pow: Number,
  Soldier: Number,
  Level: Number,
});

export const CharacterDB = mongoose.model("Character", CharacterSchema);

const MapSchema = mongoose.Schema({
  reload: Boolean,
  owner: [String],
  MapName: [String],
  topography: [String],
  GiveToken: [Number],
  src: [String],
});

export const MapDB = mongoose.model("Map", MapSchema);
