import Questions from '../static/json/questions.json';
import { imageFiles } from './mediaFile';
import { apiManager } from "./apiManager";
import { logController } from './logController';
import Util from './util';

const hostname = window.location.hostname;

const QuestionManager = {
  questionField: null,
  QUESTION_TYPE: Object.freeze({
    questions: [],
  }),
  preloadedImages: [],
  preloadedImagesItem: [],

  preloadImagesFile() {
    logController.log("preloadedImages", this.preloadedImages);
    this.preloadedImages.forEach((item) => {
      const img = new Image();
      img.id = item[0];
      img.src = item[1];
      this.preloadedImagesItem.push(img);
      Util.updateLoadingStatus("Loading Images");
    });

    logController.log("preloadedImagesItem", this.preloadedImagesItem);
  },

  checkIsLogin: function (jwt = null, appId = null, levelkey = null, onCompleted = null, onError = null) {
    if (jwt && typeof jwt === 'string' && jwt.trim() !== '' &&
      appId && typeof appId === 'string' && appId.trim() !== '') {
      logController.log("JWT and App ID are valid.");
      apiManager.isLogined = true;
      this.loadQuestionData(jwt, appId, levelkey, onCompleted, onError);
    }
    else {
      apiManager.isLogined = false;
      logController.log("Missing JWT and App ID.");
      this.loadQuestionFromJson(levelkey, onCompleted);
    }
  },

  loadQuestionData: async function (jwt = null, appId = null, levelkey = null, onCompleted = null, onError = null) {
    try {
      await apiManager.postGameSetting(jwt, appId, () => this.loadQuestionFromJson(levelkey, onCompleted), () => onError());
    } catch (error) {
      if (onError) onError();
      console.error('Error loading JSON data:', error);
    }
  },

  loadQuestionFromJson: async function (levelkey = null, onCompleted = null) {
    let questionsJsonPath;
    let questions;

    logController.log("Account Logined", apiManager.isLogined);
    if (apiManager.questionJson && apiManager.isLogined) {
      questions = apiManager.questionJson;
      this.QUESTION_TYPE = { questions: questions };
    }
    else {
      logController.log("hostname", hostname);

      if (hostname.includes('dev.openknowledge.hk') ||
        hostname.includes('www.rainbowone.app')
      ) {
        // We're in the build context, use the relative path
        questionsJsonPath = './json/questions.json';
        const response = await fetch(questionsJsonPath);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${questionsJsonPath}: ${response.statusText}`);
        }
        questions = await response.json();
        logController.log(questions);
      } else {
        // We're in the development context, use the relative path
        questions = Questions;
        logController.log(questions);
      }

      this.QUESTION_TYPE = {
        questions: questions.questions,
      };
    }

    if (onCompleted) onCompleted();
    this.loadQuestionType(levelkey);
  },

  loadQuestionType: function (levelKey) {
    let question = null;
    if (levelKey) {
      question = {
        questions: this.QUESTION_TYPE.questions.filter(item => item.qid.includes(levelKey)),
      };
      this.preloadedImages = imageFiles.filter(img => img[0].includes(levelKey));
    }
    else {
      question = { questions: this.QUESTION_TYPE.questions };
      this.preloadedImages = imageFiles;
    }
    if (question.questions.length > 0)
      this.questionField = Object.freeze(question);

    if (this.preloadedImages !== null && this.preloadedImages !== undefined && this.preloadedImages.length > 0)
      this.preloadImagesFile();

    logController.log("Filtered: ", this.questionField);
  },


};

export default QuestionManager;
