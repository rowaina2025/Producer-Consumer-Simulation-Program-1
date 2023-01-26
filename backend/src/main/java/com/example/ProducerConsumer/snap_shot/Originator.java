package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.BlockingQueue;
import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Product;

import java.util.LinkedList;
import java.util.Queue;

public class Originator {

    private Machine machineState;
    private BlockingQueue<Product> queueState;

    public void setState(Machine machineState, BlockingQueue<Product> queueState) {
        this.machineState = machineState == null ? null : new Machine(machineState.getNum());
        this.queueState = new BlockingQueue<>(queueState.getNum());
        Queue<Product> products = new LinkedList(queueState.getQueue());
        this.queueState.setQueue(products);
    }


    public Machine getStateMachine() {
        return machineState;
    }

    public BlockingQueue<Product> getQueueState() {
        return queueState;
    }

    public Memento saveStateToMemento() {
        return new Memento(machineState, queueState);
    }

    public void getStateFromMementoMachine(Memento memento) {
        machineState = memento.getStateMachine();
        queueState = memento.getStateQueue();
    }

}
