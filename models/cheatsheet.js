const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CheatsheetSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String},
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true},
  },
  {
    collection: "Cheat-sheets",
  }
);

// Virtual for cheatsheet's URL
CheatsheetSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need this object
  return `/cheatsheet/${this._id}`;
});

// Export model
module.exports = mongoose.model("Cheatsheet", CheatsheetSchema);
