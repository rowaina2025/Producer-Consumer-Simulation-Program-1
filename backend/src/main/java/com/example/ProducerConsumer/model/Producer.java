package com.example.ProducerConsumer.model;

import java.util.List;
import java.util.Random;

public class Producer implements Runnable {
    private final BlockingQueue<Product> queue;
    private List<Product> products;
    private final static Random rand = new Random();

    public Producer(BlockingQueue<Product> queue, List<Product> products) {
        this.queue = queue;
        this.products = products;
    }

    public void addProduct(Product product) throws InterruptedException {
        // each product has different input rate
        // wait(rand.nextInt(1000));
        this.queue.put(product);
        System.out.println(product.getNum() + " added at " + System.currentTimeMillis());
    }

    @Override
    public void run() {
        for (Product product : products) {
            try {
                this.queue.put(product);
                System.out.println(product.getNum() + " added at " + System.currentTimeMillis());
                Thread.sleep(rand.nextInt(5000));
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
