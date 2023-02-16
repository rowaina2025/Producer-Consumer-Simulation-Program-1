import { producerComponent} from "./ProducerComponent";
import { PCComponent } from "./PCComponent";
import Konva from "konva";
import { ConsumerComponent } from "./ConsumerComponent";

export class ComponentsFactory {

  constructor(){}

  getComponent(shapeDate: PCComponent): Konva.Label{
    if(shapeDate.getType() == 'producer') {
      let producer = new producerComponent()
      return producer.getProducerShape(shapeDate)
    } else if(shapeDate.getType() == 'consumer') {
      let consumer = new ConsumerComponent()
      return consumer.getConsumerShape(shapeDate)
    } else {
      return null
    }
  }

}
