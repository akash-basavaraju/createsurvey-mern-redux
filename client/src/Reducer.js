import * as ActionTypes from "./ActionTypes";

export default function(state = null, action) {
  let updatedObj;
  let newArray;
  switch (action.type) {
    case ActionTypes.UPDATE_FORM_NAME:
      return {
        ...state,
        formMetaData: {
          ...state.formMetaData,
          formName: action.payload
        }
      };
    case ActionTypes.ADD_QUESTION:
      return {
        ...state,
        questionsArray: [
          ...state.questionsArray,
          {
            questionType: "Short answer",
            question: "",
            isRequired: false,
            answer: ""
          }
        ]
      };
    case ActionTypes.UPDATE_STORE:
      return action.payload;
    case ActionTypes.UPDATE_FORM_DESC:
      return {
        ...state,
        formMetaData: {
          ...state.formMetaData,
          formDescription: action.payload
        }
      };
    case ActionTypes.CHANGE_QUESTION_TYPE:
      updatedObj = {};
      switch (action.payload) {
        case "Short answer":
          updatedObj = {
            questionType: "Short answer",
            question: "",
            isRequired: false,
            answer: ""
          };
          break;
        case "Paragraph":
          updatedObj = {
            questionType: "Paragraph",
            question: "",
            isRequired: false,
            answer: ""
          };
          break;
        case "Multiple choice":
          updatedObj = {
            questionType: "Multiple choice",
            question: "",
            isRequired: false,
            optionsArray: [""],
            isOthersOptionPresent: false,
            answer: ""
          };
          break;
        case "Checkboxes":
          updatedObj = {
            questionType: "Checkboxes",
            question: "",
            isRequired: false,
            optionsArray: [""],
            isOthersOptionPresent: false,
            answersArray: []
          };
          break;
      }
      newArray = [...state.questionsArray];
      newArray.splice(action.index, 1, updatedObj);
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.CLONE_QUESTION:
      updatedObj = {};
      switch (action.questionType) {
        case "Short answer":
          updatedObj = {
            questionType: "Short answer",
            question: "",
            isRequired: false,
            answer: ""
          };
          break;
        case "Paragraph":
          updatedObj = {
            questionType: "Paragraph",
            question: "",
            isRequired: false,
            answer: ""
          };
          break;
        case "Multiple choice":
          updatedObj = {
            questionType: "Multiple choice",
            question: "",
            isRequired: false,
            optionsArray: [""],
            isOthersOptionPresent: false,
            answer: ""
          };
          break;
        case "Checkboxes":
          updatedObj = {
            questionType: "Checkboxes",
            question: "",
            isRequired: false,
            optionsArray: [""],
            isOthersOptionPresent: false,
            answersArray: []
          };
          break;
        case "Dropdown":
          updatedObj = {
            questionType: "Dropdown",
            question: "",
            isRequired: false,
            optionsArray: [""],
            isOthersOptionPresent: false,
            answer: ""
          };
          break;
      }
      newArray = [...state.questionsArray];
      newArray.splice(action.index + 1, 0, updatedObj);
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.REMOVE_QUESTION:
      return {
        ...state,
        questionsArray: state.questionsArray.filter(
          (q, i) => action.index !== i
        )
      };
    case ActionTypes.UPDATE_QUESTION:
      newArray = [...state.questionsArray];
      newArray[action.index].question = action.payload;
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.UPDATE_ANSWER:
      newArray = [...state.questionsArray];
      newArray[action.index].answer = action.payload;
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.UPDATE_OPTION:
      newArray = [...state.questionsArray];
      newArray[action.index].optionsArray[action.oindex] = action.payload;
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.ADD_OPTION:
      newArray = [...state.questionsArray];
      newArray[action.index].optionsArray.push(action.payload);
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.TOGGLE_OTHERS:
      newArray = [...state.questionsArray];
      newArray[action.index].isOthersOptionPresent = !newArray[action.index]
        .isOthersOptionPresent;
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.UPDATE_SELECTED_ANSWER:
      newArray = [...state.questionsArray];
      if (action.checked) {
        newArray[action.index].answersArray.push(action.payload);
      } else {
        let index = newArray[action.index].answersArray.indexOf(action.payload);
        if (index > -1) {
          newArray[action.index].answersArray.splice(index, 1);
        }
      }
      return {
        ...state,
        questionsArray: newArray
      };
    case ActionTypes.UPDATE_FORM_KEY:
      return { ...state, formKey: action.payload };
    default:
      return state;
  }
}
