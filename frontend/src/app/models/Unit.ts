import { Product } from "./Product"

export class Unit {

  machines: string[] = []
  queues: Array<Array<Product>> = []

  constructor() {}

  setMachines(machine: string[]) { this.machines = machine }

  setQueues(queues: Array<Array<Product>>) { this.queues = queues }

  getQueues(): Array<Array<Product>> { return this.queues }

  getMachines(): string[] { return this.machines }

}
