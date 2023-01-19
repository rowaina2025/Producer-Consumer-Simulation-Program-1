package com.example.ProducerConsumer.snap_shot;

import com.example.ProducerConsumer.model.Machine;

public class Memento {
    private Machine state;

    public Memento(Machine state) {
        this.state = state;
    }

    public Machine getState() {
        return state;
    }
}
