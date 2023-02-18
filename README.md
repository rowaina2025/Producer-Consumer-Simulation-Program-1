# Producer-Consumer-Simulation-Program
### + A project generated by Angular CLI version 14.2.10 for frontend and Springboot version 3.0.2 for backend.
## Project
- It was required to graphically implement Qs and Ms, connect them via UI arbitrarily, The input (products arriving at Q0 to get processed) has a random input rate, Each M has a random service time and can serve one product at a time. Once completed, it needs to check the queue if waiting products need to be consumed, if not then it needs to register itself to the queue as ready.
- Each machine is running and processing its products on a separate thread different from other machines’ processing threads. The UI shows the simulation by displaying the number of elements in the Qs in real time.

## Design patterns applied
1. **Concurrency: “ Producer/Consumer DP”**
* Each machine runs on a separate thread consuming products from a queue such that if the queue is empty, it waits, otherwise it takes a product from the queue and processes it for its service time.
2. **Observer:**
* Each machine is an observer which observes the queues -observable- it consumes its products from.
* When the queue is empty, it registers itself to the queue as an observer and waits for notification.
* When the queue contains elements, it notifies its observers so they can consume them.
3. **Snapshot:**
* System keeps states of its machines and queues once updated so we can replay the whole simulation again.
* A Memento class saves the state of the machine and the queue.
* An Originator class to save the states.
* A CareTaker class to retrieve the state.
4. **Singleton:**
* CareTaker class implements singleton to have only one instance of it.
## Design Decisions:
- User should specify the total number of products at the beginning.
- User can’t connect 2 queues or 2 machines together.
- Each machine has only one destination queue.
- A machine can’t be either the source or the final destination of the unit.
- Products have random input rate (5 seconds maximum).
- Each machine has random service time (5 seconds maximum).
## UML class diagram
### Backend:
[![image](https://www.linkpicture.com/q/backPC.png)](https://www.linkpicture.com/view.php?img=LPic63f15cc67d7cb56495466)
### Frontend:
[![image](https://www.linkpicture.com/q/frontPC.png)](https://www.linkpicture.com/view.php?img=LPic63f15ceef3080109415909)
## User manual to run the code
+ In **cmd** cd to **backend folder** and run ./mvnw spring-boot: run or by opening the folder with java IDE then run the main file ProducerConsumerApplication.java
+ Open **frontend folder** and open new terminal then type **ng serve** and navigate to this link http://localhost:4200/
## Program UI
## User Guide
[Project Overview](#Project)
