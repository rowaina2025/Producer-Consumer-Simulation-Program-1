import { AppComponent } from "../app.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Unit } from "../models/Unit";

const httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    })
  };
@Injectable()
export class Httpsevice{
    private Url: string;
    constructor(private http: HttpClient) {
        this.Url = 'http://localhost:8080/producerConsumer/';
      }

    public addMachine(num: number){
        console.log("Sending request...");
        return this.http.get<void>(this.Url + "addMachine",{params:{num}});
    }
    public addProducer(num: number){
        console.log("Sending request...");
        return this.http.get<void>(this.Url + "addProducer",{params:{num}});
    }
    public addProducts( productCount: number){
        console.log("Sending request...");
        return this.http.get<void>(this.Url + "addProducts",{params:{productCount}});
    }
    public addLine(machineFrom: number, producerTo:number,direction:boolean){
        console.log("Sending request...");
        return this.http.get<void>(this.Url + "addLine",{params:{machineFrom,producerTo,direction}});
    }

    public getUnit(){
      console.log("Sending request...");
      return this.http.get<Unit>(this.Url + "getUnit");
    }

    public clear() {}

}
