package com.example.ProducerConsumer.model;

public interface Observable {
    void attach(Observer observer);

    void detach(Observer observer);

    void notifyObservers();

    boolean getState();
}
