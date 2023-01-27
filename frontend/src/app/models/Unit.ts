import { Product } from "./Product"

export class Unit {

  machines: string[] = []
  queues: Array<Product> = []

  constructor(machines: string[], queues: Array<Product>) {
    this.machines = machines
    this.queues = queues
  }

  setMachines(machine: string[]) { this.machines = machine }

  setQueues(queues: Array<Product>) { this.queues = queues }

  getQueues(): Array<Product> { return this.queues }

  getMachines(): string[] { return this.machines }

}
