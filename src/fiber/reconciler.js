

import { createFRoot } from './f-node';
import { scheduleWork } from './scheduler';
import { createRootRender } from './root-render';

export function createContainer(container) {
  return createFRoot(container);
}

export function updateContainer(el, FRoot) {
  const current = FRoot.current;
  return scheduleRootUpdate(current, el);
}

function scheduleRootUpdate(current, el) {
  const rootRender = createRootRender(el);
  current.rootRender = rootRender;

  scheduleWork(current);
}
