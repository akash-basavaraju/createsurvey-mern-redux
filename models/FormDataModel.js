const mongoose = require("mongoose");
const { Schema } = mongoose;

const FormDataSchema = new Schema({
  formKey: {
    type: String
  },
  formData: {
    appStore: {
      formKey: {
        type: String
      },
      toEmailId: {
        type: String
      },
      formMetaData: {
        formName: {
          type: String
        },
        formDescription: {
          type: String
        }
      },
      questionsArray: {
        type: Array
      },
      responseMode: {
        type: Boolean
      }
    }
  }
});

mongoose.model("FormDataModel", FormDataSchema);
