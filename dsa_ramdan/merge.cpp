// C++ program to merge two sorted arrays with O(1) extra
// space.
#include <bits/stdc++.h>
using namespace std;

// Merge ar1[] and ar2[] with O(1) extra space
void merge(int ar1[], int ar2[], int m, int n) {

	// Iterate through all elements
	// of ar2[] starting from the last element
	for (int j = n - 1; j >= 0; j--) {
		// Find the smallest element greater than ar2[i].
		// Move all elements one position ahead till the
		// smallest greater element is not found */
		int i, last = ar1[m - 1];
		for (i = m - 2; i >= 0 && ar1[i] > ar2[j]; i--)
			ar1[i + 1] = ar1[i];

		// If there was a greater element
		if (last > ar2[j]) {
			ar1[i + 1] = ar2[j];
			ar2[j] = last;
		}
	}
}

// Driver code
int main()
{
	int ar1[] = { 1, 5, 9, 10, 15, 20 };
	int ar2[] = { 2, 3, 8, 13 };
	int m = sizeof(ar1) / sizeof(ar1[0]);
	int n = sizeof(ar2) / sizeof(ar2[0]);
	merge(ar1, ar2, m, n);

	cout << "After Merging \nFirst Array: ";
	for (int i = 0; i < m; i++)
		cout << ar1[i] << " ";
	cout << "\nSecond Array: ";
	for (int i = 0; i < n; i++)
		cout << ar2[i] << " ";
	return 0;
}
