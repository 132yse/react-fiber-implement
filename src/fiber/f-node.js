import * as Status from '../shared/status-work'
import { isString, isFunction } from '../shared/validate'
import { LinkedList } from '../structures/linked-list'

function FNode (tag, props, key) {
  this.tag = tag
  this.key = key
  this.elementType = null
  this.type = null

  this.instanceNode = null
  this.return = null
  this.child = null
  this.sibling = null
  this.index = 0

  this.props = props
  this.prevProps = null
  this.prevState = null

  this.effectTag = 0
  this.nextEffect = null
  this.firstEffect = null
  this.lastEffect = null
  this.linkedList = new LinkedList()
  this.next = null

  this.rootRender = null

  this.alternate = null

  this.status = Status.Working

  this.lifeCycle = null
}

export function createFNode (tag, props, key) {
  return new FNode(tag, props, key)
}

export function createFRoot (container) {
  const current = new FNode(Tag.Root, null, null)
  const root = {
    current: current,
    containerInfo: container
  }
  current.instanceNode = root
  return root
}

/**
 * @param {FNode} current is current fnode is displayed on screen
 * @param {any} props is nextProps of fiber
 * @return {FNode} new Fnode is next fiber to work is called work-in-progress
 */

export function createWIP (current, props) {
  if (current === null) return
  let WIP = current.alternate
  if (WIP === null) {
    // if workInProgress === null we will start create a work-in-progress tree
    WIP = createFNode(current.tag, props, current.key)
    WIP.elementType = current.elementType
    WIP.type = current.type
    WIP.instanceNode = current.instanceNode

    WIP.alternate = current
    current.alternate = WIP
  } else {
    // set props and reset effect tag
    WIP.props = props
    WIP.effectTag = 0

    // The effect list is no longer valid.
    WIP.nextEffect = null
    WIP.firstEffect = null
    WIP.lastEffect = null
    WIP.linkedList = new LinkedList()
    WIP.next = null
  }
  WIP.child = current.child

  WIP.prevProps = current.prevProps
  WIP.prevState = current.prevState
  WIP.rootRender = current.rootRender

  WIP.sibling = current.sibling
  WIP.index = current.index

  WIP.status = current.status

  WIP.lifeCycle = current.lifeCycle

  return WIP
}

/**
 * @param {Element} el is v-node
 * @return {FNode} new Fnode is created based on v-node element
 */

export function createFNodeFromElement (el) {
  if (el === null) return null
  const { type = '', key = null, props = {} } = el
  let fnode
  if (isString(type)) {
    fnode = createFNode(Tag.DNode, props, key)
  } else if (isFunction(type)) {
    fnode = createFNode(Tag.FComponent, props, key)
  }
  if (fnode !== null) {
    fnode.elementType = type
    fnode.type = type
  }
  return fnode
}

export function createFNodeFromFragment (elements, key) {
  const fnode = createFNode(Tag.Fragment, elements, key)
  return fnode
}
