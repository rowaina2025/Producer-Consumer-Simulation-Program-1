import { BlockingQueue } from "./BlockingQueue"
import { Machine } from "./Machine"

export class Unit {

  machines: Machine = new Machine()
  queues: BlockingQueue[] = []

  constructor() {}

}
