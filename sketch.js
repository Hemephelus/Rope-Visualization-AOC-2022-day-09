let moves, pointColor;
let origin, headPath;
let history = [];
let next_point = 0;
let pointSize = 10;
let ropeLen = 10;
let a = 0;
let b = 0;

function preload() {
  moves = loadStrings("input.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(4);

  let directions = createDirections();
  headPath = createRopePath(moves, directions);
  R = [headPath];

  resetRope();
  pointColor = createPointColors();
}

function draw() {
  background(33, 0, 39);
  a = headPath[next_point].x * pointSize;
  b = headPath[next_point].y * pointSize;
  translate(width / 2 - a, height / 2 - b);
  console.log(a, b);

  for (let i = 0; i < history.length; i++) {
    for (const hist of history[i].values()) {
      strokeWeight(pointSize / 2);
      stroke(...pointColor[i]);
      point(hist.x, hist.y);
    }
  }

  strokeWeight(pointSize);
  stroke(...pointColor[0]);
  xDrawPoint = headPath[next_point].x * pointSize;
  yDrawPoint = headPath[next_point].y * pointSize;
  point(xDrawPoint, yDrawPoint);
  history[0].add(createVector(xDrawPoint, yDrawPoint));

  let head = R[0][next_point];
  let tail = R[1][R[1].length - 1];

  R[1][R[1].length - 1] = evaluateTail(head, tail);
  xDrawPointTail = R[1][R[1].length - 1].x * pointSize;
  yDrawPointTail = R[1][R[1].length - 1].y * pointSize;
  stroke(...pointColor[1]);
  point(xDrawPointTail, yDrawPointTail);
  history[1].add(createVector(xDrawPointTail, yDrawPointTail));

  for (let i = 1; i < R.length - 1; i++) {
    H = R[i][R[i].length - 1];
    T = R[i + 1][R[i + 1].length - 1];

    evaluateTail(H, T);

    R[i + 1][R[i + 1].length - 1] = evaluateTail(H, T);

    xDrawPointTail = R[i + 1][R[i + 1].length - 1].x * pointSize;
    yDrawPointTail = R[i + 1][R[i + 1].length - 1].y * pointSize;

    stroke(...pointColor[i + 1]);
    point(xDrawPointTail, yDrawPointTail);
    history[i + 1].add(createVector(xDrawPointTail, yDrawPointTail));
  }

  next_point++;
  strokeWeight(pointSize);
  stroke(134, 0, 0);
  point(0, 0);

  if (headPath.length === next_point) {
    resetRope();
  }
}

function createRopePath(moves, directions) {
  headPath = [createVector(0, 0)];
  moves.forEach((move) => {
    let [direction, value] = move.split(" ");
    value = int(value);

    for (let i = 0; i < value; i++) {
      let x = headPath[headPath.length - 1].x + directions[direction].x;
      let y = headPath[headPath.length - 1].y + directions[direction].y;
      headPath.push(createVector(x, y));
    }
  });
  return headPath;
}

function evaluateTail(H, T) {
  _x = H.x - T.x;
  _y = H.y - T.y;

  if (abs(_x) > 1 || abs(_y) > 1) {
    if (_x == 0) {
      T.y += floor(_y / 2);
    } else if (_y == 0) {
      T.x += floor(_x / 2);
    } else {
      if (_x > 0) {
        T.x += 1;
      } else {
        T.x += -1;
      }

      if (_y > 0) {
        T.y += 1;
      } else {
        T.y += -1;
      }
    }
  }

  return T;
}
