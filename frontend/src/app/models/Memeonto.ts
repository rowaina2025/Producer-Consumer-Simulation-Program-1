import { BlockingQueue } from "./BlockingQueue";
import { Machine } from "./Machine";

export class Memento {
  stateMachine: Machine = new Machine()
  stateQueue: BlockingQueue = new BlockingQueue()
  state: boolean = true

  constructor() {}
}
