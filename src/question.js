import { loadLevel } from "./level";
import questions from './questions.json'
/*const QUESTION_TYPE = Object.freeze({
  Spelling: [
    { QID: 'test1', question: 'apple', correctAnswer: 'apple' },
    { QID: 'test2', question: 'banana', correctAnswer: 'banana' },
    { QID: 'test3', question: 'cherry', correctAnswer: 'cherry' },
    { QID: 'test4', question: 'orange', correctAnswer: 'orange' },
    { QID: 'test5', question: 'pear', correctAnswer: 'pear' }
  ],
  MultipleChoice: [
    {
      QID: 'p3u1-e1',
      question: 'What is the color of apple?',
      answers: ['red', 'blue', 'purple', 'black'],
      correctAnswer: 'red'
    },
    {
      QID: 'p3u1-e2',
      question: 'What is the color of banana?',
      answers: ['red', 'yellow', 'purple', 'black'],
      correctAnswer: 'yellow'
    }
  ],
  FillingBlank: [
    //p2 questions
    { QID: 'p2u2-d1', question: 'Peter is good at playing____________. He has scored many goals.', correctAnswer: 'football' },
    { QID: 'p2u2-d2', question: 'Can you teach me how to ride a _________?', correctAnswer: 'bicycle' },
    { QID: 'p2u2-d3', question: 'Sally’s dog, Coco can get the ________ back in two seconds.', correctAnswer: 'frisbee' },
    { QID: 'p2u2-d4', question: 'My dad just bought me a new ______. It is fun to play with.', correctAnswer: 'scooter' },
    { QID: 'p2u2-d5', question: 'Sam and Peter are battling on the _________.', correctAnswer: 'seesaw' },
    { QID: 'p2u2-d6', question: 'We all love the _______ because it feels like flying in the sky.', correctAnswer: 'swing' },
    { QID: 'p2u2-d7', question: 'Wow! This is the fastest ______ever!', correctAnswer: 'slide' },
    { QID: 'p2u2-d8', question: 'Should we play some______ such as hide-and-seek?', correctAnswer: 'games' },
    { QID: 'p2u2-d9', question: 'Let’s take some beautiful _______before we go!', correctAnswer: 'photos' },
    { QID: 'p2u2-d10', question: 'Mom, please buy more chicken wings for the ____________tomorrow!', correctAnswer: 'barbecue' },
    { QID: 'p2u2-d11', question: 'I don’t think grandma can ______ the stairs. It’s very tiring.', correctAnswer: 'climb' },
    { QID: 'p2u2-d12', question: 'Excuse me, what would you like to ______?', correctAnswer: 'drink' },
    { QID: 'p2u2-d13', question: 'I am ___________ the room all by myself!', correctAnswer: 'painting' },
    { QID: 'p2u2-d14', question: 'Don’t ______ on the floor, or I will tell Mr. Lam!', correctAnswer: 'spit' },
    { QID: 'p2u2-d15', question: 'You must not ________. The rubbish bin is right next to you.', correctAnswer: 'litter' },
    { QID: 'p2u2-d16', question: 'My mom is making me cheese and ham __________ for lunch.', correctAnswer: 'sandwiches' },
    { QID: 'p2u2-d17', question: 'What is your favourite fruit? I love __________.', correctAnswer: 'strawberries' },
    { QID: 'p2u2-d18', question: 'Do you know where we can go for a ______?', correctAnswer: 'picnic' },
    { QID: 'p2u2-d19', question: 'We cannot pick _________ in the park.', correctAnswer: 'flowers' },
    { QID: 'p2u2-d20', question: 'Mona likes to go ________because she can see the bright stars at night.', correctAnswer: 'camping' },
  ],
  Listening: [
    //p3 questions
    { QID: 'p3u2-c1', question: 'general', correctAnswer: 'general' },
    { QID: 'p3u2-c2', question: 'maths', correctAnswer: 'maths' },
    { QID: 'p3u2-c3', question: 'english', correctAnswer: 'english' },
    { QID: 'p3u2-c4', question: 'physical', correctAnswer: 'physical' },
    { QID: 'p3u2-c5', question: 'science', correctAnswer: 'science' },
    { QID: 'p3u2-c6', question: 'history', correctAnswer: 'history' },
    { QID: 'p3u2-c7', question: 'arts', correctAnswer: 'arts' },
    { QID: 'p3u2-c8', question: 'geography', correctAnswer: 'geography' },
    { QID: 'p3u2-c9', question: 'computer', correctAnswer: 'computer' },
    { QID: 'p3u2-c10', question: 'music', correctAnswer: 'music' },
    { QID: 'p3u2-c11', question: 'religious', correctAnswer: 'religious' },
    { QID: 'p3u2-c12', question: 'project', correctAnswer: 'project' },
    { QID: 'p3u2-c13', question: 'dictate', correctAnswer: 'dictate' },
    { QID: 'p3u2-c14', question: 'visual', correctAnswer: 'visual' },
    { QID: 'p3u2-c15', question: 'internet', correctAnswer: 'internet' },
    { QID: 'p3u2-c16', question: 'outing', correctAnswer: 'outing' },
    { QID: 'p3u2-c17', question: 'attention', correctAnswer: 'attention' },
    { QID: 'p3u2-c18', question: 'listen', correctAnswer: 'listen' },
    { QID: 'p3u2-c19', question: 'learn', correctAnswer: 'learn' },
    { QID: 'p3u2-c20', question: 'improve', correctAnswer: 'improve' },
  ],
  Picture: [
    //p5 questions
    { QID: 'p5u1-b1', question: 'vehicle', correctAnswer: 'vehicle', media: 'p5u1-b1.jpg' },
    { QID: 'p5u1-b2', question: 'airport', correctAnswer: 'airport', media: 'p5u1-b2.jpg' },
    { QID: 'p5u1-b3', question: 'motorbike', correctAnswer: 'motorbike', media: 'p5u1-b3.jpg' },
    { QID: 'p5u1-b4', question: 'subway', correctAnswer: 'subway', media: 'p5u1-b4.jpg' },
    { QID: 'p5u1-b5', question: 'highway', correctAnswer: 'highway', media: 'p5u1-b5.jpg' },
    { QID: 'p5u1-b6', question: 'carpark', correctAnswer: 'carpark', media: 'p5u1-b6.jpg' },
    { QID: 'p5u1-b7', question: 'railway', correctAnswer: 'railway', media: 'p5u1-b7.jpg' },
    { QID: 'p5u1-b8', question: 'tunnel', correctAnswer: 'tunnel', media: 'p5u1-b8.jpg' },
    { QID: 'p5u1-b9', question: 'flyover', correctAnswer: 'flyover', media: 'p5u1-b9.jpg' },
    { QID: 'p5u1-b10', question: 'footbridge', correctAnswer: 'footbridge', media: 'p5u1-b10.jpg' },
    { QID: 'p5u1-b11', question: 'road signs', correctAnswer: 'road signs', media: 'p5u1-b11.jpg' },
    { QID: 'p5u1-b12', question: 'tram', correctAnswer: 'tram', media: 'p5u1-b12.jpg' },
    { QID: 'p5u1-b13', question: 'queue', correctAnswer: 'queue', media: 'p5u1-b13.jpg' },
    { QID: 'p5u1-b14', question: 'pavement', correctAnswer: 'pavement', media: 'p5u1-b14.jpg' },
    { QID: 'p5u1-b15', question: 'terminal', correctAnswer: 'terminal', media: 'p5u1-b15.jpg' },
    { QID: 'p5u1-b16', question: 'platform', correctAnswer: 'platform', media: 'p5u1-b16.jpg' },
    { QID: 'p5u1-b17', question: 'pedestrain', correctAnswer: 'pedestrain', media: 'p5u1-b17.jpg' },
    { QID: 'p5u1-b18', question: 'crossing', correctAnswer: 'crossing', media: 'p5u1-b18.jpg' },
    { QID: 'p5u1-b19', question: 'vessel', correctAnswer: 'vessel', media: 'p5u1-b19.jpg' },
    { QID: 'p5u1-b20', question: 'traffic jam', correctAnswer: 'traffic jam', media: 'p5u1-b20.jpg' },
  ],
});*/

const QuestionManager = {
  QUESTION_TYPE: Object.freeze({
    Spelling: [],
    MultipleChoice: [],
    FillingBlank: [],
    Listening: [],
    Picture: [],
  }),

  loadQuestionData: function () {
    try {
      this.QUESTION_TYPE = {
        Spelling: questions.Spelling,
        MultipleChoice: questions.MultipleChoice,
        FillingBlank: questions.FillingBlank,
        Listening: questions.Listening,
        Picture: questions.Picture,
      };
    } catch (error) {
      console.error('Error loading JSON data:', error);
    }
  },

  questionType: function () {
    let level = loadLevel();
    let question = null;
    let questionField = null;
    switch (level) {
      case 'p3u1':
        question = { MultipleChoice: this.QUESTION_TYPE.MultipleChoice };
        questionField = Object.freeze(question);
        break;
      case 'p2u2':
        question = {
          FillingBlank: this.QUESTION_TYPE.FillingBlank.filter(item => item.QID.includes(level)),
        };
        if (question.FillingBlank.length > 0) questionField = Object.freeze(question);
        break;
      case 'p3u2':
        question = {
          Listening: this.QUESTION_TYPE.Listening.filter(item => item.QID.includes(level)),
        };
        if (question.Listening.length > 0) questionField = Object.freeze(question);
        break;
      case 'p5u1':
        question = {
          Picture: this.QUESTION_TYPE.Picture.filter(item => item.QID.includes(level)),
        };
        if (question.Picture.length > 0) questionField = Object.freeze(question);
        break;
      case 'all':
        questionField = this.QUESTION_TYPE;
        break;
    }
    return questionField;
  }
};

export default QuestionManager;
