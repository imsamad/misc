#include <bits/stdc++.h>
using namespace std;

string calc(int num) {
  int tmp = 1;
  int resu = 1;

  while(num > 0) {
    resu = tmp * num % 2

    num = floor(num / 2);
  }

  return res;
}

int main() {

  for(int i = 0; i < 100; i++)
    cout << i <<" = "<< calc(i) << endl;
  return 0;
}