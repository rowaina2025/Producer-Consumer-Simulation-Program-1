package com.example.ProducerConsumer.service;

import com.example.ProducerConsumer.model.*;
import com.example.ProducerConsumer.snap_shot.CareTaker;
import com.example.ProducerConsumer.snap_shot.Memento;
import com.example.ProducerConsumer.snap_shot.Originator;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;
import java.util.Random;

@Service
public class PCService {
    List<BlockingQueue<Product>> queues = new ArrayList<>();
    List<Machine> machines = new ArrayList<>();
    List<Product> products = new ArrayList<>();
    List<Thread> threads = new ArrayList<>();
    Unit unit = new Unit(queues, machines);

    Originator originator = new Originator();
    Random rand = new Random();

    static String decToHexa(int n) {
        char[] hexaDeciNum = new char[2];
        int i = 0;
        while (n != 0) {
            int temp = 0;
            temp = n % 16;
            if (temp < 10) {
                hexaDeciNum[i] = (char) (temp + 48);
                i++;
            } else {
                hexaDeciNum[i] = (char) (temp + 55);
                i++;
            }

            n = n / 16;
        }
        String hexCode = "";
        if (i == 2) {
            hexCode += hexaDeciNum[0];
            hexCode += hexaDeciNum[1];
        } else if (i == 1) {
            hexCode = "0";
            hexCode += hexaDeciNum[0];
        } else if (i == 0)
            hexCode = "00";
        return hexCode;
    }

    static String convertRGBtoHex(int R, int G, int B) {
        if ((R >= 0 && R <= 255)
                && (G >= 0 && G <= 255)
                && (B >= 0 && B <= 255)) {

            String hexCode = "#";
            hexCode += decToHexa(R);
            hexCode += decToHexa(G);
            hexCode += decToHexa(B);

            return hexCode;
        } else
            return "-1";
    }

    public void addProducts(Integer productCount) { //take num return array
        for (int i = 0; i < productCount; i++) {
            float r = rand.nextFloat();
            float g = rand.nextFloat();
            float b = rand.nextFloat();
            Color randomColor = new Color(r, g, b);
            String color = convertRGBtoHex(randomColor.getRed(), randomColor.getGreen(), randomColor.getBlue());
            System.out.println(color);
            products.add(new Product(i, color));
        }
    }

    public void addMachine(Machine machine) {
        machines.add(machine);
        threads.add(new Thread(machine, String.valueOf(machine.getNum())));
    }

    public void addQueue(BlockingQueue<Product> queue) {
        queues.add(queue);
    }

    // connects machine to a queue, true: from queue, false : to queue
    public void addLine(int machineNo, int queueNo, boolean direction) {
        if (direction) {
            machines.get(machineNo).setFromQueue(queues.get(queueNo));
        } else {
            machines.get(machineNo).setToQueue(queues.get(queueNo));
        }
    }

    public Queue<Product> getProducts(int queueNo) {
        List<Product> products = new ArrayList<>();
        return queues.get(queueNo).getQueue();
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

    public Unit getUnit() {
        /*List<String> machines = new ArrayList<>();
        List<Queue<Product>> queues = new ArrayList<>();
        for(int i = 0; i < this.machines.size(); i++) {
            machines.add(this.machines.get(i).getCurrentProduct().getColor());
        }
        for(int i = 0; i < this.queues.size(); i++) {
            queues.add(this.queues.get(i).getQueue());
        }*/
        unit.setMachines(machines);
        unit.setQueues(queues);
        return unit;
    }

    public List<Memento> getMemento() {
        return CareTaker.getInstance().getMementoList();
    }

    public List<Long> getTime() {
        return CareTaker.getInstance().getTime();
    }
}
