import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { reduce } from 'rxjs';
import { Httpsevice } from 'src/app/services/httpservice';
import { Memento } from './models/Memeonto';
import { Product } from './models/Product';
import { Unit } from './models/Unit';
import { PCComponent } from './component-factory/PCComponent';
import { ComponentsFactory } from './component-factory/ComponentsFactory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  stage!: Stage;
  layer!: Layer;
  shape: string = '';
  title = 'producer_consumer';
  konva: any;
  Machine_num = -1
  Producer_num = -1
  arr_of_Machines:Array<Konva.Label> = [] //for displayed objects
  arr_of_Producers:Array<Konva.Label> = [] //for displayed objects
  arr_of_Products: Product[] = []
  mementoList: Memento[] = []
  timeList: number[] = []

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
      if(e.target!=this.stage){
      this.httpService.getProduct(e.target.attrs.name[1]).subscribe((res)=>{
        this.arr_of_Products=res
      })}
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
    this.httpService.clear().subscribe()
  }

  addLine(){
    let shape1: any
    let shape2: any
    let first_pointx: any
    let first_pointy: any
    let second_pointx: any
    let second_pointy: any
    let from = document.getElementById("from") as HTMLInputElement
    let to= document.getElementById("to") as HTMLInputElement
    if(from.value[0] =='Q'&& to.value[0]=='M'){
      shape1 = this.arr_of_Producers[parseInt(from.value[1])]
      shape2 = this.arr_of_Machines[parseInt(to.value[1])]
      shape1.setAttrs(false).draggable(false)
      shape2.setAttrs(false).draggable(false)
      this.httpService.addLine(parseInt(to.value[1]),parseInt(from.value[1]), true).subscribe()
    } else if(from.value[0] == 'M' && to.value[0] == 'Q'){
      shape1 = this.arr_of_Machines[parseInt(from.value[1])]
      shape2 = this.arr_of_Producers[parseInt(to.value[1])]
      shape1.setAttrs(false).draggable(false)
      shape2.setAttrs(false).draggable(false)
      this.httpService.addLine(parseInt(from.value[1]),parseInt(to.value[1]), false).subscribe()
    } else {
      from.value = ''
      to.value = ''
      return
    }
    first_pointx = (shape1.attrs.x * 2 + shape1.attrs.width) / 2
    first_pointy = (shape1.attrs.y * 2 + shape1.attrs.height) / 2
    second_pointx = (shape2.attrs.x * 2 + shape2.attrs.width) / 2
    second_pointy = (shape2.attrs.y * 2 + shape2.attrs.height) / 2
    let arrow = new Konva.Arrow({
      points: [first_pointx, first_pointy, second_pointx, second_pointy],
      stroke: '#505050',
      fill: '#505050'
    });
    this.layer.add(arrow)
    from.value = ''
    to.value = ''
  }

  //Befor initiallization
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
      let producutCounts = document.getElementById("number_of_products") as HTMLInputElement
      let count = Number(producutCounts.value)
      if(count >= 0) {
        this.httpService.addProducts(count).subscribe()
      }
    }
  }

  //All objects drawings
  drawShape(shape: string) {
    let componentsFactory = new ComponentsFactory()
    if(shape == 'circle') {
      this.Machine_num++;
      let consumer = componentsFactory.getComponent(new PCComponent('consumer', 'white', this.stage?.getRelativePointerPosition()?.x, this.stage?.getRelativePointerPosition()?.y, 0, 0, this.Machine_num))
      this.layer.add(consumer)
      this.arr_of_Machines.push(consumer)
      this.httpService.addMachine(parseInt(consumer.attrs.name)).subscribe()
    } else if(shape == 'rect') {
      this.Producer_num++
      let producer = componentsFactory.getComponent(new PCComponent('producer', 'white', this.stage?.getRelativePointerPosition()?.x, this.stage?.getRelativePointerPosition()?.y, 0, 0, this.Producer_num))
      this.layer.add(producer)
      this.arr_of_Producers.push(producer)
      this.httpService.addProducer(parseInt(producer.attrs.name)).subscribe()//send to back
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  async getUnit() {
    let producutCount = document.getElementById("number_of_products") as HTMLInputElement
    let count = Number(producutCount.value)
    while(true){
      let res = await this.httpService.getUnit()
      let machine = res['machines']
      for(let i = 0; i < this.arr_of_Machines.length && machine[i]['currentProduct']!=null ; i++) {
        this.arr_of_Machines[i].children?.at(0)?.setAttrs({ fill: machine[i]['currentProduct'].color, })
      }

      if( res['queues'][res['queues'].length-1]['queue'].length==count ){
        for(let i = 0; i < this.arr_of_Machines.length ; i++) {
          this.arr_of_Machines[i].children?.at(0)?.setAttrs({ fill: "white", })
        }

        break
      }
      await this.delay(500);
    }
  }

  replay() {
    this.mementoList = []
    this.timeList = []
    this.httpService.getMamentoList().subscribe(async (res) => {
      for(let i = 0; i < res.length; i++) {
        let memento = new Memento()
        console.log(res[i]['stateQueue'])
        memento.stateMachine = res[i]['stateMachine']
        memento.stateQueue = res[i]['stateQueue']
        this.mementoList.push(memento)
      }
      this.getTime()
      await this.delay(3000);
      let count = 1
      for(let memento of this.mementoList) {
        if(memento.stateMachine.num != -1 && memento.stateMachine.currentProduct != null) {
          this.arr_of_Machines[memento.stateMachine.num].children?.at(0)?.setAttrs({ fill: memento.stateMachine.currentProduct.color, })
          await this.delay(this.timeList[count]);
        }
        count++
      }
      for(let i = 0; i < this.arr_of_Machines.length ; i++) {
        this.arr_of_Machines[i].children?.at(0)?.setAttrs({ fill: "white", })
      }
    })
    for(let i = 0; i < this.arr_of_Machines.length ; i++) {
      this.arr_of_Machines[i].children?.at(0)?.setAttrs({ fill: "white", })
    }
  }

  getTime() {
    this.httpService.getMementoTime().subscribe((res) => {
      for(let i = 0; i < res.length; i++) {
        this.timeList.push(res[i])
      }
    })
  }
}
