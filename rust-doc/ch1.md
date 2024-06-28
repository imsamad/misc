# Rust

It is an expression-based language.

## Installation

1. Install via curl command.
2. Install c compiler - To install linker which is used by Rust to join compiled outputs into a single file.
   And some Rust packages depends on C too.

### Less Commonly used CMDs although matters

```css
rustc --version
Output: rustc 1.78.0 (9b00956e5 2024-04-29)
Explanation: Version - (Latest commit hash - LTS commit date)

rustup update

rustup self uninstall

Local Doc
rustup doc

```

### Pure naked way

Code in .rs file
Compile it using rustc, like we do in C lang, by compiling using g++ or other compilers.

```sh
rustc main.rs && ./main
```

## Cargo - Rust build tool/system

Used to

- Build
- Manage/install/build deps

### Cargo related CMDs

```sh
- cargo new proj_name
- cargo build
- cargo build --release
- cargo run
- cargo check
```

#### Create end-user project

```sh
cargo new proj_name
```

Create proj_name folder and create Cargo.toml and .gitignore(if nor alreadt present) and src director.

Root dir is for TOML file, config file, License info, README and other files not directly related with coding.

Src directoty is solely for the source code files.

### Build cmd [dev vs prod]

cargo build compile the project and created an executable in taget/debug/prj_name

It is in debug because dev phase build in debug not optimised.

cargo build --release

for production purpose optimised build in /target/release/proj_name

These commands does not blinidly compiled if no change was made in the source files.

Instead skip the comipiling

### Testing the compilability

```css
cargo check
```

This command just check, whether the program is compilable or not, it does not create executables.

It is very handy to quickly test iteration before moving to next phase.

RUN curl -sSf https://sh.rustup.rs | bash -s -- -y

# RUN rustc --version

ENV PATH="/root/.cargo/bin:${PATH}"
