#include <bits/stdc++.h>
using namespace std;

/*
1
2 9 = [2,2]
3 8 10
4 7 11 14
5 6 12 13 15
*/
// 8 = [3,2]
void pattern3(int n) {
  for(int i = 1; i <= n; i++) {
    for(int j = i; j >= 1; j--) {
    int total = (n * (n + 1)) / 2 - ((n - j + 1) * ((n - j + 1) + 1)) / 2;

    if(j % 2 == 0) {
      cout << total   + n - i + 1 << " ";

    } else {
      cout << total + n - j + 1 << " ";
    }


    }
    cout << endl;
  }
}
void one(int n) {
  for(int i = n ; i >= 1; i--) {
    for(int j = 1; j <= n; j++) {
      if(i == j ) cout << "*";
      else cout << " ";
    }

    for(int j = n - 1; j >= 1; j--) {
      if(i == j) cout << "*";
      else cout << " ";
    }
    
    cout << endl;
  }

  for(int i = n - 1 ; i >= 1; i--) {
    for(int j = n; j >= 1; j--) {
      if(i == j) cout << "*";
      else cout << " ";
    }

    for(int j = 2; j <= n; j++) {
      if(i == j ) cout << "*";
      else cout << " ";
    }

  cout << endl;
  }
}

void printk(int n) {
  for(int i = n; i >= 1; i--) {
    for(int j = 1; j <= n; j++) {
      if(j == 1 || j == i) cout << "*";
      else cout << " ";
    }

    cout << endl;
  }

  for(int i = 2; i <= n; i++) {
    for(int j = 1; j <= n; j++) {
      if(j == 1 || j == i) cout << "*";
      else cout << " ";
    }

    cout << endl;
  }
}
// interface vs abstraction

// Object class

int main() {
  pattern3(5);
    return 0;
}