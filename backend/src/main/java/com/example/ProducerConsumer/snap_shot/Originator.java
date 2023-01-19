package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.Machine;

public class Originator {

     private Machine state;

     public void setState(Machine state) {
         this.state = state;
     }

     public Machine getState() {
         return state;
     }

     public Memento saveStateToMemento() {
         return new Memento(state);
     }

     public void getStateFromMemento(Memento memento) {
         state = memento.getState();
     }

}
