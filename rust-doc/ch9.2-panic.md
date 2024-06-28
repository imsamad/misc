## Recoverable errors

- Therse are types of error, where it is not wise to halt the programs if these occurs.

#### Result generic

```rust
enum Result<T, E> {
  Ok(T),
  Err(E)
}

```

T - Type of value return in case of success.
E - Type of value return in case of error.
