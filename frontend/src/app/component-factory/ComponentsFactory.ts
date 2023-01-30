import { producerComponent} from "./ProducerComponent";
import { PCComponent } from "./PCComponent";
import Konva from "konva";
import { ConsumerComponent } from "./ConsumerComponent";

export class ComponentsFactory {

  pcComponent: PCComponent

  getComponent(shapeDate: PCComponent): Konva.Label{
    if(shapeDate.getType() == 'producer') {
      let producer = this.pcComponent as producerComponent
      return producer.getProducerShape(shapeDate)
    } else if(shapeDate.getType() == 'consumer') {
      let consumer = this.pcComponent as ConsumerComponent
      return consumer.getConsumerShape(shapeDate)
    } else {
      return null
    }
  }

}
