import { loadLevel } from "./level";
const QUESTION_TYPE = Object.freeze({
  Spelling: [
    { question: 'apple', correctAnswer: 'apple' },
    { question: 'banana', correctAnswer: 'banana' },
    { question: 'cherry', correctAnswer: 'cherry' },
    { question: 'orange', correctAnswer: 'orange' },
    { question: 'pear', correctAnswer: 'pear' }
  ],
  MultipleChoice: [
    {
      question: 'What is the color of apple?',
      answers: ['red', 'blue', 'purple', 'black'],
      correctAnswer: 'red'
    },
    {
      question: 'What is the color of banana?',
      answers: ['red', 'yellow', 'purple', 'black'],
      correctAnswer: 'yellow'
    }
  ],
  FillingBlank: [
    //p2 questions
    { key: 'p2u2-d1', question: 'Peter is good at playing____________. He has scored many goals.', correctAnswer: 'football' },
    { key: 'p2u2-d2', question: 'Can you teach me how to ride a _________?', correctAnswer: 'bicycle' },
    { key: 'p2u2-d3', question: 'Sally’s dog, Coco can get the ________ back in two seconds.', correctAnswer: 'frisbee' },
    { key: 'p2u2-d4', question: 'My dad just bought me a new ______. It is fun to play with.', correctAnswer: 'scooter' },
    { key: 'p2u2-d5', question: 'Sam and Peter are battling on the _________.', correctAnswer: 'seesaw' },
    { key: 'p2u2-d6', question: 'We all love the _______ because it feels like flying in the sky.', correctAnswer: 'swing' },
    { key: 'p2u2-d7', question: 'Wow! This is the fastest ______ever!', correctAnswer: 'slide' },
    { key: 'p2u2-d8', question: 'Should we play some______ such as hide-and-seek?', correctAnswer: 'games' },
    { key: 'p2u2-d9', question: 'Let’s take some beautiful _______before we go!', correctAnswer: 'photos' },
    { key: 'p2u2-d10', question: 'Mom, please buy more chicken wings for the ____________tomorrow!', correctAnswer: 'barbecue' },
    { key: 'p2u2-d11', question: 'I don’t think grandma can ______ the stairs. It’s very tiring.', correctAnswer: 'climb' },
    { key: 'p2u2-d12', question: 'Excuse me, what would you like to ______?', correctAnswer: 'drink' },
    { key: 'p2u2-d13', question: 'I am ___________ the room all by myself!', correctAnswer: 'painting' },
    { key: 'p2u2-d14', question: 'Don’t ______ on the floor, or I will tell Mr. Lam!', correctAnswer: 'spit' },
    { key: 'p2u2-d15', question: 'You must not ________. The rubbish bin is right next to you.', correctAnswer: 'litter' },
    { key: 'p2u2-d16', question: 'My mom is making me cheese and ham __________ for lunch.', correctAnswer: 'sandwiches' },
    { key: 'p2u2-d17', question: 'What is your favourite fruit? I love __________.', correctAnswer: 'strawberries' },
    { key: 'p2u2-d18', question: 'Do you know where we can go for a ______?', correctAnswer: 'picnic' },
    { key: 'p2u2-d19', question: 'We cannot pick _________ in the park.', correctAnswer: 'flowers' },
    { key: 'p2u2-d20', question: 'Mona likes to go ________because she can see the bright stars at night.', correctAnswer: 'camping' },
  ],
  Listening: [
    //p3 questions
    { key: 'p3u2-c1', question: 'general', correctAnswer: 'general' },
    { key: 'p3u2-c2', question: 'maths', correctAnswer: 'maths' },
    { key: 'p3u2-c3', question: 'english', correctAnswer: 'english' },
    { key: 'p3u2-c4', question: 'physical', correctAnswer: 'physical' },
    { key: 'p3u2-c5', question: 'science', correctAnswer: 'science' },
    { key: 'p3u2-c6', question: 'history', correctAnswer: 'history' },
    { key: 'p3u2-c7', question: 'arts', correctAnswer: 'arts' },
    { key: 'p3u2-c8', question: 'geography', correctAnswer: 'geography' },
    { key: 'p3u2-c9', question: 'computer', correctAnswer: 'computer' },
    { key: 'p3u2-c10', question: 'music', correctAnswer: 'music' },
    { key: 'p3u2-c11', question: 'religious', correctAnswer: 'religious' },
    { key: 'p3u2-c12', question: 'project', correctAnswer: 'project' },
    { key: 'p3u2-c13', question: 'dictate', correctAnswer: 'dictate' },
    { key: 'p3u2-c14', question: 'visual', correctAnswer: 'visual' },
    { key: 'p3u2-c15', question: 'internet', correctAnswer: 'internet' },
    { key: 'p3u2-c16', question: 'outing', correctAnswer: 'outing' },
    { key: 'p3u2-c17', question: 'attention', correctAnswer: 'attention' },
    { key: 'p3u2-c18', question: 'listen', correctAnswer: 'listen' },
    { key: 'p3u2-c19', question: 'learn', correctAnswer: 'learn' },
    { key: 'p3u2-c20', question: 'improve', correctAnswer: 'improve' },
  ],
});

const questionType = () => {
  let level = loadLevel();
  let question = null;
  let questionField = null;
  switch (level) {
    case 'p3u1':
      question = { MultipleChoice: QUESTION_TYPE.MultipleChoice };
      questionField = Object.freeze(question);
      break;
    case 'p2u2':
      question = {
        FillingBlank: QUESTION_TYPE.FillingBlank.filter(item => item.key.includes(level)),
      };
      if (question.FillingBlank.length > 0) questionField = Object.freeze(question);
      break;
    case 'p3u2':
      question = {
        Listening: QUESTION_TYPE.Listening.filter(item => item.key.includes(level)),
      };
      if (question.Listening.length > 0) questionField = Object.freeze(question);
      break;
    case 'all':
      questionField = QUESTION_TYPE;
      break;
  }
  console.log(questionField);
  return questionField;
}

export { questionType };
