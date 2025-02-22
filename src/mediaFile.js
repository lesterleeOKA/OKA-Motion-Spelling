const audioFiles = [
  /////////////////////p1u3//////////////////////////
  ['p1u3-a2', require('./audio/p1/u3/p1u3-a2.mp3')],
  ['p1u3-a3', require('./audio/p1/u3/p1u3-a3.mp3')],
  ['p1u3-a4', require('./audio/p1/u3/p1u3-a4.mp3')],
  ['p1u3-a5', require('./audio/p1/u3/p1u3-a5.mp3')],
  ['p1u3-a6', require('./audio/p1/u3/p1u3-a6.mp3')],
  ['p1u3-a7', require('./audio/p1/u3/p1u3-a7.mp3')],
  ['p1u3-a8', require('./audio/p1/u3/p1u3-a8.mp3')],
  ['p1u3-a9', require('./audio/p1/u3/p1u3-a9.mp3')],
  ['p1u3-a10', require('./audio/p1/u3/p1u3-a10.mp3')],
  /////////////////////p2u2-d//////////////////////////
  ['p2u2-d1', require('./audio/p2/u2/p2u2-d1.mp3')],
  ['p2u2-d2', require('./audio/p2/u2/p2u2-d2.mp3')],
  ['p2u2-d3', require('./audio/p2/u2/p2u2-d3.mp3')],
  ['p2u2-d4', require('./audio/p2/u2/p2u2-d4.mp3')],
  ['p2u2-d5', require('./audio/p2/u2/p2u2-d5.mp3')],
  ['p2u2-d6', require('./audio/p2/u2/p2u2-d6.mp3')],
  ['p2u2-d7', require('./audio/p2/u2/p2u2-d7.mp3')],
  ['p2u2-d8', require('./audio/p2/u2/p2u2-d8.mp3')],
  ['p2u2-d9', require('./audio/p2/u2/p2u2-d9.mp3')],
  ['p2u2-d10', require('./audio/p2/u2/p2u2-d10.mp3')],
  ['p2u2-d11', require('./audio/p2/u2/p2u2-d11.mp3')],
  ['p2u2-d12', require('./audio/p2/u2/p2u2-d12.mp3')],
  ['p2u2-d13', require('./audio/p2/u2/p2u2-d13.mp3')],
  ['p2u2-d14', require('./audio/p2/u2/p2u2-d14.mp3')],
  ['p2u2-d15', require('./audio/p2/u2/p2u2-d15.mp3')],
  ['p2u2-d16', require('./audio/p2/u2/p2u2-d16.mp3')],
  ['p2u2-d17', require('./audio/p2/u2/p2u2-d17.mp3')],
  ['p2u2-d18', require('./audio/p2/u2/p2u2-d18.mp3')],
  ['p2u2-d19', require('./audio/p2/u2/p2u2-d19.mp3')],
  ['p2u2-d20', require('./audio/p2/u2/p2u2-d20.mp3')],
  /////////////////////p2u3-c//////////////////////////
  ['p2u3-c1', require('./audio/p2/u3/p2u3-c1.mp3')],
  ['p2u3-c2', require('./audio/p2/u3/p2u3-c2.mp3')],
  ['p2u3-c3', require('./audio/p2/u3/p2u3-c3.mp3')],
  ['p2u3-c4', require('./audio/p2/u3/p2u3-c4.mp3')],
  ['p2u3-c5', require('./audio/p2/u3/p2u3-c5.mp3')],
  ['p2u3-c6', require('./audio/p2/u3/p2u3-c6.mp3')],
  ['p2u3-c7', require('./audio/p2/u3/p2u3-c7.mp3')],
  ['p2u3-c8', require('./audio/p2/u3/p2u3-c8.mp3')],
  ['p2u3-c9', require('./audio/p2/u3/p2u3-c9.mp3')],
  ['p2u3-c10', require('./audio/p2/u3/p2u3-c10.mp3')],
  ['p2u3-c11', require('./audio/p2/u3/p2u3-c11.mp3')],
  ['p2u3-c12', require('./audio/p2/u3/p2u3-c12.mp3')],
  ['p2u3-c13', require('./audio/p2/u3/p2u3-c13.mp3')],
  ['p2u3-c14', require('./audio/p2/u3/p2u3-c14.mp3')],
  ['p2u3-c15', require('./audio/p2/u3/p2u3-c15.mp3')],
  ['p2u3-c16', require('./audio/p2/u3/p2u3-c16.mp3')],
  ['p2u3-c17', require('./audio/p2/u3/p2u3-c17.mp3')],
  ['p2u3-c18', require('./audio/p2/u3/p2u3-c18.mp3')],
  ['p2u3-c19', require('./audio/p2/u3/p2u3-c19.mp3')],
  ['p2u3-c20', require('./audio/p2/u3/p2u3-c20.mp3')],
  /////////////////////p3u2-c//////////////////////////
  ['p3u2-c1', require('./audio/p3/u2/p3u2-c1.mp3')],
  ['p3u2-c2', require('./audio/p3/u2/p3u2-c2.mp3')],
  ['p3u2-c3', require('./audio/p3/u2/p3u2-c3.mp3')],
  ['p3u2-c4', require('./audio/p3/u2/p3u2-c4.mp3')],
  ['p3u2-c5', require('./audio/p3/u2/p3u2-c5.mp3')],
  ['p3u2-c6', require('./audio/p3/u2/p3u2-c6.mp3')],
  ['p3u2-c7', require('./audio/p3/u2/p3u2-c7.mp3')],
  ['p3u2-c8', require('./audio/p3/u2/p3u2-c8.mp3')],
  ['p3u2-c9', require('./audio/p3/u2/p3u2-c9.mp3')],
  ['p3u2-c10', require('./audio/p3/u2/p3u2-c10.mp3')],
  ['p3u2-c11', require('./audio/p3/u2/p3u2-c11.mp3')],
  ['p3u2-c12', require('./audio/p3/u2/p3u2-c12.mp3')],
  ['p3u2-c13', require('./audio/p3/u2/p3u2-c13.mp3')],
  ['p3u2-c14', require('./audio/p3/u2/p3u2-c14.mp3')],
  ['p3u2-c15', require('./audio/p3/u2/p3u2-c15.mp3')],
  ['p3u2-c16', require('./audio/p3/u2/p3u2-c16.mp3')],
  ['p3u2-c17', require('./audio/p3/u2/p3u2-c17.mp3')],
  ['p3u2-c18', require('./audio/p3/u2/p3u2-c18.mp3')],
  ['p3u2-c19', require('./audio/p3/u2/p3u2-c19.mp3')],
  ['p3u2-c20', require('./audio/p3/u2/p3u2-c20.mp3')],
  /////////////////////p3u5-c//////////////////////////
  ['p3u5-c1', require('./audio/p3/u5/p3u5-c1.mp3')],
  ['p3u5-c2', require('./audio/p3/u5/p3u5-c2.mp3')],
  ['p3u5-c3', require('./audio/p3/u5/p3u5-c3.mp3')],
  ['p3u5-c4', require('./audio/p3/u5/p3u5-c4.mp3')],
  ['p3u5-c5', require('./audio/p3/u5/p3u5-c5.mp3')],
  ['p3u5-c6', require('./audio/p3/u5/p3u5-c6.mp3')],
  ['p3u5-c7', require('./audio/p3/u5/p3u5-c7.mp3')],
  ['p3u5-c8', require('./audio/p3/u5/p3u5-c8.mp3')],
  ['p3u5-c9', require('./audio/p3/u5/p3u5-c9.mp3')],
  ['p3u5-c10', require('./audio/p3/u5/p3u5-c10.mp3')],
  ['p3u5-c11', require('./audio/p3/u5/p3u5-c11.mp3')],
  ['p3u5-c12', require('./audio/p3/u5/p3u5-c12.mp3')],
  ['p3u5-c13', require('./audio/p3/u5/p3u5-c13.mp3')],
  ['p3u5-c14', require('./audio/p3/u5/p3u5-c14.mp3')],
  ['p3u5-c15', require('./audio/p3/u5/p3u5-c15.mp3')],
  ['p3u5-c16', require('./audio/p3/u5/p3u5-c16.mp3')],
  ['p3u5-c17', require('./audio/p3/u5/p3u5-c17.mp3')],
  ['p3u5-c18', require('./audio/p3/u5/p3u5-c18.mp3')],
  ['p3u5-c19', require('./audio/p3/u5/p3u5-c19.mp3')],
  ['p3u5-c20', require('./audio/p3/u5/p3u5-c20.mp3')],
];


const imageFiles = [
  /////////////////////p2u6-c//////////////////////////
  ['p2u6-c1', require('./images/p2/u6/p2u6-c1.jpg')],
  ['p2u6-c2', require('./images/p2/u6/p2u6-c2.jpg')],
  ['p2u6-c3', require('./images/p2/u6/p2u6-c3.jpg')],
  ['p2u6-c4', require('./images/p2/u6/p2u6-c4.jpg')],
  ['p2u6-c5', require('./images/p2/u6/p2u6-c5.jpg')],
  ['p2u6-c6', require('./images/p2/u6/p2u6-c6.jpg')],
  ['p2u6-c7', require('./images/p2/u6/p2u6-c7.jpg')],
  ['p2u6-c8', require('./images/p2/u6/p2u6-c8.jpg')],
  ['p2u6-c9', require('./images/p2/u6/p2u6-c9.jpg')],
  ['p2u6-c10', require('./images/p2/u6/p2u6-c10.jpg')],
  ['p2u6-c11', require('./images/p2/u6/p2u6-c11.jpg')],
  ['p2u6-c12', require('./images/p2/u6/p2u6-c12.jpg')],
  ['p2u6-c13', require('./images/p2/u6/p2u6-c13.jpg')],
  ['p2u6-c14', require('./images/p2/u6/p2u6-c14.jpg')],
  ['p2u6-c15', require('./images/p2/u6/p2u6-c15.jpg')],
  ['p2u6-c16', require('./images/p2/u6/p2u6-c16.jpg')],
  ['p2u6-c17', require('./images/p2/u6/p2u6-c17.jpg')],
  ['p2u6-c18', require('./images/p2/u6/p2u6-c18.jpg')],
  ['p2u6-c19', require('./images/p2/u6/p2u6-c19.jpg')],
  ['p2u6-c20', require('./images/p2/u6/p2u6-c20.jpg')],
  /////////////////////p5u3-c//////////////////////////
  ['p5u3-c1', require('./images/p5/u3/p5u3-c1.jpg')],
  ['p5u3-c2', require('./images/p5/u3/p5u3-c2.jpg')],
  ['p5u3-c3', require('./images/p5/u3/p5u3-c3.jpg')],
  ['p5u3-c4', require('./images/p5/u3/p5u3-c4.jpg')],
  ['p5u3-c5', require('./images/p5/u3/p5u3-c5.jpg')],
  ['p5u3-c6', require('./images/p5/u3/p5u3-c6.jpg')],
  ['p5u3-c7', require('./images/p5/u3/p5u3-c7.jpg')],
  ['p5u3-c8', require('./images/p5/u3/p5u3-c8.jpg')],
  ['p5u3-c9', require('./images/p5/u3/p5u3-c9.jpg')],
  ['p5u3-c10', require('./images/p5/u3/p5u3-c10.jpg')],
  ['p5u3-c11', require('./images/p5/u3/p5u3-c11.jpg')],
  ['p5u3-c12', require('./images/p5/u3/p5u3-c12.jpg')],
  ['p5u3-c13', require('./images/p5/u3/p5u3-c13.jpg')],
  ['p5u3-c14', require('./images/p5/u3/p5u3-c14.jpg')],
  ['p5u3-c15', require('./images/p5/u3/p5u3-c15.jpg')],
  ['p5u3-c16', require('./images/p5/u3/p5u3-c16.jpg')],
  ['p5u3-c17', require('./images/p5/u3/p5u3-c17.jpg')],
  ['p5u3-c18', require('./images/p5/u3/p5u3-c18.jpg')],
  ['p5u3-c19', require('./images/p5/u3/p5u3-c19.jpg')],
  ['p5u3-c20', require('./images/p5/u3/p5u3-c20.jpg')],
];

export { audioFiles, imageFiles };
