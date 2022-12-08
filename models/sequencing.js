const mongoose = require("mongoose");

const userCounterSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        required: true
    }
});

const userCounter = mongoose.model('userCounter', userCounterSchema);

const getUserSequenceNextValue = (seqName) => {
    return new Promise((resolve, reject) => {
        userCounter.findByIdAndUpdate(
            { "_id": seqName },
            { "$inc": { "seq": 1 } }
            , (error, counter) => {
                if (error) {
                    reject(error);
                }
                if(counter) {
                    resolve(counter.seq + 1);
                } else {
                    resolve(null);
                }
            });
    });
};

const insertUserCounter = (seqName) => {
    console.log("insertUserCounter : ",insertUserCounter)
    const newCounter = new userCounter({ _id: seqName, seq: 1 });
    return new Promise((resolve, reject) => {
    newCounter.save()
        .then(data => {
            resolve(data.seq);
        })
        .catch(err => reject(error));
    });
}
const testme = ()=>{console.log("testme")}
// module.exports = {
//     userCounter,
//     getUserSequenceNextValue,
//     insertUserCounter,
//     testme
// }

export default getUserSequenceNextValue;