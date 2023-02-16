const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubdivisionSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
    description: { type: String, required: true },
    cheatsheet: {
      type: Schema.Types.ObjectId,
      ref: "Cheatsheet",
      required: true,
    },
  },
  {
    collection: "Sections",
  }
);
// Export model
module.exports = mongoose.model("Subdivision", SubdivisionSchema);
