package com.example.ProducerConsumer.model;

import java.util.Random;

public class Machine implements Consumer, Observer {
    private int time;
    private int num;
    private Product currentProduct;
    private boolean empty = true;
    private BlockingQueue<Product> fromQueue;
    private BlockingQueue<Product> toQueue;
    private final static Random rand = new Random();

    public Machine(int num, BlockingQueue<Product> fromQueue, BlockingQueue<Product> toQueue) {
        this.time = rand.nextInt(5000);
        this.num = num;
        this.fromQueue = fromQueue;
        this.toQueue = toQueue;
    }
    
    @Override
    public void run() {
        while (true) {
            synchronized (this) {
                empty = fromQueue.getState();
                if (empty)
                    fromQueue.attach(this);// subscribe to queue
                try {
                    while (empty) {
                        System.out.println("Machine " + num + " is waiting ");
                        wait();
                    }
                    consume();
                    String text = "Machine " + num + " consumed " + currentProduct.getNum();
                    System.out.println(text);
                    Thread.sleep(time); // assume this is the processing time
                    finish();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

            }
        }

    }

    public void consume() throws InterruptedException {
        System.out.println("Machine " + num + " is not waiting ");
        fromQueue.detach(this);// unsubscribe
        this.currentProduct = fromQueue.take();
    }

    public void finish() {
        toQueue.put(this.currentProduct);
        this.currentProduct = null;
    }

    public int getTime() {
        return time;
    }

    public void setTime(int time) {
        this.time = time;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public Product getCurrentProduct() {
        return currentProduct;
    }

    public void setCurrentProduct(Product currentProduct) {
        this.currentProduct = currentProduct;
    }

    public BlockingQueue<Product> getFromQueue() {
        return fromQueue;
    }

    public BlockingQueue<Product> getToQueue() {
        return toQueue;
    }

    public void update() {
        this.empty = fromQueue.getState();
        synchronized (this) {
            this.notify();
        }
    }
}
