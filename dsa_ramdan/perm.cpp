#include <bits/stdc++.h>
using namespace std;

void perm(char str[], int n, int k) {
   static char res[20] = {0};

   static vector<bool> taken(n + 1, false);
   if(!str[k]) {
      cout << res << endl;
      return;
   }

   for(int i = 0; i <= n; i++) {
      if(!taken[i]) {
         res[k] = str[i];
         taken[i] = true;
         perm(str, n, k + 1);
         taken[i] = false;
      }
   }
}
char temp[3] = {0};

void perm1(char str[], int l, int h, int &times) {
   if(l == h) {
      times++;
      if(times == 2) {
        for(int i = 0; str[i]; i++) temp[i] = str[i];
   cout << "cjdk" << endl;
      }

      cout << str << endl;
   }  else {
      for(int i = l; i <= h; i++) {
         swap(str[i], str[l]);
         perm1(str, l + 1, h, times);
         swap(str[i], str[l]);
      }
   }
}

int main() {
char str[] = "abc";
char res[] = "";
int times = 0;
perm1(str, 0, 2, times);
cout << "temp = " << temp << endl;
return 0;
}