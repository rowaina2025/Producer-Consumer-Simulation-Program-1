import Konva from "konva";
import { PCComponent } from "./PCComponent";

export class producerComponent extends PCComponent{
  producer: Konva.Label

  getProducerShape(shapeData: PCComponent): Konva.Label {
    this.producer = new Konva.Label({
      name: ''+ shapeData.getName() as string,
      x: shapeData.getX(),
      y: shapeData.getY(),
      draggable:true,
      width: 50,
      height:50,
    })
    this.producer.add(
      new Konva.Tag({
        fill: shapeData.getColor(),
        stroke: "black",
      })
    )
    this.producer.add(
      new Konva.Text({
        text: 'Q'+ shapeData.getName() as string,
        padding: 10,
        width: 80,
        height: 50,
        fill: 'black',
        fontSize: 20,
        align: 'center',
        verticalAlign: 'middle' ,
        name: 'Q'+ shapeData.getName() as string,
      })
    )
    return this.producer
  }
}
