package com.example.ProducerConsumer.model;

import java.util.LinkedList;
import java.util.Queue;

public class BlockingQueue<Product> {

    private int num;
    private Queue<Product> queue = new LinkedList<Product>();

    public BlockingQueue(int num) {
        this.num = num;
    }

    public synchronized void put(Product element) {
        queue.add(element);
        //notify();
        // will be substituted by observer later
        notifyAll(); //for multiple producer/consumer threads
    }

    public synchronized Product take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }

        Product item = queue.remove();
        //notify(); // notifyAll() for multiple producer/consumer threads
        return item;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public Queue<Product> getQueue() {
        return queue;
    }

    public void setQueue(Queue<Product> queue) {
        this.queue = queue;
    }
}

