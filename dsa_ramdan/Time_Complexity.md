```cpp
for(int i = 0; i < n; i++)
 cout << "hello";
```

```cpp
for(int i = 0; i < n; i+=2)
 cout << "hello";
```

```cpp
for(int i = 0; i < n; i+=5)
 cout << "hello";
```

```cpp
for(int i = 0; i < n; i++)
  for(int j = 0; j < n; j++)
 cout << "hello";
```

```cpp
for(int i = 0; i < n; i++)
  for(int j = 0; j < i; j++)
 cout << "hello";
```

```cpp
int p = 0;
for(int i = 0; p < n; i++)
 cout << "hello";
```

```cpp
for(int i = 1; i < n; i*=2)
 cout << "hello";
```

```cpp
for(int i = n; i >= 1; i/=2)
 cout << "hello";
```

```cpp
for(int i = n; i >= 1; i/=3)
 cout << "hello";
```

```cpp
for(int i = n; i >= 1; i/=5)
 cout << "hello";
```

```cpp
for(int i = 1; i * i < n; i++)

// i * i < n
// o(n^1/2)

```

```cpp
int p = 1;
for(int i = 1; i < n; i*=2){ p++;}

for(int j = 1; j < p; j*=2){

}

// log (log n)
```

```cpp

for(int  i = 0; i < n; i++)
  for(int j = 1; j < n; j*2)
    //
// actual is 2nlogn + n, but highest term is
// nlogn
```

If by just have a glance at algorithm time complexity function is obvious, otherwise have to study it thoroughly.
