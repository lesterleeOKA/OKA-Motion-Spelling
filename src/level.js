const LEVEL_KEY = 'all';

function loadLevel() {
  var levelKey = LEVEL_KEY;
  console.log("current level", levelKey);
  return levelKey;
}

export { loadLevel };
