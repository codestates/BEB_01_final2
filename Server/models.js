import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  ID: String,
  password: String,
  address: String,
  privateKey: String,
  HavingLands: {
    type: Number,
    default: 0,
  },
  Soldier: {
    type: Number,
    default: 500,
  },
});

export const UserDB = mongoose.model("User", UserSchema);

const ItemSchema = mongoose.Schema({
  reload: Boolean,
  id: Number,
  name: String,
  grade: String,
  src: String,
  pow: {
    type: Number,
    default: 0,
  },
});

export const ItemDB = mongoose.model("Item", ItemSchema);

const MapSchema = mongoose.Schema({
  reload: Boolean,
  idx: Number,
  owner: String,
  MapName: String,
  topography: String,
  GiveToken: String,
  src: String,
  force: {
    type: Number,
    default: 0,
  },
});

export const MapDB = mongoose.model("Map", MapSchema);

// // SPDX-License-Identifier: GPL-3.0
// pragma solidity 0.8.10;

// contract normalCharacter {

//     modifier isOwner(address _address){
//         require(checkUser[_address] == true);
//         _;
//     }
//     event NewUser(address indexed owner, uint indexed Pow, uint indexed limit);

//     mapping(address => bool) private checkUser;
//     mapping(address => Character)  private _Character;

//     struct Character {
//         uint32 Pow;
//         uint32 limit;
//     }

//     function makeCharacter(address _address) public returns(bool){
//         require(checkUser[_address] == false);
//         checkUser[_address] = true;
//         Character storage character = _Character[_address];
//         character.Pow = 100;
//         character.limit = 300;

//         emit NewUser(_address, character.Pow, character.limit);

//         return true;
//     }

//     function IncreaseLimit(address _address) isOwner(_address)  public {
//         Character storage character = _Character[_address];
//         character.limit +=300;

//     }

//     function IncreasePow(address _address) isOwner(_address) public {
//         Character storage character = _Character[_address];
//         character.Pow +=300;
//     }

//     function getPow(address _address) isOwner(_address) public view returns(uint32){
//         Character storage character = _Character[_address];
//         return character.Pow;
//     }

//     function getLimit(address _address) isOwner(_address) public view returns(uint32){
//         Character storage character = _Character[_address];
//         return character.limit;
//     }
//      function getUser(address _address) isOwner(_address) public view returns(Character memory){
//         return _Character[_address];
//     }

// }
