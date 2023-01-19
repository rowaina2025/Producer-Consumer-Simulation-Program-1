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
  draw:boolean=false
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

  drawCircle() {
    
    this.draw=true
    if(this.draw){
    this.stage.on("mousedown",() => {
      var circle = new Konva.Circle({
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
      this.draw=false
    });
  }
  }
  
  drawRectangle() {///////////////////////////////\
    this.draw=true
    if(this.draw){
    this.stage.on("mousedown",() => {
      var circle = new Konva.Rect({
        x: this.stage?.getRelativePointerPosition()?.x,
        y: this.stage?.getRelativePointerPosition()?.y,
        width: 100,
        height: 50,
        fill: 'white',
        stroke: 'black',
        strokeWidth: 4,
        draggable:true,
      })
      this.layer.add(circle);
      this.stage.add(this.layer);
      this.draw=false
    });
  }
}


}
