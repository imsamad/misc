## Error Handling

- As error are facts in life and software, in programming we required to acknowledge the posiibilty of an error and take some action.

- Rust divide them into 2 categories

1. Recoverable
2. Unrecoverable

### Recoverable errors

- Example file not found errors they handling involve inform/report to the user and retry the operation.

### Unrecoverable errors

- They are symptoms of bugs.
- Example accessing element beyond the index in an array, here we have to stop the program immediatley.

### Ways to hadle them

1. panic! - Macro
2. Result<T, E>

### **panic!** macro

- It is like throwing an error.
- When it is called it have either of two behaviours associated with it.

1. Unwinding stacks - default behavious
2. Abort

#### Unwinding stacks

- Printing the message
- It is cleaning the memory by popping the stack frame off from stack, and with this clean up the memory allocated to each funciton.
- Quit

#### Abort

- In this case, program is halted and OS clean up the memory.

- Include following in TOML file

```rust
[profile.release]
panic = 'abort'
```

- It make the final binary build small, Unwinding code will not be included.

### Printing of message - Backtracing

- As panic in unwinding mode, print the stack trace, which allow to spot the exact line where the panic occurs.
- Keep reading the from top, till u got to the spot called the panic macro.
