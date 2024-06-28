## Ownership

### Rules

1. There must be only one owner of any value stored in heap.
2. When the owner goes out of scope value will be dropped.

## Move

When a variable whose value is stored in heap, is assigned to another variable it original value moved to new variable and previous variable point to null. Because there must be only one owner at a time.

## Drop

When variable goes out of scope, RUST explicitly call drop to drop that varibale.

## scalar type

Usually primitive are exempted from this move behaviour because they are created in stack which are quick to copy.

Plus copy trait are implemented on type stored on stack, which them valid even after assigning to another varible.

At a time either copy or drop trait can be implemented.

Example

- Integers, Boolean, Character, Floating Point
- Tuple - If they contain values whose types are of above type.

### Return value and scope

- Below return value from hello return ownership back to str
- If we return the passing variable back to calling function, it would return same variable without changing its location on heap.

```rust
fn main() {
    let mut str = String::from("Hello from world");
    print!("{:?} \n", str.as_ptr());
    str = hello(str);
    print!("{:?} \n", str.as_ptr());
}

fn hello(str: String) -> String {
    print!("{:?} \n", str.as_ptr());

    str
}

```

### Refrences

- They are like pointer to variable but does not own that value, so actual value will not be dropped when ref go out of scope, plus they are not capable of mutate the value they are referring.

## Mutable refrences

Only one mutable ref can borrow a variable at a time and no immutable ref it occur also race condition.
Rules:

- If already borrowed a mutable ref, can not borrow other one.
- If already
- We can have multiple immutable ref

```rust
fn main() {
    let mut str = String::from("Hello from world");
    let _str_mut_ref1 = &mut str;
    print!("{} \n", _str_mut_ref1);
    // Here _str_mut_ref1 scope ends
    let _str_mut_ref2 = &mut str;
    print!("{} \n", _str_mut_ref2);
    // So compiler would deduce that _str_mut_ref2 will not be an error
}

```

##### Multiple immutable ref are allowed

```rust
fn main() {
  let mut str = String::from("Hello from world");
  let str_immut_ref1 = &str;
  let str_immut_ref2 = &str;
  let str_immut_ref3 = &str;
  // Valid
}
```

##### Multiple mutable ref not allowed.

```rust
fn main() {
  let mut str = String::from("Hello from world");
  let str_mut_ref1 = &mut str;
  let str_mut_ref2 = &mut str;

// This would not give any error during compilation.
// The moment we start interacting with it.

}
```

```rust
fn main() {
  let mut str = String::from("Hello from world");
  let str_mut_ref1 = &mut str;
   {
      let str_mut_ref2 = &mut str;
   }
  // Valid
}
```

##### Immutable and mutable ref not allowed at the same time within in a same scope

```rust
fn main() {
    let mut str = String::from("Hello world!");
    let str_mut_ref = &mut str;
    let str_immmut_ref = &str;
}
```

This is to prevent race condition.

It occur when

1. When two pointer trying to accessing the data concurrenylu, and one of them is writing.
2. And no synchronisation is in placed.
