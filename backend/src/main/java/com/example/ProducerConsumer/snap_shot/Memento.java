package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Producer;

public class Memento {
    private Machine machineState;
    private Producer producerState;

    public Memento(Machine machineState) {
        this.machineState = machineState;
    }

    public Memento(Producer producerState) {
        this.producerState = producerState;
    }

    public Machine getStateMachine() {
        return machineState;
    }

    public Producer getStateProducer() {
        return producerState;
    }
}
