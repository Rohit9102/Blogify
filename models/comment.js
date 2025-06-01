const {Schema, model} = require("mongoose");

const commentSection = new Schema({
  content:{
    type:String,
  },
  blog:{
    type:Schema.Types.ObjectId,
    ref:"blog",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
},
  {timestamps: true}
);

const Comment = model("comment", commentSection);

module.exports = Comment