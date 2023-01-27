package com.example.ProducerConsumer.model;

import java.util.List;

public class Unit {
    private List<BlockingQueue<Product>> queues;
    private List<Machine> machines;

    public Unit(List<BlockingQueue<Product>> queues, List<Machine> machines) {
        this.queues = queues;
        this.machines = machines;
    }

    public List<BlockingQueue<Product>> getQueues() {
        return queues;
    }

    public void setQueues(List<BlockingQueue<Product>> queues) {
        this.queues = queues;
    }

    public List<Machine> getMachines() {
        return machines;
    }

    public void setMachines(List<Machine> machines) {
        this.machines = machines;
    }
}
