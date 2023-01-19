package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.Machine;

//TODO move the class implementation to service -- methods will not be used like that
public class mementoDemo {
    private CareTaker careTaker;
    private Originator originator;

    public void addToMemento(Machine machine) {
        originator.setState(machine);
        careTaker.add(originator.saveStateToMemento());
    }

    //TODO add counter to loop on indexes
    public Machine getMemento(int index) {
        originator.getStateFromMemento(careTaker.get(index));
        return originator.getState();
    }
}
