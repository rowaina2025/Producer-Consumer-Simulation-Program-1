package com.example.ProducerConsumer.snap_shot;

import java.util.ArrayList;
import java.util.List;

public class CareTaker {
    private List<Memento> memntoList = new ArrayList<Memento>();

    public void add(Memento state) {
        memntoList.add(state);
    }

    public Memento get(int index) {
        return memntoList.get(index);
    }

    public void clear() {
        memntoList.clear();
    }
}
