import View from './view';
import State from './state';
import Sound from './sound';

export default {
  fallingId: 0,
  questionType: null,
  question: '',
  itemDistance: 200,
  score: 0,
  time: 0,
  remainingTime: 60,
  optionSize: 0,
  timer: null,
  timerRunning: false,
  nextQuestion: true,
  randomPair: [],
  fallingItems: [],
  defaultStrings: [],
  answerLength: 0,
  questionWrapper: null,
  answerWrapper: null,
  fillwordTime: 0,
  redBoxX: 0,
  redBoxY: 0,
  redBoxWidth: 0,
  redBoxHeight: 0,
  leftCount: 0,
  rightCount: 0,

  init() {
    //View.showTips('tipsReady');
    this.fallingId = 0;
    View.timeText.innerText = this.remainingTime;
    this.questionType = null;
    this.question = '';
    this.itemDistance = 200;
    this.score = 0;
    this.time = 0;
    this.timerRunning = false;
    this.nextQuestion = true;
    this.addScore(0);
    this.randomPair = [];
    this.fallingItems = [];
    this.stopCountTime();
    this.fillwordTime = 0;
    this.questionWrapper = null;
    this.answerWrapper = null;
    View.scoreBoard.className = "scoreBoard";
    this.defaultStrings = ['apple', 'banana', 'cherry', 'orange', 'pear'];
    this.answerLength = 0;
    this.optionSize = View.canvas.width / 8;
    this.redBoxX = View.canvas.width / 3;
    this.redBoxY = (View.canvas.height / 5) * 3;
    this.redBoxWidth = View.canvas.width / 3;
    this.redBoxHeight = (View.canvas.height / 5) * 2;
    this.leftCount = 0;
    this.rightCount = 0;
  },

  QUESTION_TYPE: {
    Spelling: [
      { question: 'apple', correctAnswer: 'apple' },
      { question: 'banana', correctAnswer: 'banana' },
      { question: 'cherry', correctAnswer: 'cherry' },
      { question: 'orange', correctAnswer: 'orange' },
      { question: 'pear', correctAnswer: 'pear' }
    ],
    MultipleChoice: [
      { question: 'What is the color of apple?', answers: ['red', 'blue', 'purple', 'black'], correctAnswer: 'red' },
      { question: 'What is the color of banana?', answers: ['red', 'yellow', 'purple', 'black'], correctAnswer: 'yellow' }
    ]
    //Listening:2,
    //Photo:3
  },

  addScore(mark) {
    let newScore = this.score + mark;
    if (newScore < 0) newScore = 0;
    this.score = newScore;
    View.scoreText.innerText = this.score;
    View.finishedScore.innerText = this.score;
  },

  startCountTime() {
    if (!this.startedGame) {
      this.time = this.remainingTime;
      this.startedGame = true;
    }

    if (!this.timerRunning) {
      this.showQuestions(true);
      this.timerRunning = true;
      this.countTime();
    }
  },
  countTime() {
    if (this.timerRunning) {
      if (this.nextQuestion) {
        this.setQuestions();
        this.nextQuestion = false;
      }
      this.time--;
      View.timeText.innerText = this.time;

      if (this.fallingItems.length < this.randomPair.length) {
        if (this.fallingId < this.fallingItems.length) {
          this.fallingId += 1;
        }
        else {
          this.fallingId = 0;
        }
        this.createRandomItem(this.randomPair[this.fallingId]);
      }

      if (this.time <= 0) {
        this.stopCountTime();
        State.changeState('finished');
      } else {
        this.timer = setTimeout(this.countTime.bind(this), 2000);
      }
    }
  },
  stopCountTime() {
    if (this.timerRunning) {
      clearInterval(this.timer);
      this.timerRunning = false;
      this.showQuestions(false);
    }
  },
  getTranslateYValue(transformStyle) {
    const translateYRegex = /translateY\((-?\d+\.?\d*)px\)/;
    const match = transformStyle.match(translateYRegex);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return 0;
  },
  updateFallingItems() {
    // console.log(this.fallingItems);
    this.fallingItems.forEach((item) => {
      const element = document.getElementById(item.id);
      const transformStyle = window.getComputedStyle(element).getPropertyValue('transform');
      const translateYValue = this.getTranslateYValue(transformStyle);
      const bottomHeight = View.canvas.height;

      if (translateYValue >= bottomHeight) {
        this.handleItemReachedBottom(item);
      }
    });
    requestAnimationFrame(this.updateFallingItems.bind(this));
  },
  generateUniqueId() {
    return Math.random().toString(16).slice(2);
  },
  createRandomItem(char) {
    if (char && char.length !== 0) {
      const isLeft = this.getBalancedRandom();
      const word = char;
      const generatePosition = () => {
        const x = this.generatePositionX(isLeft);
        const id = this.generateUniqueId();
        const optionWrapper = this.createOptionWrapper(word, id);
        const newFallingItem = {
          x,
          optionWrapper,
          id,
        };
        return newFallingItem;
      };

      const newFallingItem = generatePosition();
      this.fallingItems.push(newFallingItem);
      this.renderFallingItem(newFallingItem);
    }
  },

  getBalancedRandom() {
    if (this.leftCount > this.rightCount) {
      this.rightCount++;
      return false;
    } else if (this.rightCount > this.leftCount) {
      this.leftCount++;
      return true;
    } else {
      const isLeft = Math.round(Math.random()) === 0;
      if (isLeft) {
        this.leftCount++;
      } else {
        this.rightCount++;
      }
      return isLeft;
    }
  },

  generatePositionX(isLeft) {
    if (isLeft) {
      return Math.round(this.getRandomInt(0, this.redBoxX - this.optionSize));
    }
    else {
      return Math.round(this.getRandomInt((this.redBoxX + this.redBoxWidth),
        View.canvas.width - this.optionSize));
    }
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  createOptionWrapper(text, id) {
    let optionWrapper = document.createElement('div');
    optionWrapper.classList.add('optionWrapper');
    optionWrapper.style.width = `${this.optionSize}px`;
    optionWrapper.style.height = `${this.optionSize}px`;
    optionWrapper.id = id;
    optionWrapper.setAttribute('word', text);
    let option = document.createElement('input');
    option.classList.add('option');
    option.type = 'text';
    option.value = text;
    optionWrapper.appendChild(option);
    return optionWrapper;
  },
  renderFallingItem(item) {
    View.optionArea.appendChild(item.optionWrapper);
    item.optionWrapper.classList.add("show");
    item.optionWrapper.style.left = item.x + 'px';
    item.optionWrapper.style.setProperty('--top-height', `${-(View.canvas.height * 0.1)}px`);
    item.optionWrapper.style.setProperty('--bottom-height', `${View.canvas.height}px`);

    item.optionWrapper.addEventListener('animationend', () => {
      item.optionWrapper.classList.remove('show');
      setTimeout(() => {
        this.handleItemReachedBottom(item.optionWrapper);
        item.optionWrapper.classList.add('show');
      }, 2000);
    });
  },

  getRandomQuestions(string) {
    const randomIndex = Math.floor(Math.random() * string.length);
    return string[randomIndex];
  },
  handleItemReachedBottom(item) {
    const isLeft = this.getBalancedRandom();
    item.x = this.generatePositionX(isLeft);
    item.style.left = item.x + 'px';
  },
  removeFallingItem(item) {
    const index = this.fallingItems.indexOf(item);
    if (index > -1) {
      this.fallingItems.splice(index, 1);
      View.optionArea.removeChild(item.optionWrapper);
    }
  },
  removeFallingItemByIndex(id) {
    const item = this.fallingItems.find(item => item.id === id);
    if (item) {
      const index = this.fallingItems.indexOf(item);
      this.fallingItems.splice(index, 1);
      View.optionArea.removeChild(item.optionWrapper);
    }
  },
  /////////////////////////////////////////QUestions///////////////////////////////
  randQuestionType() {
    const questionTypeKeys = Object.keys(this.QUESTION_TYPE);
    const randomIndex = Math.floor(Math.random() * questionTypeKeys.length);
    const selectedType = questionTypeKeys[randomIndex];
    const questions = this.QUESTION_TYPE[selectedType];
    const randomQuestionIndex = Math.floor(Math.random() * questions.length);
    return {
      type: selectedType,
      question: questions[randomQuestionIndex].question,
      answers: questions[randomQuestionIndex].answers,
      correctAnswer: questions[randomQuestionIndex].correctAnswer
    };
  },
  generateCharArray(word) {
    var chars = word.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars;
  },
  randomizeAnswers(array) {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    return array.slice().sort(() => Math.random() - 0.5);
  },

  randomOptions() {
    console.log('question class', this.questionType);
    //console.log('question', this.questionType.question);
    //console.log('question type', this.questionType.type);
    //console.log('question answers', this.questionType.answers);

    switch (this.questionType.type) {
      case 'Spelling':
        var array = this.generateCharArray(this.question);
        this.answerLength = array.length;
        return array;
      case 'MultipleChoice':
        this.answerLength = 1;
        return this.randomizeAnswers(this.questionType.answers);
    }
  },
  setQuestions() {
    this.questionType = this.randQuestionType();
    this.question = this.questionType.question;
    this.randomPair = this.randomOptions();
    this.questionWrapper = document.createElement('div');
    this.questionWrapper.style.width = this.redBoxWidth + 'px';
    var questionText = document.createElement('span');
    questionText.classList.add('questionText');
    questionText.textContent = this.questionType.question;
    this.questionWrapper.appendChild(questionText);
    this.answerWrapper = document.createElement('span');
    this.answerWrapper.style.width = this.redBoxWidth + 'px';
    this.questionWrapper.classList.add('questionWrapper');
    this.answerWrapper.classList.add('answerWrapper');
    this.questionWrapper.value = this.question;
    View.stageImg.appendChild(this.questionWrapper);
    View.stageImg.appendChild(this.answerWrapper);
  },
  showQuestions(status) {
    View.stageImg.style.display = status ? '' : 'none';
    View.optionArea.style.display = status ? '' : 'none';
    if (!status) {
      this.fallingItems.splice(0);
      View.optionArea.innerHTML = '';
    }
  },
  finishedGame() {
    this.question = '';
    this.fallingItems.splice(0);
    View.stageImg.innerHTML = '';
    View.optionArea.innerHTML = '';
  },

  fillWord(option) {
    if (this.answerWrapper) {
      if (this.fillwordTime < this.answerLength) {
        this.answerWrapper.textContent += option.getAttribute('word');
        option.classList.remove('show');
        option.classList.add('fadeOut');
        View.optionArea.removeChild(option);
        this.fillwordTime += 1;
        if (State.isSoundOn) {
          Sound.stopAll('bgm');
          Sound.play('btnClick');
        }
        if (this.fillwordTime == this.answerLength) {
          setTimeout(() => {
            this.checkAnswer(this.answerWrapper.textContent);
          }, 1000);
        }
      }
    }
  },

  resetFillWord() {
    this.randomPair = this.randomOptions();
    this.answerWrapper.classList.remove('correct');
    this.answerWrapper.classList.remove('wrong');
    this.answerWrapper.textContent = '';
    this.fillwordTime = 0;
    this.fallingItems.splice(0);
    View.optionArea.innerHTML = '';
  },

  checkAnswer(answer) {
    if (answer === this.questionType.correctAnswer) {
      //答岩1分，答錯唔扣分
      this.addScore(1);
      this.answerWrapper.classList.add('correct');
      State.changeState('playing', 'ansCorrect');
    } else {
      //this.addScore(-1);
      this.answerWrapper.classList.add('wrong');
      State.changeState('playing', 'ansWrong');
    }
  },

  moveToNextQuestion() {
    this.resetFillWord();
    this.nextQuestion = true;
    View.stageImg.innerHTML = '';
  }

}
