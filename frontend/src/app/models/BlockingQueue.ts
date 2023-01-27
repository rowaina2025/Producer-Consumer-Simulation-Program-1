import { Product } from "./Product"

export class BlockingQueue {
  state: boolean = false
  queue: Product[] = []
  num: number = 0
  constructor(){}

}
