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
      }
    });
  }

  addProducer() {
    this.shape = 'rect'
    this.stage.on("mousedown",(e) => {
      if(e.target instanceof Konva.Rect) {/*select shape*/}
      else if(this.shape == 'rect'){
        this.drawShape('rect')
        this.shape = ''
      }
    });
  }

  drawShape(shape: string) {
    if(shape == 'circle') {
      let circle = new Konva.Circle({
        x: this.stage?.getRelativePointerPosition()?.x,
        y: this.stage?.getRelativePointerPosition()?.y,
        radius: 50,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 4,
        draggable:true,
      })
      this.layer.add(circle);
      this.stage.add(this.layer);
    } else if(shape == 'rect') {
      let rect = new Konva.Rect({
        x: this.stage?.getRelativePointerPosition()?.x,
        y: this.stage?.getRelativePointerPosition()?.y,
        width: 100,
        height: 50,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 4,
        draggable:true,
      })
      this.layer.add(rect);
      this.stage.add(this.layer);
    }
  }
}
