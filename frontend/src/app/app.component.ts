import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';

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
  Machine_num = -1
  Producer_num = -1
  arr_of_Machines:Array<Konva.Label> = []
  arr_of_Producers:Array<Konva.Label> = []
  ngOnInit(): void {
    this.stage = new Stage({
      container: "container",
      width: window.innerWidth,
      height:  window.innerHeight
    });
    this.layer = new Layer();
    this.stage.add(this.layer);
  }

  addMachine() {
    this.shape = 'circle'
    this.stage.on("mousedown",(e) => {
      if(e.target instanceof Konva.Circle) {/*select shape*/}
      else if(this.shape == 'circle'){
        this.drawShape('circle')
        this.shape = ''
        //TODO send to back
      }
    });
  }

  addLine(from: string, to: string){
    // let arrow = new Konva.Arrow({
    //         points: [x, y],
    //         stroke: 'black',
    //         fill: 'black'
    //       });

    //       this.layer.add(this.konva);
    //       this.layer.batchDraw()
  }

  addProducer() {
    this.shape = 'rect'
    this.stage.on("mousedown",(e) => {
      if(e.target instanceof Konva.Rect) {/*select shape*/}
      else if(this.shape == 'rect'){
        this.drawShape('rect')
        this.shape = ''
        //TODO send to back
      }
    });
  }

  drawShape(shape: string) {
    if(shape == 'circle') {
      this.Machine_num++;
      let consumer = new Konva.Label({
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
      this.layer.add(consumer)
      this.arr_of_Machines.push(consumer)
    } else if(shape == 'rect') {
      this.Producer_num++
      let producer = new Konva.Label({
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
      this.layer.add(producer)
      this.arr_of_Producers.push(producer)
    }
  }
}
