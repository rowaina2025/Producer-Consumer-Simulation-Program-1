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
        //TODO do your implementation on adding new machine
      }
    });
  }
  Connect(){
    this.shape = 'arrow'
    // this.stage.on("mousedown",(e) => {
    //   if(e.target instanceof Konva.Circle) {/*select shape*/}
    //   else if(this.shape == 'circle'){
    //     this.drawShape('circle')
    //     this.shape = ''
    //     //TODO do your implementation on adding new machine
    //   }
    // });

  let isdraw=false
  let move=false
  let arrow:any
  let x:any,y:any
  let pos:any
    this.stage.on('mousedown', (e) => {
      isdraw=true
      if(this.shape == 'arrow') {
        move = false
        isdraw = true;
        x = e.target.getRelativePointerPosition().x;
        y = e.target.getRelativePointerPosition().y
        // const pos = this.stage.getRelativePointerPosition();
        arrow = new Konva.Arrow({
          x: this.stage?.getRelativePointerPosition()?.x,
          y: this.stage?.getRelativePointerPosition()?.y,
          points: [x,y],
          pointerLength: 20,
          pointerWidth: 20,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 4,
        });
        this.layer.add(arrow).batchDraw();
      }
    });

    this.stage.on('mousemove', () => {
      if(this.shape == 'arrow') {
        move = true;

       pos = this.stage?.getRelativePointerPosition();
      arrow.setAttrs({
        points: [x, y, pos?.x, pos?.y],
      })
  }});

    this.stage.on('mouseup', (e) => {
      if(this.shape == 'arrow') {
        isdraw = false;
        if(move) {
          
          arrow.setAttrs({
            points: [x, y, pos?.x, pos?.y],
          })
          this.layer.add(arrow).batchDraw();
    
          this.stage.add(this.layer);
          arrow=null
      }}
  });
  }
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
    // else if(shape == 'arrow') {
    //   let arrow = new Konva.Arrow({
    //     x: this.stage?.getRelativePointerPosition()?.x,
    //     y: this.stage?.getRelativePointerPosition()?.y,
    //     points: [0, 0, width / 2, height / 2],
    //     pointerLength: 20,
    //     pointerWidth: 20,
    //     fill: 'black',
    //     stroke: 'black',
    //     strokeWidth: 4,
    //   });
    //   this.layer.add(arrow);
    //   this.stage.add(this.layer);
    // }
  }
}
