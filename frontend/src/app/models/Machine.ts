import { BlockingQueue } from "./BlockingQueue";
import { Product } from "./Product"

export class Machine {
  time: number = 0
  num: number = 0
  currentProduct: Product = new Product()
  fromQueue: BlockingQueue = new BlockingQueue()
  toQueue: BlockingQueue = new BlockingQueue()
  empty: boolean = true

  constructor(){}
}
