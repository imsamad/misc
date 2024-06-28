## Why?

1. Type safe
2. Memory management
3. Concurrency
4. Fast

### Extensions

1. rust-analyer
2. CodedLLDB
3. Toml parser
4. Even beter TOML
### Commands4.

##### cargo build

##### cargo build --release

##### cargo init

##### cargo init --lib

Generate library - which differ from end-user application in the sense that librar can not run independenty on its owm.

###### cargo run

###### cargo run -q = in quite mode

Compiler can only do static analysis at compile time, and give overflow errors.

But does not have power to analyse runtime logic, and then detect runtime overflow.
