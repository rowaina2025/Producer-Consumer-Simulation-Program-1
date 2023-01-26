package com.example.ProducerConsumer.service;

import com.example.ProducerConsumer.model.BlockingQueue;
import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Producer;
import com.example.ProducerConsumer.model.Product;

import java.util.ArrayList;
import java.util.List;

public class PCService {
    List<BlockingQueue> queues = new ArrayList<>();
    List<Machine> machines = new ArrayList<>();
    List<Product> products = new ArrayList<>();
    List<Thread> threads = new ArrayList<>();

    int pCount = 0;
    int mCount = 0;

    public void addProduct(Product product) { //take num return array
        //TODO add random number and color
        products.add(product);
    }

    public void addMachine(Machine machine) {
        machines.add(machine);
        threads.add(new Thread(machine, String.valueOf(machine.getNum())));
    }

    public void addQueue(BlockingQueue queue) {
        queues.add(queue);
    }

    // connects machine to a queue, true: from queue, false : to queue
    public void addLine(int machineNo, int queueNo, boolean direction) {
        if (direction) {
            //     machines.get(machineNo).setT
        }
    }

    public void start() {
        Producer producer = new Producer(queues.get(0), products);
        Thread prod = new Thread(producer);
        prod.start();
        System.out.println("Producer started");
        for (Thread thread : threads) {
            thread.start();
            System.out.println(thread.getName() + " started");
        }
    }
}
