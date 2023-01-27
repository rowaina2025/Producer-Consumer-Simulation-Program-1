package com.example.ProducerConsumer.snap_shot;

import java.util.ArrayList;
import java.util.List;

public class CareTaker {
    private List<Memento> mementoList;
    private List<Long> time;
    private static CareTaker careTaker;
    private long prevTime;
    private long startTime;

    private CareTaker() {
        prevTime = 0;
        mementoList = new ArrayList<>();
        time = new ArrayList<>();
        startTime = System.currentTimeMillis();
    }

    public static CareTaker getInstance() {
        if (careTaker == null)
            careTaker = new CareTaker();
        return careTaker;
    }

    public void add(Memento state) {
        long currTime = System.currentTimeMillis();
        if (prevTime == 0) {
            time.add(0L);
        } else {
            time.add(currTime - prevTime + 500);
        }
        prevTime = currTime;
        mementoList.add(state);
    }

    public Memento get(int index) {
        return mementoList.get(index);
    }

    public List<Memento> getMementoList() {
        return mementoList;
    }

    public List<Long> getTime() {
        return time;
    }

    public void clear() {
        careTaker = null;
    }
}
