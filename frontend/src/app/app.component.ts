import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { Httpsevice } from 'src/services/httpservice';

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
  arr_of_Products: Array<number> = []
  selectedMachine: string = ''
  constructor (private httpService: Httpsevice) {}

  ngOnInit(): void {
    this.stage = new Stage({
      container: "container",
      width: window.innerWidth,
      height:  window.innerHeight
    });
    this.layer = new Layer();
    this.stage.add(this.layer);

    this.stage.on("mousedown",(e) => {
      console.log(e.target.attrs.name)
    });
  }

  reset(){
    this.stage.destroy();
    this.stage = new Stage({
      container: "container",
      width: window.innerWidth,
      height:  window.innerHeight
    });
    this.layer = new Layer();
    this.stage.add(this.layer);
    this.stage.on("mousedown",(e) => {
      console.log(e.target.attrs.name)
    });
    this.arr_of_Producers = []
    this.arr_of_Machines = []
    this.arr_of_Products = []
    this.Machine_num=-1
    this.Producer_num=-1
    this.httpService.clear()
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
      this.httpService.addLine(parseInt(to.value[1]),parseInt(from.value[1]), true).subscribe()
    } else if(from.value[0] == 'M' && to.value[0] == 'Q'){
      shape1=this.arr_of_Machines[parseInt(from.value[1])]
      shape2=this.arr_of_Producers[parseInt(to.value[1])]
      shape1.setAttrs(false).draggable(false)
      shape2.setAttrs(false).draggable(false)
      this.httpService.addLine(parseInt(from.value[1]),parseInt(to.value[1]), false).subscribe()
    } else {
      from.value=''
      to.value=''
      return
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
      let count = Number(producutCount.value)
      for(let i = 1; i<=count; i++){
        this.arr_of_Products.push(i);
        console.log(this.arr_of_Products[i-1])
      }
      if(count >= 0) {
        this.httpService.addProducts(count).subscribe()
      }
      for(let i = 1; i<=count; i++){
        this.arr_of_Products.push(i);
        console.log(this.arr_of_Products[i-1])
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
          fill: 'lightblue',
          stroke:"blue ",
          cornerRadius: 50
        })
      )
      consumer.add(
        new Konva.Text({
          text: 'M'+ this.Machine_num as string,
          padding: 10,
          width: 70,
          height:70,
          fill: 'white',
          fontSize: 20,
          align: 'center',
          verticalAlign: 'middle' ,
          name: 'M'+ this.Machine_num as string,
        })
      )
      console.log(parseInt(consumer.attrs.name))
      this.layer.add(consumer)
      this.arr_of_Machines.push(consumer)
      this.httpService.addMachine(parseInt(consumer.attrs.name)).subscribe()
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
          fill:'lightgreen' ,
          stroke: "orange",
        })
      )
      producer.add(
        new Konva.Text({
          text: 'Q'+ this.Producer_num as string,
          padding: 10,
          width: 80,
          height: 50,
          fill: 'white',
          fontSize: 20,
          align: 'center',
          verticalAlign: 'middle' ,
          name: 'Q'+ this.Producer_num as string,
        })
      )
      console.log(parseInt(producer.attrs.name))
      this.layer.add(producer)
      this.arr_of_Producers.push(producer)
      console.log(this.arr_of_Producers)
      this.httpService.addProducer(parseInt(producer.attrs.name)).subscribe()//send to back
    }
  }

  showProducts(q: number) {

  }
}
