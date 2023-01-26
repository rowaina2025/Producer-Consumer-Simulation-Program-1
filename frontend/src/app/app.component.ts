import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { httpsevice } from 'src/services/httpservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stage!: Stage;
  layer!: Layer;
  shape: string = '';
  title = 'frontend';
  konva: any;
  Machine_num=-1
  Producer_num=-1
  arr_of_Machines:Array<Konva.Label> = []
  arr_of_Producers:Array<Konva.Label> = []
  arr_of_Products: Array<String> = []
  selectedMachine: string = ''
  constructor (private httpService: httpsevice){

  }
  ngOnInit(): void {
    this.stage = new Stage({
      container: "container",
      width: window.innerWidth,
      height:  window.innerHeight
    });
    this.layer = new Layer();
    this.stage.add(this.layer);
  }

  addLine(){
    let shape1:any
    let shape2:any
    let first_pointx:any
    let first_pointy:any
    let second_pointx :any
    let second_pointy:any
    let from= document.getElementById("from") as HTMLInputElement
    let to= document.getElementById("to") as HTMLInputElement
    if(from.value[0] =='Q'&& to.value[0]=='M'){
      shape1=this.arr_of_Producers[parseInt(from.value[1])]
      shape2=this.arr_of_Machines[parseInt(to.value[1])]
      shape1.setAttrs(false).draggable(false)
      shape2.setAttrs(false).draggable(false)
      this.httpService.addLine(parseInt(to.value[1]),parseInt(from.value[1]), true)
    } else{
      shape1=this.arr_of_Machines[parseInt(from.value[1])]
      shape2=this.arr_of_Producers[parseInt(to.value[1])]
      shape1.setAttrs(false).draggable(false)
      shape2.setAttrs(false).draggable(false)
      this.httpService.addLine(parseInt(from.value[1]),parseInt(to.value[1]), false)
    }
      first_pointx =  (shape1.attrs.x * 2+shape1.attrs.width)/2
      first_pointy =  (shape1.attrs.y * 2+shape1.attrs.height)/2
      second_pointx = (shape2.attrs.x * 2+shape2.attrs.width)/2
      second_pointy = (shape2.attrs.y * 2+shape2.attrs.height)/2
    let arrow = new Konva.Arrow({
            points: [first_pointx,first_pointy,second_pointx,second_pointy],
            stroke: '#505050',
            fill: '#505050'
          });

          this.layer.add(arrow)
          from.value=''
          to.value=''
  }

  addItem(type: string) {
    if(type == "producer") {
      this.shape = 'rect'
      this.stage.on("mousedown",(e) => {
        if(this.shape == 'rect'){
          this.drawShape('rect')
          this.shape = ''
        }
      });
    } else if(type == "machine") {
      this.shape = 'circle'
      this.stage.on("mousedown",(e) => {
        if(e.target instanceof Konva.Circle) {/*select shape*/}
        else if(this.shape == 'circle'){
          this.drawShape('circle')
          this.shape = ''
        }
      });
    } else if(type == "products") {
      let producutCount = document.getElementById("number_of_products") as HTMLInputElement
      let count = Number(producutCount.value[1])
      if(count >= 0 && count <= 9) {
        this.httpService.addProducts(count).subscribe()
      }
    }
  }

  drawShape(shape: string) {
    if(shape == 'circle') {
      this.Machine_num++;
      let consumer = new Konva.Label({
        name: ''+this.Machine_num as string,
        x: this.stage?.getRelativePointerPosition()?.x,
        y: this.stage?.getRelativePointerPosition()?.y,
        draggable:true,
        width: 50,
        height:50,
      })
      consumer.add(
        new Konva.Tag({
          fill: 'blue',
          cornerRadius: 50
        })
      )
      consumer.add(
        new Konva.Text({
          text: 'M'+ this.Machine_num as string,
          padding: 10,
          width: 50,
          height:50,
          fill: 'white',
          fontSize: 20,
          align: 'center',
          name: 'M'+ this.Machine_num as string,
        })
      )
      console.log(parseInt(consumer.attrs.name))
      this.httpService.addMachine(parseInt(consumer.attrs.name))//send to back

      this.layer.add(consumer)
      this.arr_of_Machines.push(consumer)
    } else if(shape == 'rect') {
      this.Producer_num++
      let producer = new Konva.Label({
        name: ''+this.Producer_num as string,
        x: this.stage?.getRelativePointerPosition()?.x,
        y: this.stage?.getRelativePointerPosition()?.y,
        draggable:true,
        width: 50,
        height:50,
      })
      producer.add(
        new Konva.Tag({
          fill: 'blue',
        })
      )
      producer.add(
        new Konva.Text({
          text: 'Q'+ this.Producer_num as string,
          padding: 10,
          width: 50,
          height: 50,
          fill: 'white',
          fontSize: 20,
          align: 'center',
          name: 'Q'+ this.Producer_num as string,
        })
      )
      console.log(parseInt(producer.attrs.name))
      this.httpService.addProducer(parseInt(producer.attrs.name))//send to back

      this.layer.add(producer)
      this.arr_of_Producers.push(producer)
    }
  }
}
