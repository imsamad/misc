#include<bits/stdc++.h>
using namespace std;

class Stack {
    public:
    int size, front = -1;
    int *arr;

    Stack(int s) {
        size = s;
        front = -1;
        arr = new int[size];
    }

    void push(int val) {
        if(front < size)
            arr[++front]=val;
    }

    void pop() {
        if(front != -1)
            front--;
    }

    int top() {
        return front != -1 ? arr[front] : -1;
    }

    bool isEmpty() {
        return front == - 1 ? true : false;
    }

    bool isFull() {
        return front >= size - 1 ? true : false;
    }
};


int main() {
    Stack *st = new Stack(5);
    st -> push(10);
    st -> push(20);

    while(!st -> isEmpty()) {
        cout << st -> top() << endl;

        st -> pop();
    }
    return 0;
}