package com.example.ProducerConsumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProducerConsumerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProducerConsumerApplication.class, args);
        /*int countQ = 0;
        int countM = 0;
        BlockingQueue<Product> queue1 = new BlockingQueue<>(countQ++);
        BlockingQueue<Product> queue2 = new BlockingQueue<>(countQ++);
        BlockingQueue<Product> queue3 = new BlockingQueue<>(countQ++);
        BlockingQueue<Product> queue4 = new BlockingQueue<>(countQ++);
        Consumer m1 = new Machine(1000, countM++, queue1, queue2);
        Consumer m2 = new Machine(500, countM++, queue1, queue2);
        Consumer m3 = new Machine(700, countM++, queue2, queue3);
        Consumer m4 = new Machine(100, countM++, queue3, queue4);

        List<Product> products = new ArrayList<>();
        for (int i = 1; i <= 5; i++) {
            try {
                products.add(new Product(i, null));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        Producer p = new Producer(queue1, products);
        Thread prod = new Thread(p);
        Thread c1 = new Thread(m1);
        Thread c2 = new Thread(m2);
        Thread c3 = new Thread(m3);
        Thread c4 = new Thread(m4);

        prod.start();
        c1.start();
        System.out.println("c1 started");
        c2.start();
        System.out.println("c2 started");

        c3.start();
        System.out.println("c3 started");

        c4.start();
        System.out.println("c4 started");
*/

    }

}
