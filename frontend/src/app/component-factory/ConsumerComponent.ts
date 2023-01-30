import Konva from "konva";
import { PCComponent } from "./PCComponent";

export class ConsumerComponent extends PCComponent{
  consumer: Konva.Label

  getConsumerShape(shapeData: PCComponent): Konva.Label{
    this.consumer = new Konva.Label({
      name: ''+ shapeData.getName() as string,
      x: shapeData.getX(),
      y: shapeData.getY(),
      draggable:true,
      width: 50,
      height:50,

    })
    this.consumer.add(
      new Konva.Tag({
        fill: shapeData.getColor(),
        stroke: "black",
        cornerRadius: 50
      })
    )
    this.consumer.add(
      new Konva.Text({
        text: 'M'+ shapeData.getName() as string,
        padding: 10,
        width: 70,
        height:70,
        fill: 'black',
        fontSize: 20,
        align: 'center',
        verticalAlign: 'middle' ,
        name: 'M'+ shapeData.getName() as string,
      })
    )
    return this.consumer
  }
}
