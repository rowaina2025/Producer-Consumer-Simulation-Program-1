package com.example.ProducerConsumer.model;

public class Machine implements Consumer {
    private int time;
    private int num;
    private Product currentProduct;
    private final BlockingQueue<Product> fromQueue;
    private final BlockingQueue<Product> toQueue;

    public Machine(int time, int num, BlockingQueue<Product> fromQueue, BlockingQueue<Product> toQueue) {
        this.time = time;
        this.num = num;
        this.fromQueue = fromQueue;
        this.toQueue = toQueue;
    }

    @Override
    public void run() {
        for (; ; ) {
            synchronized (fromQueue) {
                try {
                    this.currentProduct = fromQueue.take();
                    String text = Thread.currentThread().getName() + "consumed" + currentProduct.getNum();
                    System.out.println(text);
                    Thread.sleep(time);
                    toQueue.put(this.currentProduct);
                    this.currentProduct = null;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }

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

}
