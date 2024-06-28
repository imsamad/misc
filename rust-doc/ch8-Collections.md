### Vector

```rust
let mut v = vec![100, 32, 57];

// let x = &v[2];

// Because for loop has reference to the vector,
// so borrow checker rule would apply accordingly.
for i in 0...3 {
    // Cannot borrow v as mutable it is already borrowed as immutable.
    print!("{} \n", v[i]);
    // *i += 50;
}
```
