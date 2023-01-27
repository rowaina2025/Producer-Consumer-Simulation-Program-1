package com.example.ProducerConsumer.model;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BlockingQueue<Product> implements Observable {

    private int num;
    private Queue<Product> queue = new LinkedList<>();
    private List<Observer> observers = new ArrayList<>();

    public BlockingQueue(int num) {
        this.num = num;
    }

    public synchronized void put(Product element) {
        queue.add(element);
        notifyObservers(); //for multiple producer/consumer threads
    }

    public synchronized Product take() throws InterruptedException {
        while (queue.isEmpty()) {
            wait();
        }
        Product item = queue.remove();
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

    public void attach(Observer observer) {
        this.observers.add(observer);
    }

    public void detach(Observer observer) {
        this.observers.remove(observer);
    }

    public void notifyObservers() {
        // notifies first observer
        for (Observer observer : observers) {
            observer.update();
            break;
        }
    }

    public boolean getState() {
        return queue.isEmpty();
    }
}

