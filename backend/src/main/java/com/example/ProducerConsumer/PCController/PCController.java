package com.example.ProducerConsumer.PCController;

import com.example.ProducerConsumer.model.BlockingQueue;
import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Product;
import com.example.ProducerConsumer.model.Unit;
import com.example.ProducerConsumer.service.PCService;
import com.example.ProducerConsumer.snap_shot.Memento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Queue;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/producerConsumer")
public class PCController {
    @Autowired
    PCService service = new PCService();

    boolean firstRun = true;

    @GetMapping("/addMachine")
    public int addMachine(@RequestParam int num) {
        Machine machine = new Machine(num);
        System.out.println("machine worked");
        service.addMachine(machine);
        return machine.getTime();
    }

    @GetMapping("/addProducer")
    public void addProduct(@RequestParam int num) {
        System.out.println("producer worked");
        service.addQueue(new BlockingQueue(num));
    }

    @GetMapping("/addProducts")
    public void initiatProducts(@RequestParam int productCount) {
        System.out.println("product added");
        service.addProducts(productCount);
    }

    @GetMapping("/addLine")
    public void addLine(@RequestParam int machineFrom,
                        @RequestParam int producerTo,
                        @RequestParam boolean direction) {
        System.out.println("Line worked");
        service.addLine(machineFrom, producerTo, direction);
    }

    @GetMapping("/getUnit")
    public Unit getUnit() {
        if (firstRun)
            service.start();
        firstRun = false;
        return service.getUnit();
    }

    @GetMapping("/getQueueProduct")
    public Queue<Product> getQueueProducts(@RequestParam int queueNo) {
        return service.getProducts(queueNo);
    }

    @GetMapping("/getMemento")
    public List<Memento> getMemento() {
        return service.getMemento();
    }

    @GetMapping("/getTime")
    public List<Long> getTime() {
        return service.getTime();
    }

    @GetMapping("/clear")
    public void clear() {
        service.clear();
    }
}
