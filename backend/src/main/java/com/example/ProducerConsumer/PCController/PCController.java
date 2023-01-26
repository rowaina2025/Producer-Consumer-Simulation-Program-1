package com.example.ProducerConsumer.PCController;

import com.example.ProducerConsumer.model.BlockingQueue;
import com.example.ProducerConsumer.model.Machine;
import com.example.ProducerConsumer.model.Product;
import com.example.ProducerConsumer.service.PCService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin()
@RequestMapping("/producerConsumer")
public class PCController {
    @Autowired
    PCService service = new PCService();

    @GetMapping("/addMachine")
    public int addMachine(@RequestParam int num) {
        Machine machine = new Machine(num, new BlockingQueue<>(0), new BlockingQueue<>(0));
        service.addMachine(machine);
        return machine.getTime();
    }

    @GetMapping("/addProducer")
    public void addProduct(@RequestParam int num) {
        service.addQueue(new BlockingQueue(num));
    }

    @GetMapping("/addProducts")
    public void initiatProducts(@RequestBody int productCount) {
        service.addProducts(productCount);
    }

    @GetMapping("/addLine")
    public void addLine(@RequestParam int machineFrom,
                        @RequestParam int producerTo,
                        @RequestParam boolean direction) {
        service.addLine(machineFrom, producerTo, direction);
    }



}