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

  drawCircle(){
    var circle = new Konva.Circle({
      x: 200,
      y: 100,
      width: 150,
      fill: 'white',
      stroke:"black",
      strokeWidth:5,
      innerRadius: 5,
      draggable: true
    }); 
    this.layer.add(circle);
    this.stage.add(this.layer);
  }
  
  drawRectangle(){
    var rectangle = new Konva.Rect({
      x: 200,
      y: 100,
      width: 150,
      height: 90,
       strokeWidth:5,
      fill: "white",
      stroke:"black",
      name: 'rect',
      draggable: true,
  });
  this.layer.add(rectangle);
  this.stage.add(this.layer);
  }

  drawLine(){
  //   let start:Konva.Shape
  //   let end
  //   let draw=false
  //   this.stage.on('mousedown', (e)=> {
  //   start=e.target as Konva.Shape
  //   console.log(e.target)
  //   draw=true
  //   var arrow = new Konva.Arrow({
  //     points: [start.position, circle.getY(), circleA.getX(), circleA.getY()],
  //     pointerLength: 10,
  //     pointerWidth: 10,
  //     fill: 'black',
  //     stroke: 'black',
  //     strokeWidth: 4
  //   });
  // });

  
  }


}
