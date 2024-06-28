#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;
#include <bits/stdc++.h>
using namespace std;

int main() {

  return 0;
}
  
// Function to fill the sieve with prime information
void fillSieves(vector<bool>& sieve, vector<int>& primeCount) {
    int n = sieve.size();
    sieve[0] = sieve[1] = false; // 0 and 1 are not prime numbers
    
    for(int i = 2; i * i < n; i++)
      if(sieve[i])
        for(int j = i * i; j < n; j += i)
          sieve[j] = false;
        
    
    // Fill primeCount with the number of primes up to each index
    cout << "Sive table" << endl;
    for(int i = 0; i < n; i++) {
      cout << sieve[i] << " ";

      if(i > 0 && i % 10 == 0) cout << endl;
    }

    for(int i = 2; i < n; i++) 
        primeCount[i] = primeCount[i-1] + (sieve[i] ? 1 : 0);
    
    cout << "Prime count table" << endl;

    for(int i = 0; i < n; i++) {
      if(i > 0 && i % 10 == 0) cout << endl;
      cout << primeCount[i] << " ";
    }
}

// Function to count primes in the range (a, b) using prefix sums
int count_primes(int a, int b, const vector<int>& primeCount) {
    return primeCount[b-1] - primeCount[a];
}

int main() {
    int tests;
    std::cin >> tests;

    vector<pair<int, int>> queries(tests);
    int a, b;
    int maxi = 0;

    for(int i = 0; i < tests; i++) {
        std::cin >> a >> b;
        queries[i] = make_pair(a, b);
        maxi = max(maxi, max(a, b));
    }

    vector<bool> sieve(maxi + 1, true);
    
    vector<int> primeCount(maxi + 1, 0);

    fillSieves(sieve, primeCount);

    for(auto q : queries) {
        cout << count_primes(q.first, q.second, primeCount) << endl;
    }

    return 0;
}
