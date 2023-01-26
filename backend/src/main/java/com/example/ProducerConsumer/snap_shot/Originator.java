package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Producer;

public class Originator {

     private Machine machineState;
     private Producer producerState;

     public void setStateMachine(Machine machineState) {
         this.machineState = machineState;
     }

    public void setStateProducer(Producer producerState) {
        this.producerState = producerState;
    }

     public Machine getStateMachine() {
         return machineState;
     }

     public Producer getProducerState() {
         return producerState;
     }

     public Memento saveStateToMementoMachine() {
         return new Memento(machineState);
     }

    public Memento saveStateToMementoProducer() {
        return new Memento(producerState);
    }

     public void getStateFromMementoMachine(Memento memento) {
         machineState = memento.getStateMachine();
     }

    public void getStateFromMementoProducer(Memento memento) {
        producerState = memento.getStateProducer();
    }

}
