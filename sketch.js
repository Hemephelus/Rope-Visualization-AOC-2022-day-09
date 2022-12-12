let moves, pointColor;
let origin, headPath, tailPath;
let history = [];
let next_point = 0;
let pointSize = 10;
let ropeLen = 10;

function preload() {
  moves = loadStrings("input.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let directions = {
    R: createVector(1, 0),
    L: createVector(-1, 0),
    U: createVector(0, -1),
    D: createVector(0, 1),
  };
  tailPath = [createVector(0, 0)];
  headPath = createRopePath(moves, directions);
  pointColor = [
    [255, 255, 255],
    [215, 215, 215],
    [204, 204, 204],
    [174, 174, 174],
    [143, 143, 143],
    [123, 123, 123],
    [103, 103, 103],
    [92, 92, 92],
    [62, 62, 62],
    [31, 0, 31],
  ];
  R = [headPath];
  for (let i = 1; i < ropeLen; i++) {
    R[i] = [createVector(0, 0)];
  }

  for (let i = 0; i < ropeLen; i++) {
    history.push([]);
  }
  // frameRate(5);
}

function draw() {
  background(33, 34, 39);
  translate(width / 2, height / 2);
  
  for (let i = 0; i < history.length; i++) {
    for (let j = 0; j < history[i].length; j++) {
      if( i === 9){
        
        strokeWeight(pointSize / 2);
        stroke(...pointColor[i]);
        point(history[i][j].x, history[i][j].y);
      }
    }
  }
  
  strokeWeight(pointSize);
  stroke(...pointColor[0]);
  xDrawPoint = headPath[next_point].x * pointSize;
  yDrawPoint = headPath[next_point].y * pointSize;
  point(xDrawPoint, yDrawPoint);
  history[0].push(createVector(xDrawPoint, yDrawPoint));

  let head = R[0][next_point];
  let tail = R[1][R[1].length - 1];

  R[1][R[1].length - 1] = evaluateTail(head, tail);
  xDrawPointTail = R[1][R[1].length - 1].x * pointSize;
  yDrawPointTail = R[1][R[1].length - 1].y * pointSize;
  stroke(...pointColor[1]);
  point(xDrawPointTail, yDrawPointTail);
  history[1].push(createVector(xDrawPointTail, yDrawPointTail));

  for (let i = 1; i < R.length - 1; i++) {
    H = R[i][R[i].length - 1];
    T = R[i + 1][R[i + 1].length - 1];

    evaluateTail(H, T);

    R[i + 1][R[i + 1].length - 1] = evaluateTail(H, T);

    xDrawPointTail = R[i + 1][R[i + 1].length - 1].x * pointSize;
    yDrawPointTail = R[i + 1][R[i + 1].length - 1].y * pointSize;

    stroke(...pointColor[i+1]);
    point(xDrawPointTail, yDrawPointTail);
    history[i + 1].push(createVector(xDrawPointTail, yDrawPointTail));
  }

  next_point++;
  strokeWeight(pointSize);
  stroke(134, 0, 0);
  point(0, 0);
  if (headPath.length === next_point) {
    next_point = 0;
    for (let i = 1; i < 10; i++) {
      R[i] = [createVector(0, 0)];
    }
    history = [];

    for (let i = 0; i < ropeLen; i++) {
      history.push([]);
    }
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

/**
 * 
 *

R = [[0, 0] for _ in range(2)]

for line in open(0):
    x, y = line.split()
    y = int(y)

    for _ in range(y):
        dx = 1 if x == "R" else -1 if x == "L" else 0
        dy = 1 if x == "U" else -1 if x == "D" else 0

        R[0][0] += dx
        R[0][1] += dy

        for i in range(9):
            H = R[i]
            T = R[i + 1]

            _x = H[0] - T[0]
            _y = H[1] - T[1]

            if abs(_x) > 1 or abs(_y) > 1:
                if _x == 0:
                    T[1] += _y // 2
                elif _y == 0:
                    T[0] += _x // 2
                else:
                    T[0] += 1 if _x > 0 else -1
                    T[1] += 1 if _y > 0 else -1

 * 
 */
