#include <bits/stdc++.h>
using namespace std;
class Node {
  public:
  int data;
  Node * next;

  Node(int _data = 0, Node * _next = NULL) {
    next = _next;
    data = _data;
  }
};

struct Smaller {
  bool operator()(Node *n1, Node *n2) {
      return n1 -> data < n2 -> data;
  }
};

int main() {
  priority_queue<Node*, vector<Node*>, Smaller> pq;

  pq.push(new Node(-3));
  pq.push(new Node(1));
  pq.push(new Node(4));
  pq.push(new Node(2));  

  while(!pq.empty()) {
    cout << pq.top() -> data << endl;
    pq.pop();
  }



  return 0;
}