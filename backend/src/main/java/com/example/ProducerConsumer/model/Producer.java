package com.example.ProducerConsumer.model;

import java.util.Random;

public class Producer {
    BlockingQueue<Product> queue = null;
    Random rand = new Random();

    public Producer(BlockingQueue<Product> queue) {
        this.queue = queue;
    }

    public void addProduct(Product product) throws InterruptedException {
        // each product has different input rate
        // wait(rand.nextInt(1000));
        this.queue.put(product);
        System.out.println(product.getNum() + " added at " + System.currentTimeMillis());
    }
}
