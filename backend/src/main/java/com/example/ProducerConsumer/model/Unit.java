package com.example.ProducerConsumer.model;

import java.awt.desktop.QuitEvent;
import java.util.List;
import java.util.Queue;

public class Unit {
    private List<Queue<Product>> queues;
    private List<String> machines;

    public Unit(List<BlockingQueue<Product>> queues, List<Machine> machines) {
        for(int i = 0; i < queues.size(); i++) {
            this.queues.add(queues.get(i).getQueue());
        }
        for(int i = 0; i < machines.size(); i++) {
            this.machines.add(machines.get(i).getCurrentProduct().getColor());
        }
    }

    public void setQueues(List<Queue<Product>> queues) { this.queues = queues; }

    public void setMachines(List<String> machines) { this.machines = machines; }

    public List<Queue<Product>> getQueues() { return queues; }

    public List<String> getMachines() { return machines; }
}
