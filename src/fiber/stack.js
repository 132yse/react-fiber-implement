
const valueStack = [];

let fiberStack;

let index = -1;

function createCursor(defaultValue){
  return {
    current: defaultValue,
  };
}

function isEmpty() {
  return index === -1;
}

function pop(cursor, fiber) {
  if (index < 0) {
    return;
  }

  cursor.current = valueStack[index];
  valueStack[index] = null;
  // fiberStack[index] = null;
  index--;
}

function push(cursor, value, fiber) {
  index++;

  valueStack[index] = cursor.current;
  // fiberStack[index] = fiber;

  cursor.current = value;
}

export {
  createCursor,
  isEmpty,
  pop,
  push,
};
