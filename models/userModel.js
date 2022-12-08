import mongoose from "mongoose";
import autoIncrement from 'mongoose-sequence';
// import {getSequenceNextValue,insertUserCounter} from './sequencing';
// import {testme} from './sequencing';
// const sequencing = require("./sequencing")
import getUserSequenceNextValue from "./sequencing.js";
// import {getSequenceNextValue} from './sequencing';
// const AutoIncrement = autoIncrement(mongoose)
const userSchema = mongoose.Schema(
  {
    _id:Number,
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
  },
    { _id: false }
);
UserSchema.pre("save", function (next) {
  let doc = this;
  // getSequenceNextValue("user_id").
  // then(counter => {
  //     console.log("counter", counter);
  //     if(!counter) {
  //         sequencing.insertCounter("user_id")
  //         .then(counter => {
  //             doc._id = counter;
  //             console.log(doc)
  //             next();
  //         })
  //         .catch(error => next(error))
  //     } else {
  //         doc._id = counter;
  //         next();
  //     }
  // })
  // .catch(error => next(error))
});
// userSchema.plugin(AutoIncrement, {inc_field: '_id'});

const User = mongoose.model("User", userSchema);
export default User;
