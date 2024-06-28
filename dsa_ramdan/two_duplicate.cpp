#include <bits/stdc++.h>
using namespace std;

void printRepeating(int arr[], int size)
{
	int Xor = arr[0]; 
	int set_bit_no; 

	int i;
	int n = size - 2;
	int x = 0, y = 0;

	
	for (i = 1; i < size; i++)
		Xor ^= arr[i];
	
	for (i = 1; i <= n; i++)
		Xor ^= i;
		
	cout << Xor << endl;

	// cout << (~(Xor - 1)) << endl;

	set_bit_no = Xor & ~(Xor - 1);

	cout << "set_bit_no = " << set_bit_no << endl;

	for (i = 0; i < size; i++) {
		if (arr[i] & set_bit_no) {
			cout << "1. arr[" << i << "] = " << arr[i] << endl; 
			x = x ^ arr[i]; /*Xor of first set in arr[] */
		}
		else {
				cout << "2. arr[" << i << "] = " << arr[i] << endl; 
			y = y ^ arr[i]; /*Xor of second set in arr[] */
}	
}
cout << "x = " << x << endl;
cout << "y = " << y << endl;

	for (i = 1; i <= n; i++) {
		if (i & set_bit_no)
			x = x ^ i; /*Xor of first set in arr[] and {1,
						2, ...n }*/
		else
			y = y ^ i; /*Xor of second set in arr[] and {1,
						2, ...n } */
	}

	cout << "Repeating elements are " << y << " " << x;
}

// Driver code
int main()
{
	int arr[] = { 4, 3, 4, 5, 2, 3, 1 };
	int arr_size = sizeof(arr) / sizeof(arr[0]);
	for(int i = 0; i < arr_size; i++) cout << arr[i] << " ";
	// cout << ( 4 ^ 4 ^ 5 ^ 1) << endl;
	cout << endl;
	printRepeating(arr, arr_size);
	return 0;
}

// This code is contributed by rathbhupendra
