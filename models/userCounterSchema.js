import mongoose from "mongoose";

const userCounterSchema = mongoose.Schema(
  {
    _id: {
        type: String,
        required: true,
    },
    seq: {
      type: Number,
      required: true,
    },
  },
  
);



userCounterSchema.pre("save", async function (next) {
  
});

const getSequenceNextValue = (seqName)=>{
console.log("getSequenceNextValue : ",seqName)
}

const insertCounter = (seqName)=>{
    console.log("insertCounter : ",seqName)
}
const UserCounter = mongoose.model("UserCounter", userCounterSchema);

module.exports = {
    UserCounter,
    getSequenceNextValue,
    insertCounter
}
