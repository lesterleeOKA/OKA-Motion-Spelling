import View from './view';
import State from './state';
import Sound from './sound';
import { parseUrlParams } from "./level";
import QuestionManager from './question';

export default {
  fallingId: 0,
  refallingId: 0,
  questionType: null,
  randomQuestion: null,
  question: '',
  score: 0,
  time: 0,
  remainingTime: 0,
  optionSize: 0,
  fallingOption: null,
  timer: null,
  timerRunning: false,
  nextQuestion: true,
  randomPair: [],
  fallingItems: [],
  reFallingItems: [],
  typedItems: [],
  answeredNum: 0,
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
  fallingDelay: 0,
  finishedCreateOptions: false,
  eachQAMark: 0,
  isPlayLastTen: false,
  isTriggeredBackSpace: false,
  selectedCount: 0,
  columnWidth: 0,
  numberOfColumns: 4,
  wholeScreenColumnSeperated: false,

  init() {
    //View.showTips('tipsReady');
    const { gameTime } = parseUrlParams();
    this.startedGame = false;
    this.fallingId = 0;
    this.remainingTime = gameTime !== null ? gameTime : 120;
    this.updateTimerDisplay(this.remainingTime);
    this.questionType = QuestionManager.questionField;
    this.randomQuestion = null;
    this.question = '';
    this.score = 0;
    this.time = 0;
    this.timerRunning = false;
    this.nextQuestion = true;
    this.addScore(0);
    this.randomPair = [];
    this.fallingItems = [];
    this.reFallingItems = [];
    this.refallingId = 0;
    this.typedItems = [];
    this.stopCountTime();
    this.fillwordTime = 0;
    this.questionWrapper = null;
    this.answerWrapper = null;
    View.scoreBoard.className = "scoreBoard";
    this.answeredNum = 0;
    this.answerLength = 0;
    this.optionSize = View.canvas.width / 7.5;
    this.redBoxX = View.canvas.width / 3;
    this.redBoxY = (View.canvas.height / 5) * 3;
    this.redBoxWidth = View.canvas.width / 3;
    this.redBoxHeight = (View.canvas.height / 5) * 2;
    this.leftCount = 0;
    this.rightCount = 0;
    this.fallingDelay = 1000;
    View.stageImg.innerHTML = '';
    View.optionArea.innerHTML = '';
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    this.finishedCreateOptions = false;
    this.eachQAMark = 10;
    View.hideSuccess();
    View.hideFailure();
    for (let i = 1; i < 4; i++) {
      let star = document.getElementById("star" + i);
      if (star) {
        star.classList.remove("show");
      }
    }
    this.isPlayLastTen = false;
    this.isTriggeredBackSpace = false;

  },

  handleVisibilityChange() {
    if (document.hidden) {
      this.pauseGame();
    } else {
      this.resumeGame();
    }
  },

  pauseGame() {
    if (this.timerRunning && this.startedGame) {
      clearTimeout(this.timer);
      cancelAnimationFrame(this.fallingOption);
      this.timerRunning = false;
      this.showQuestions(false);
    }
  },

  resumeGame() {
    if (this.startedGame && !this.timerRunning) {
      this.showQuestions(true);
      this.timerRunning = true;
      this.countTime();
      this.startFalling();
    }
  },

  addScore(mark) {
    let newScore = this.score + mark;
    let starNum = 0;

    if (newScore < 0)
      newScore = 0;

    if (newScore >= 30 && newScore < 60) {
      starNum = 1;
      const star1 = document.getElementById("star1");
      star1.classList.add('show');
      View.showSuccess();
    }
    else if (newScore >= 60 && newScore <= 90) {
      starNum = 2;
      const star2 = document.getElementById("star2");
      star2.classList.add('show');
    }
    else if (newScore > 90) {
      starNum = 3;
      const star3 = document.getElementById("star3");
      star3.classList.add('show');
    }
    else {
      View.showFailure();
    }

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
      this.finishedCreateOptions = false;
      this.countTime();
      this.startFalling();
    }
  },

  startFalling() {
    const falling = (timestamp) => {
      if (!this.lastFallingTime) this.lastFallingTime = timestamp;
      const elapsed = timestamp - this.lastFallingTime;

      //console.log(this.finishedCreateOptions);
      if (elapsed >= this.fallingDelay) {
        if (!this.finishedCreateOptions && this.randomPair.length > 0) {
          if (this.fallingItems.length < this.randomPair.length) {
            if (this.fallingId < this.fallingItems.length) {
              console.log("falling id:", this.fallingId);
              this.fallingId += 1;
            } else {
              this.fallingId = 0;
            }
            var optionImageId = this.fallingId % View.preloadedFallingImages.length;
            this.createRandomItem(this.randomPair[this.fallingId], View.preloadedFallingImages[optionImageId]);
          }
          else {
            this.finishedCreateOptions = true;
            console.log("finished created all");
          }
        }
        else {
          if (this.reFallingItems.length > 0) {
            let refallingItem = this.reFallingItems[0];
            this.resetFallingItem(refallingItem);
            this.reFallingItems.splice(0, 1);
          }
        }
        this.lastFallingTime = timestamp;
      }

      if (this.timerRunning) {
        this.fallingOption = requestAnimationFrame(falling);
      }
    };
    this.fallingOption = requestAnimationFrame(falling);
  },

  countTime() {
    if (this.timerRunning) {
      if (this.nextQuestion) {
        this.setQuestions();
        this.nextQuestion = false;
      }
      this.time--;
      this.updateTimerDisplay(this.time);

      if (this.time <= 10 && !this.isPlayLastTen) {
        if (State.isSoundOn) {
          Sound.play('lastTen', true);
          console.log('play last ten!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
        }
        View.timeText.classList.add('lastTen');
        this.isPlayLastTen = true;
      }

      if (this.time <= 0) {
        this.stopCountTime();
        View.timeText.classList.remove('lastTen');
        State.changeState('finished');
        this.startedGame = false;
      } else {
        this.timer = setTimeout(this.countTime.bind(this), 1000);
      }
    }
  },
  stopCountTime() {
    if (this.timerRunning) {
      clearInterval(this.timer);
      cancelAnimationFrame(this.fallingOption);
      this.timerRunning = false;
      this.showQuestions(false);
    }
  },
  updateTimerDisplay(countdownTime) {
    // Calculate the minutes and seconds
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    //console.log("count", timeString);
    View.timeText.innerText = timeString;
  },
  getTranslateYValue(transformStyle) {
    const translateYRegex = /translateY\((-?\d+\.?\d*)px\)/;
    const match = transformStyle.match(translateYRegex);
    if (match && match[1]) {
      return parseFloat(match[1]);
    }
    return 0;
  },
  generateUniqueId() {
    return Math.random().toString(16).slice(2);
  },
  createRandomItem(char, optionImage) {
    if (char && char.length !== 0) {
      const columnId = this.getBalancedColumn();
      const word = char;

      const generatePosition = () => {
        const x = this.generatePositionX(columnId);
        const id = this.generateUniqueId();
        const optionWrapper = this.createOptionWrapper(word, id, optionImage, columnId);
        const newFallingItem = {
          x,
          size: this.optionSize,
          img: optionImage,
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

  getNextSordOrder() {
    if (this.selectedCount < this.numberOfColumns - 1)
      this.selectedCount += 1;
    else
      this.selectedCount = 0;

    return this.selectedCount;
  },

  getBalancedColumn() {
    /*if (this.usedColumn.length > 0) {
      let randomId = Math.floor(Math.random() * this.randomPair.length);
      let newRandomId = this.usedColumn[randomId % this.numberOfColumns];

      let indexToRemove = this.usedColumn.indexOf(newRandomId);
      this.usedColumn.splice(indexToRemove, 1);
      return newRandomId;
    }
    else {
      //let nextOrder = this.getNextSordOrder();
      let nextOrder = Math.floor(Math.random() * 4);
      return nextOrder;
    }*/

    //let randomId = Math.floor(Math.random() * this.randomPair.length);
    //let newRandomId = randomId % this.numberOfColumns;
    let newRandomId = this.getNextSordOrder();
    console.log("new randomw id", newRandomId);
    return newRandomId;
  },

  generatePositionX(columnId) {
    if (this.wholeScreenColumnSeperated) {
      const offset = 20;
      // Calculate the X position based on the columnId
      let positionX = columnId * this.columnWidth + offset; // Center the position within the column

      if (positionX + this.columnWidth / 2 > View.canvas.width - offset) {
        positionX = View.canvas.width - offset - this.columnWidth / 2;
      }
      return positionX;
    }
    else {
      const isLeft = columnId < Math.floor(this.redBoxX / this.optionSize);
      let numColumns, columnWidth;

      if (isLeft) {
        numColumns = Math.floor(this.redBoxX / this.optionSize);
        columnWidth = this.redBoxX / numColumns;
        return columnId * columnWidth + 15;
      } else {
        numColumns = Math.floor((View.canvas.width - this.redBoxX - this.redBoxWidth - 10) / this.optionSize);
        columnWidth = (View.canvas.width - this.redBoxX - this.redBoxWidth - 10) / numColumns;
        return this.redBoxX + this.redBoxWidth + (columnId - Math.floor(this.redBoxX / this.optionSize)) * columnWidth + 30;
      }
    }
  },
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  createOptionWrapper(text, id, optionImage, columnId) {
    let optionWrapper = document.createElement('div');
    optionWrapper.classList.add('optionWrapper');
    optionWrapper.style.width = `${this.optionSize}px`;
    optionWrapper.style.height = `${this.optionSize}px`;
    if (optionImage !== '' && optionImage !== 'undefined')
      optionWrapper.style.backgroundImage = `url(${optionImage.src})`;
    optionWrapper.id = id;
    optionWrapper.setAttribute('word', text);
    optionWrapper.setAttribute('column', columnId);
    let option = document.createElement('span');
    option.classList.add('option');
    //option.type = 'text';
    option.textContent = text;
    let fontSize = `calc(min(max(4vh, 20vh - ${text.length} * 5.2vh), 8vh))`;
    option.style.setProperty('--font-size', fontSize);
    optionWrapper.appendChild(option);
    return optionWrapper;
  },
  getRandomQuestions(string) {
    const randomIndex = Math.floor(Math.random() * string.length);
    return string[randomIndex];
  },
  renderFallingItem(item) {
    View.optionArea.appendChild(item.optionWrapper);
    item.optionWrapper.classList.add("show");
    item.optionWrapper.style.left = item.x + 'px';
    /*item.optionWrapper.style.setProperty('--top-height', `${0}px`);*/
    item.optionWrapper.style.setProperty('--bottom-height', `${(View.canvas.height)}px`);
    item.optionWrapper.addEventListener('animationend', () => this.animationEnd(item.optionWrapper));
  },

  animationEnd(optionWrapper) {
    this.reFallingItems.push(optionWrapper);
    console.log("re falling item", this.reFallingItems);
  },

  resetFallingItem(optionWrapper) {
    optionWrapper.classList.remove('show');
    if (this.nextQuestion || State.stateType === 'ansWrong')
      return;

    let currentColumnId = parseInt(optionWrapper.getAttribute('column'));
    if (currentColumnId < this.numberOfColumns - 1) {
      currentColumnId += 1;
    }
    else {
      currentColumnId = 0;
    }
    optionWrapper.x = this.generatePositionX(currentColumnId);
    optionWrapper.setAttribute('column', currentColumnId);

    //let delay = this.refallingDelay();
    //console.log("delay", delay, itemLength);
    setTimeout(() => {
      optionWrapper.style.left = optionWrapper.x + 'px';
      optionWrapper.style.setProperty('--bottom-height', `${View.canvas.height}px`);
      //optionWrapper.style.setProperty('--fallingSpeed', `${5 + this.randomPair.length}s`);
      optionWrapper.classList.add('show');
    }, 100);
  },

  refallingDelay() {
    let itemLength;

    if (this.finishedCreateOptions) {
      itemLength = this.fallingItems.length - 1;
    }
    else {
      itemLength = this.randomPair.length;
    }
    let delay = 0;

    if (itemLength > 1) {
      delay = itemLength * 280;
    }
    return delay;
  },

  removeFallingItem(item) {
    const index = this.fallingItems.findIndex(i => i.optionWrapper === item);
    if (index !== -1) {
      this.fallingItems.splice(index, 1);
      View.optionArea.removeChild(item);
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
  /////////////////////////////////////////Random Questions///////////////////////////////
  randQuestion() {
    if (this.questionType === null || this.questionType === undefined)
      return null;

    let questions = this.questionType.QA;
    if (this.answeredNum === 0) {
      questions = questions.sort(() => Math.random() - 0.5);
    }
    console.log("questions", questions);
    const _type = questions[this.answeredNum].type;
    const _QID = questions[this.answeredNum].QID;
    const _question = questions[this.answeredNum].question;
    const _answers = questions[this.answeredNum].answers;
    const _correctAnswer = questions[this.answeredNum].correctAnswer;
    //const _media = questions[this.answeredNum].media;

    if (this.answeredNum < questions.length - 1) {
      this.answeredNum += 1;
    }
    else {
      this.answeredNum = 0;
    }

    //console.log("answered count", this.answeredNum);
    return {
      type: _type,
      QID: _QID,
      question: _question,
      answers: _answers,
      correctAnswer: _correctAnswer,
      //media: _media,
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
    //console.log('question class', this.randomQuestion);
    switch (this.randomQuestion.type) {
      case 'Spelling':
      case 'Listening':
      case 'FillingBlank':
      case 'Reorder':
      case 'Picture':
        var array = this.generateCharArray(this.randomQuestion.correctAnswer);
        this.answerLength = array.length;
        return array;
      case 'MultipleChoice':
        this.answerLength = 1;
        return this.randomizeAnswers(this.randomQuestion.answers);
    }
  },
  setQuestions() {
    this.randomQuestion = this.randQuestion();
    console.log(this.randomQuestion);
    if (this.randomQuestion === null)
      return;

    this.question = this.randomQuestion.question;
    this.randomPair = this.randomOptions();
    this.selectedCount = Math.floor(Math.random() * this.numberOfColumns);
    this.questionWrapper = document.createElement('div');
    let questionBg = document.createElement('div');
    this.answerWrapper = document.createElement('span');

    switch (this.randomQuestion.type) {
      case 'Spelling':
      case 'MultipleChoice':
        this.questionWrapper.classList.add('questionWrapper');
        questionBg.classList.add('questionBg');
        View.stageImg.appendChild(questionBg);

        var questionText = document.createElement('span');
        questionText.textContent = this.randomQuestion.question;
        this.questionWrapper.appendChild(questionText);
        var fontSize = `calc(min(max(3vh, 6vh - ${this.randomQuestion.question.length} * 0.1vh), 6vh))`;
        this.questionWrapper.style.setProperty('--question-font-size', fontSize);
        this.answerWrapper.classList.add('textType');
        //View.stageImg.appendChild(questionText);
        break;
      case 'Listening':
        this.questionWrapper.classList.add('questionAudioWrapper');
        questionBg.classList.add('questionAudioBg');
        View.stageImg.appendChild(questionBg);
        this.buttonWrapper = document.createElement('button');
        this.buttonWrapper.classList.add('buttonWrapper');
        this.buttonWrapper.classList.add('audioPlay');
        this.buttonWrapper.addEventListener('mousedown', () => {
          this.buttonWrapper.classList.add('clicked');
          this.buttonWrapper.classList.remove('not-clicked');
          this.playWordAudio(this.randomQuestion.QID);
        });

        this.buttonWrapper.addEventListener('mouseup', () => {
          this.buttonWrapper.classList.remove('clicked');
          this.buttonWrapper.classList.add('not-clicked');
        });
        this.buttonWrapper.addEventListener('touchstart', (event) => {
          event.preventDefault(); // Prevent default touch behavior
          this.buttonWrapper.classList.add('clicked');
          this.buttonWrapper.classList.remove('not-clicked');
          this.playWordAudio(this.randomQuestion.QID);
        });

        this.buttonWrapper.addEventListener('touchend', (event) => {
          event.preventDefault(); // Prevent default touch behavior
          this.buttonWrapper.classList.remove('clicked');
          this.buttonWrapper.classList.add('not-clicked');
        });
        this.questionWrapper.appendChild(this.buttonWrapper);
        this.answerWrapper.classList.add('audioType');
        break;
      case 'FillingBlank':
      case 'Reorder':
        this.questionWrapper.classList.add('questionFillBlankWrapper');
        questionBg.classList.add('questionImgBg');
        View.stageImg.appendChild(questionBg);
        var questionText = document.createElement('span');
        questionText.textContent = this.randomQuestion.question;
        this.questionWrapper.appendChild(questionText);
        var fontSize = `calc(min(max(3vh, 6vh - ${this.randomQuestion.question.length} * 0.1vh), 6vh))`;
        this.questionWrapper.style.setProperty('--question-font-size', fontSize);

        this.buttonWrapper = document.createElement('button');
        this.buttonWrapper.classList.add('buttonWrapper');
        this.buttonWrapper.classList.add('fillBlankPlay');
        this.buttonWrapper.addEventListener('mousedown', () => {
          this.buttonWrapper.classList.add('clicked');
          this.buttonWrapper.classList.remove('not-clicked');
          this.playWordAudio(this.randomQuestion.QID);
        });

        this.buttonWrapper.addEventListener('mouseup', () => {
          this.buttonWrapper.classList.remove('clicked');
          this.buttonWrapper.classList.add('not-clicked');
        });
        this.buttonWrapper.addEventListener('touchstart', (event) => {
          event.preventDefault(); // Prevent default touch behavior
          this.buttonWrapper.classList.add('clicked');
          this.buttonWrapper.classList.remove('not-clicked');
          this.playWordAudio(this.randomQuestion.QID);
        });

        this.buttonWrapper.addEventListener('touchend', (event) => {
          event.preventDefault(); // Prevent default touch behavior
          this.buttonWrapper.classList.remove('clicked');
          this.buttonWrapper.classList.add('not-clicked');
        });
        this.questionWrapper.appendChild(this.buttonWrapper);

        this.answerWrapper.classList.add('pictureType');
        break;
      case 'Picture':
        this.questionWrapper.classList.add('questionImageWrapper');
        questionBg.classList.add('questionImgBg');
        View.stageImg.appendChild(questionBg);

        if (QuestionManager.preloadedImagesItem && QuestionManager.preloadedImagesItem.length > 0) {
          //let imageFile = imageFiles.find(([name]) => name === this.questionWord.QID);
          let currentImagePath = '';
          let imageFile = null;
          QuestionManager.preloadedImagesItem.forEach((img) => {
            if (img.id === this.randomQuestion.QID) {
              imageFile = img.src;
              //console.log("imageFile", imageFile);
            }
          });

          if (imageFile) {
            currentImagePath = imageFile;
            var imageElement = document.createElement('img');
            imageElement.src = currentImagePath;
            imageElement.alt = 'image';
            imageElement.classList.add('questionImage');
            this.questionWrapper.appendChild(imageElement);
          }
        }
        this.answerWrapper.classList.add('pictureType');
        break;
    }

    console.log("this.randomQuestion.answers", this.randomQuestion.answers);
    if (this.randomQuestion.answers === undefined) {
      let resetBtn = document.createElement('div');
      let resetTouchBtn = document.createElement('button');
      resetTouchBtn.classList.add('resetBtn');

      switch (this.randomQuestion.type) {
        case 'Spelling':
          resetTouchBtn.classList.add('resetTextType');
          break;
        case 'Listening':
          resetTouchBtn.classList.add('resetAudioType');
          break;
        case 'FillingBlank':
        case 'Reorder':
        case 'Picture':
          resetTouchBtn.classList.add('resetPictureType');
          break;
      }

      resetTouchBtn.addEventListener('mousedown', () => {
        resetTouchBtn.classList.add('active');
        if (State.isSoundOn) {
          Sound.stopAll(['bgm', 'lastTen']);
          Sound.play('btnClick');
        }
        this.backSpaceWord();
      });

      resetTouchBtn.addEventListener('mouseup', () => {
        resetTouchBtn.classList.remove('active');
      });
      resetTouchBtn.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent default touch behavior
        resetTouchBtn.classList.add('active');
        if (State.isSoundOn) {
          Sound.stopAll(['bgm', 'lastTen']);
          Sound.play('btnClick');
        }
        this.backSpaceWord();
      });

      resetTouchBtn.addEventListener('touchend', (event) => {
        event.preventDefault(); // Prevent default touch behavior
        resetTouchBtn.classList.remove('active');
      });

      resetBtn.appendChild(resetTouchBtn)
      View.stageImg.appendChild(resetBtn);
    }

    if (this.randomQuestion.QID && this.randomQuestion.QID.trim() !== '') {
      this.playWordAudio(this.randomQuestion.QID);
      console.log('audio', this.randomQuestion.QID);
    }

    this.answerWrapper.classList.add('answerWrapper');
    View.stageImg.appendChild(this.questionWrapper);
    View.stageImg.appendChild(this.answerWrapper);
    View.stageImg.classList.add('fadeIn');
    View.stageImg.style.opacity = 1;
  },

  motionTriggerPlayAudio(_play) {
    if (_play) {
      this.buttonWrapper.classList.add('clicked');
      this.buttonWrapper.classList.remove('not-clicked');
      this.playWordAudio(this.randomQuestion.QID);
    }
    else {
      this.buttonWrapper.classList.add('not-clicked');
      this.buttonWrapper.classList.remove('clicked');
    }
  },

  playWordAudio(QID) {
    // Add your button click event handler logic here
    if (State.isSoundOn) {
      Sound.stopAll(['bgm', 'lastTen']);
      Sound.play(QID);
    }
  },

  showQuestions(status) {
    View.stageImg.style.opacity = status ? '1' : '0';
    View.optionArea.style.opacity = status ? '1' : '0';
    if (!status) {
      this.finishedCreateOptions = false;
      this.fallingItems.splice(0);
      this.reFallingItems.splice(0);
      View.optionArea.innerHTML = '';
      this.fallingId = 0;
      console.log("::::::::::::::::::::::::::::", this.typedItems);
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

        if (this.questionType.type === "MultipleChoice") {
          if (View.optionArea.contains(option)) {
            this.resetFallingItem(option);
          }
        }
        else {
          option.classList.remove('show');
          console.log("deduct:", option);
          this.typedItems.push(option);
        }

        this.fillwordTime += 1;
        if (State.isSoundOn) {
          Sound.stopAll(['bgm', 'lastTen']);
          Sound.play('btnClick');
        }
        if (this.fillwordTime == this.answerLength) {
          setTimeout(() => {
            this.checkAnswer(this.answerWrapper.textContent);
          }, 300);
        }
      }
    }
  },
  resetFillWord() {
    this.randomPair = this.randomOptions();
    this.clearWrapper();
  },
  backSpaceWord() {
    let answerText = this.answerWrapper.textContent;
    if (!this.isTriggeredBackSpace && answerText.length > 0) {
      this.isTriggeredBackSpace = true;
      this.answerWrapper.textContent = answerText.slice(0, -1);
      this.fillwordTime = answerText.length - 1;

      let delay = 1000;
      let lastOption = null;
      if (this.typedItems.length > 0) {
        lastOption = this.typedItems[this.typedItems.length - 1];
        console.log('lastOption', lastOption);

        if (lastOption && !lastOption.classList.contains('show')) {
          this.reFallingItems.push(lastOption);
        }
        this.typedItems.pop();
      }

      //let hiddenedOption = this.fallingItems.filter(item => item.optionWrapper.getAttribute('word') === lastChar);
      setTimeout(() => {
        //console.log("this.typedItems", this.typedItems);
        this.isTriggeredBackSpace = false;
      }, delay);
    }
  },
  clearWrapper() {
    this.fallingId = 0;
    this.leftCount = 0;
    this.rightCount = 0;
    this.answerWrapper.classList.remove('correct');
    this.answerWrapper.classList.remove('wrong');
    this.answerWrapper.textContent = '';
    this.fillwordTime = 0;
    this.fallingItems.splice(0);
    View.optionArea.innerHTML = '';
    this.typedItems.splice(0);
    this.selectedCount = 0;
    this.finishedCreateOptions = false;
    this.reFallingItems.splice(0);
    this.refallingId = 0;
  },
  checkAnswer(answer) {
    if (answer === this.randomQuestion.correctAnswer) {
      //答岩1分，答錯唔扣分
      this.addScore(this.eachQAMark);
      this.answerWrapper.classList.add('correct');
      State.changeState('playing', 'ansCorrect');
      View.showCorrectEffect(true);
    } else {
      //this.addScore(-1);
      this.answerWrapper.classList.add('wrong');
      State.changeState('playing', 'ansWrong');
    }
  },
  moveToNextQuestion() {
    this.randomQuestion = null;
    this.randomPair.splice(0);
    View.stageImg.innerHTML = '';
    setTimeout(() => {
      this.nextQuestion = true;
      this.clearWrapper();
    }, 500);
  }
}
