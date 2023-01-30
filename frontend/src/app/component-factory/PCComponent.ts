export class PCComponent {
  private color: string
  private x: number
  private y: number
  private endX: number
  private endY: number
  private name: number
  private type: string

  constructor(type: string, color: string, x: number, y: number, endX: number, endY: number, name: number) {
    this.color = color
    this.x = x
    this.y = y
    this.endX = endX
    this.endY = endY
    this.name = name
    this.type = type
  }

  getColor(): string { return this.color }

  getX(): number { return this.x }

  getY(): number { return this.y }

  getEndX(): number { return this.endX }

  getEndY(): number { return this.endY }

  getName(): number { return this.name }

  getType(): string { return this.type }

  setColor(color: string) { this.color = color }

  setX(x:number) { this.x = x }

  setY(y:number) { this.y = y }

  setEndX(endX:number) { this.endX = endX }

  setEndY(endY:number) { this.endY = endY }

  setName(name: number) { this.name = name }

  setType(type: string) { this.type = type }
}
