const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "Tags",
  }
);

// Virtual for tag's URL
TagSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/tag/${this._id}`;
});

// Export model
module.exports = mongoose.model("Tag", TagSchema);