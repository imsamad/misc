#include <bits/stdc++.h>
#include <iterator>
using namespace std;

long long maxSubarraySum(int arr[], int n){      
   long long res = INT_MIN, maxi = 0;

   for(int i = 0; i < n; i++) {
      maxi = arr[i] + maxi;
      res = max(res, maxi);
      maxi = (0, maxi);
   }

   return res;
}

int main() {
   vector<int> he = {1,2,3,4,5,6};
   
   
   for(int x:he) 
      cout << x << endl;   

   // int arr[] = {-10,-2,-3,-4};
   // cout << maxSubarraySum(arr, 4) << endl;
   return 0;
}