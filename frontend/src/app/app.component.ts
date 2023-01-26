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
  Machine_num=-1
  Producer_num=-1
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
        //TODO do your implementation on adding new machine
      }
    });
  }
  //  Connect(){
  //   this.shape = 'line'
  //   this.stage.on("mousedown",(e) => {
  //     if(this.shape=='line'){
  //     e.target.setAttrs(false).draggable(false)
  //     let x = e.target.getAbsolutePosition().x;
  //     let y = e.target.getAbsolutePosition().y;
  //     this.konva = new Konva.Arrow({
  //       points: [x, y],
  //       stroke: 'black',
  //       fill: 'black'
  //     });
  //     this.layer.add(this.konva);
  //     this.layer.batchDraw();}
  //   });
  //   this.stage.on("mousemove",(e) => {
  //     if(this.konva!=null && this.shape=='line' ){
  //       let endx =  e.target.getAbsolutePosition().x;
  //       let endy =  e.target.getAbsolutePosition().y;
  //       const points = [this.konva.points()[0],this.konva.points()[1],endx,endy]
  //       this.konva.points(points);
  //       this.layer.batchDraw();
  //     }
  //   });
  //   this.stage.on('mouseup', () => {
  //     if(this.shape=='line'){
  //     this.konva = null;}
  //   });
  // }
  addProducer() {
    this.shape = 'rect'
    this.stage.on("mousedown",(e) => {
      if(e.target instanceof Konva.Rect) {/*select shape*/}
      else if(this.shape == 'rect'){
        this.drawShape('rect')
        this.shape = ''
        //TODO do your implementation on adding new producer
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
      })
      consumer.add(
        new Konva.Tag({
          fill: 'blue',
          cornerRadius: 70
        })
      )
      consumer.add(
        new Konva.Text({
          text: 'M'+ this.Machine_num as string,
          padding: 10,
          width: 100,
          height: 50,
          fill: 'white',
          fontSize: 20,
          align: 'center',
        })
      )
      this.layer.add(consumer)
    } else if(shape == 'rect') {
      this.Producer_num++
      let producer = new Konva.Label({
        x: this.stage?.getRelativePointerPosition()?.x,
        y: this.stage?.getRelativePointerPosition()?.y,
        draggable:true,

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
          width: 70,
          height: 50,
          fill: 'white',
          fontSize: 20,
          align: 'center',
        })
      )
      this.layer.add(producer)
    }
  }
}
