#include <bits/stdc++.h>
using namespace std;

int findpair(int arr[], int low, int high, int tgt, int val) {
  // cout << tgt << endl;
  int count = 0;
  int i = low, j = high;

  while(i < j) {
    if((arr[i] + arr[j]) == tgt) {
      i++, j--;
      cout <<val << " " << arr[i] << " " << arr[j] << endl;
      count++;
    } else if((arr[i] + arr[j]) < tgt) i++;
    else j--;
  }

  return count;
}

int main() {
  int arr[] =  { -1, -1, 0, 1, 2, 4};
  // (0 1) -1

  // (1 0) -1

  int size = sizeof(arr) / sizeof(arr[0]);

  int tgt = 0;

  for(int i = 0; i < size; i++) {
    
    findpair(arr, i + 1, size - 1, tgt - arr[i], arr[i]);
  }

  return 0;
}