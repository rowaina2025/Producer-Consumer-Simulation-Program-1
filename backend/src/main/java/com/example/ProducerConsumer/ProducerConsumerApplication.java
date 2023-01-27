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
        Machine m1 = new Machine(countM++);
        m1.setFromQueue(queue1);
        m1.setToQueue(queue2);
        Machine m2 = new Machine(countM++);
        m2.setFromQueue(queue1);
        m2.setToQueue(queue2);

        Machine m3 = new Machine(countM++);
        m3.setFromQueue(queue2);
        m3.setToQueue(queue3);
        Machine m4 = new Machine(countM++);
        m4.setFromQueue(queue3);
        m4.setToQueue(queue4);

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
        System.out.println("c4 started");*/
        //@Autowired
        /*PCService service = new PCService();
        //service.addMachine(new Machine(0));

        service.addMachine(new Machine(0));
        service.addMachine(new Machine(1));
        service.addMachine(new Machine(2));
        service.addQueue(new BlockingQueue(0));
        service.addQueue(new BlockingQueue(1));
        service.addLine(0, 0, true);

        service.addLine(1, 0, true);
        service.addLine(2, 0, true);
        service.addLine(0, 1, false);

        service.addLine(1, 1, false);
        service.addLine(2, 1, false);
        service.addProducts(10);
        service.start();

        Unit unit = service.getUnit();
        System.out.println("unit");

        System.out.println(unit);
        for (Machine machine : unit.getMachines()) {
            System.out.println("Machine" + machine.getNum() + " has " + machine.getCurrentProduct());
        }
        for (BlockingQueue<Product> queue : unit.getQueues()) {
            System.out.println("queue" + queue.getNum() + " has ");
            for (Product p : queue.getQueue()) {
                System.out.println(p.getNum() + " " + p.getColor());
            }
        }*/

//        int countQ = 0;
//        int countM = 0;
//        BlockingQueue<Product> queue1 = new BlockingQueue<>(countQ++);
//        BlockingQueue<Product> queue2 = new BlockingQueue<>(countQ++);
//        BlockingQueue<Product> queue3 = new BlockingQueue<>(countQ++);
//        BlockingQueue<Product> queue4 = new BlockingQueue<>(countQ++);
//        Consumer m1 = new Machine(countM++);
//        Consumer m2 = new Machine(countM++);
//        Consumer m3 = new Machine(countM++);
//        Consumer m4 = new Machine(countM++);
//
//        List<Product> products = new ArrayList<>();
//        for (int i = 1; i <= 5; i++) {
//            try {
//                products.add(new Product(i, null));
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//        Producer p = new Producer(queue1, products);
//        Thread prod = new Thread(p);
//        Thread c1 = new Thread(m1);
//        Thread c2 = new Thread(m2);
//        Thread c3 = new Thread(m3);
//        Thread c4 = new Thread(m4);
//
//        prod.start();
//        c1.start();
//        System.out.println("c1 started");
//        c2.start();
//        System.out.println("c2 started");
//
//        c3.start();
//        System.out.println("c3 started");
//
//        c4.start();
//        System.out.println("c4 started");
//

    }

}
