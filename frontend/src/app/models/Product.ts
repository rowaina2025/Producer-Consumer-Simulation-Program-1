export class Product {

  num: number = 0
  name: string = ''

  constructor(num: number, name: string) {
    this.num = num
    this.name = name
  }

  setNum(num: number) { this.num = num }

  setName(name: string) { this.name = name }

  getNum(): number { return this.num }

  getName(): string { return this.name }

}
