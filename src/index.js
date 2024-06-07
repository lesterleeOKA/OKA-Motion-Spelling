import * as posedetection from '@tensorflow-models/pose-detection';
//import * as bodySegmentation from '@tensorflow-models/body-segmentation';
//import * as mpSelfieSegmentation from '@mediapipe/selfie_segmentation';
import Camera from './camera';
import { RendererCanvas2d } from './renderer';
import Util from './util';
import View from './view';
import State from './state';
import Sound from './sound';
import { setupStats } from './stats_panel';
import { loadLevel } from './level';
import { audioFiles } from './mediaFile';

let detector
//let segmenter
let rafId;
let stats;
let startInferenceTime, numInferences = 0;
let inferenceTimeSum = 0, lastPanelUpdate = 0;
//const canvas = document.createElement('canvas');
//const ctx = canvas.getContext('2d');

async function createDetector() {
  const runtime = 'mediapipe';
  return posedetection.createDetector(posedetection.SupportedModels.BlazePose, {
    runtime,
    modelType: 'lite',
    solutionPath: `@mediapipe/pose@0.5.1675469404`,
    //solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}`
  });
}

/*async function createSegmentationModel() {
  const runtime = 'mediapipe';
  return bodySegmentation.createSegmenter(bodySegmentation.SupportedModels.MediaPipeSelfieSegmentation, {
    runtime,
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@${mpSelfieSegmentation.VERSION}`,
  });
}*/

/*async function createDetector() {
  let modelType = posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING;
  const modelConfig = { modelType };
  return await posedetection.createDetector(posedetection.SupportedModels.MoveNet, modelConfig);
}
*/
/*async function createDetector() {
  const modelConfig = {
    quantBytes: 4,
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: 250, height: 250 },
    multiplier: 0.75
  };
  return await posedetection.createDetector(posedetection.SupportedModels.PoseNet, modelConfig);
}*/


async function checkGuiUpdate() {
  window.cancelAnimationFrame(rafId);

  if (detector != null) {
    detector.dispose();
  }

  /* if (segmenter != null) {
     segmenter.dispose();
   }*/

  try {
    detector = await createDetector();
    //segmenter = await createSegmentationModel();
  } catch (error) {
    detector = null;
    // segmenter = null;
    alert(error);
  }

}

async function renderResult() {
  if (Camera.video.readyState < 2) {
    await new Promise((resolve) => {
      Camera.video.onloadeddata = () => {
        resolve(video);
      };
    });
  }

  let poses = null;
  // let segmentation = null;

  // Detector can be null if initialization failed (for example when loading
  // from a URL that does not exist).
  if (detector != null) {
    beginEstimatePosesStats();
    try {
      poses = await detector.estimatePoses(Camera.video, { maxPoses: 1, flipHorizontal: false });

      /*if (segmenter === null) return;

      if (segmenter.segmentPeople != null) {
        segmentation = await segmenter.segmentPeople(Camera.video, {
          flipHorizontal: false,
          multiSegmentation: false,
          segmentBodyParts: true,
          segmentationThreshold: 40,
        });
      } else {
        segmentation = await segmenter.estimatePoses(
          Camera.video, { flipHorizontal: false });
        segmentation = segmentation.map(
          singleSegmentation => singleSegmentation.segmentation);
      }*/
      //console.log(poses[0]);
    } catch (error) {
      detector.dispose();
      detector = null;
      //segmenter.dispose();
      //segmenter = null;
      alert(error);
    }

    endEstimatePosesStats();
  }

  View.renderer.draw([Camera.video, poses, false]);

}

function beginEstimatePosesStats() {
  startInferenceTime = (performance || Date).now();
}

function endEstimatePosesStats() {
  const endInferenceTime = (performance || Date).now();
  inferenceTimeSum += endInferenceTime - startInferenceTime;
  ++numInferences;

  const panelUpdateMilliseconds = 1000;
  if (endInferenceTime - lastPanelUpdate >= panelUpdateMilliseconds) {
    const averageInferenceTime = inferenceTimeSum / numInferences;
    inferenceTimeSum = 0;
    numInferences = 0;
    stats.customFpsPanel.update(
      1000.0 / averageInferenceTime, 120 /* maxValue */);
    lastPanelUpdate = endInferenceTime;
  }
}

async function renderPrediction() {
  if (!detector) await checkGuiUpdate();

  await renderResult();

  rafId = requestAnimationFrame(renderPrediction);
};

function init() {
  console.log('in init()');
  Sound.init();
  //因應iPad及手機browser的nav bar會扣掉高度，在這裡將hv用innerHiehgt重新計算
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  //const clickHandler = ('ontouchstart' in document.documentElement) ? 'touchend' : 'click';
  const clickHandler = 'click';
  // Button event handling function
  function handleButtonClick(e) {
    if (State.isSoundOn) Sound.play('btnClick');
    switch (e.currentTarget) {
      case View.startBtn:
        State.changeState('prepare');
        break;
      case View.exitBtn:
        State.gamePauseData.state = State.state;
        State.gamePauseData.stateType = State.stateType;
        State.changeState('pause');
        break;
      case View.musicBtn:
        toggleSound();
        break;
      case View.backHomeBtnOfFinished:
        State.state = '';
        State.changeState('instruction');
        break;
      case View.playAgainBtn:
        State.state = '';
        if (State.isSoundOn) {
          Sound.play('btnClick');
          Sound.play('bgm', true);
        }
        State.changeState('prepare');
        break;
      case View.backHomeBtnOfExit:
        View.hideExit();
        State.state = '';
        State.changeState('instruction');
        break;
      case View.continuebtn:
        View.hideExit();
        State.changeState(State.gamePauseData.state, State.gamePauseData.stateType);
        break;
    }
  }

  // Attach the click/touchend event listeners to the buttons
  View.startBtn.addEventListener(clickHandler, handleButtonClick);
  View.exitBtn.addEventListener(clickHandler, handleButtonClick);
  View.musicBtn.addEventListener(clickHandler, handleButtonClick);
  View.backHomeBtnOfFinished.addEventListener(clickHandler, handleButtonClick);
  View.playAgainBtn.addEventListener(clickHandler, handleButtonClick);
  View.backHomeBtnOfExit.addEventListener(clickHandler, handleButtonClick);
  View.continuebtn.addEventListener(clickHandler, handleButtonClick);


  const levelKey = loadLevel();
  const defaultAudios = [
    ['bgm', require('./audio/bgm.mp3'), false, 0.5],
    ['btnClick', require('./audio/btnClick.wav')],
    ['countDown', require('./audio/countDown.wav')],
    ['instruction', require('./audio/instruction.mp3')],
    ['prepare', require('./audio/prepare.mp3')],
    ['start', require('./audio/start.mp3')],
    ['finished', require('./audio/finished.mp3')],
    ['outBox', require('./audio/outBox.mp3')],
    ['poseValid', require('./audio/poseValid.mp3')],
    ['ansCorrect', require('./audio/ansCorrect.mp3')],
    ['ansWrong', require('./audio/ansWrong.mp3')],
  ];

  const additionalAudios = audioFiles;
  const filteredAdditionalAudios = levelKey === ''
    ? additionalAudios
    : additionalAudios.filter(([key]) => levelKey && key.includes(levelKey));

  console.log("audio", filteredAdditionalAudios);
  const audiosToPreload = [...defaultAudios, ...filteredAdditionalAudios];
  return Promise.all([
    Sound.preloadAudios(audiosToPreload),
    Camera.getVideo()
  ]);
}


async function app() {
  //console.log('in app()');
  if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
  }

  init().then(() => {
    Util.loadingStart();
    setTimeout(() => {
      stats = setupStats();
      Camera.setup();
      //(new FPSMeter({ ui: true })).start();
      createDetector().then((detector) => {

        //console.log(detector);
        //const canvas = document.getElementById('output');
        View.renderer = new RendererCanvas2d(View.canvas);

        renderPrediction().then(() => {
          Util.loadingComplete().then(() => {
            State.changeState('instruction');
          });
        })
      });
    }, 2000);
  });

  /* init().then(() => {
     Util.loadingStart();
     setTimeout(async () => {
       (new FPSMeter({ ui: true })).start();
       await Camera.setup();
       await tf.setBackend('wasm');
       await tf.ready();

       await createDetector().then((detector) => {
         console.log(detector);
         //var poses = detector.estimatePoses(Camera.video);
         //console.log(poses[0]);
         //const canvas = document.getElementById('output');
         //View.renderer = new RendererCanvas2d(View.canvas);

         renderPrediction().then(() => {
           Util.loadingComplete().then(() => {
             State.changeState('instruction');
           });
         })
       });
       //const poses = await detector.estimatePoses(Camera.video);
       //console.log(poses[0]);
       //const canvas = document.getElementById('output');
       View.renderer = new RendererCanvas2d(View.canvas);

       await renderPrediction(detector);

       Util.loadingComplete().then(() => {
         State.changeState('instruction');
       });
     }, 2000);
   });*/
};

//-------------------------------------------------------------------------------------------------
function toggleSound() {
  State.isSoundOn = !State.isSoundOn;
  //console.log('State.isSoundOn: ' + State.isSoundOn);
  if (State.isSoundOn) {
    View.musicBtn.classList.add('on');
    View.musicBtn.classList.remove('off');
    Sound.play('bgm', true);
  } else {
    View.musicBtn.classList.remove('on');
    View.musicBtn.classList.add('off');
    Sound.stopAll();
  }
}
//-------------------------------------------------------------------------------------------------
app();
//-------------------------------------------------------------------------------------------------
