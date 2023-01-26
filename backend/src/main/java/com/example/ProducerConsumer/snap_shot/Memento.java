package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.BlockingQueue;
import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Product;

public class Memento {
    private Machine machineState;
    private BlockingQueue<Product> queueState;

    public Memento(Machine machineState, BlockingQueue<Product> queueState) {
        this.machineState = machineState;
        this.queueState = queueState;
    }

    public Machine getStateMachine() {
        return machineState;
    }

    public BlockingQueue<Product> getStateQueue() {
        return queueState;
    }
}
