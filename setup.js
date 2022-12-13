function createDirections() {
  return {
    R: createVector(1, 0),
    L: createVector(-1, 0),
    U: createVector(0, -1),
    D: createVector(0, 1),
  };
}

function createPointColors() {
  return [
    [255, 255, 255],
    [215, 215, 215],
    [204, 204, 204],
    [174, 174, 174],
    [143, 143, 143],
    [123, 123, 123],
    [103, 103, 103],
    [92, 92, 92],
    [62, 62, 62],
    [31, 31, 31],
  ];
}

function resetRope() {
    next_point = 0;
    for (let i = 1; i < 10; i++) {
      R[i] = [createVector(0, 0)];
    }
    history = [];
  
    for (let i = 0; i < ropeLen; i++) {
      history.push(new Set());
    }
  }
