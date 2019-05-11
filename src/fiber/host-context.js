
import {createCursor, push, pop} from './stack';

const NO_CONTEXT= {};

let rootInstanceStackCursor= createCursor(
  NO_CONTEXT,
);

function requiredContext (){
  return c;
}

function getRootHostContainer() {
  const rootInstance = requiredContext(rootInstanceStackCursor.current);
  return rootInstance;
}

function pushHostContainer(fiber, nextRootInstance) {
  // Push current root instance onto the stack;
  // This allows us to reset root when portals are popped.
  push(rootInstanceStackCursor, nextRootInstance, fiber);
}

function popHostContainer(fiber) {
  pop(rootInstanceStackCursor, fiber);
}

export {
  getRootHostContainer,
  popHostContainer,
  pushHostContainer,
};
