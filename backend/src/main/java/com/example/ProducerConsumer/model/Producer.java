package com.example.ProducerConsumer.model;

import com.example.ProducerConsumer.snap_shot.CareTaker;
import com.example.ProducerConsumer.snap_shot.Originator;

import java.util.List;
import java.util.Random;

public class Producer implements Runnable {
    private final BlockingQueue<Product> queue;
    private List<Product> products;
    private final static Random rand = new Random();
    Originator originator = new Originator();//get originator class

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
        CareTaker careTaker = CareTaker.getInstance(); //get care taker object
        originator.setState(null, this.queue);//set state
        careTaker.add(originator.saveStateToMemento());//save the state
        for (Product product : products) {
            try {
                Thread.sleep(rand.nextInt(5000));
                this.queue.put(product);
                originator.setState(null, this.queue);//set state
                careTaker.add(originator.saveStateToMemento());//save the state
                System.out.println(product.getNum() + " added at " + System.currentTimeMillis());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
