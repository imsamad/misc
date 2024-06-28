### It is achived by using following feature:

1. Immutable
2. Heap and memory
3. Ownership model
4. Borrowing and refrences
5. Lifetimes

#### Immutable

By default every varibale is immutable which make them thread-safe, if all threads are reading the data then no synchronisation needed at time of concurrent access.

#### Stack and Heap

Stack is fixed size block over memory over which only primitive datat type are used store whose size are determsied at compile time.

- Allow for fast allocation and de-allocation.
- Whenever a function is called/invoked a stack frame is pushed into the stack, and then popped off once executed compeletely.

Heap - Memory block used to store data whose data can be chaged during runtime.

Allocation - Memory allocater find the empty spot on memory, mark it as being in use, and return the pointer, and untill the programm does not de-allocate that spot or free that spot, it remain in used.

Thats why stack is fast as compared to heap, because pushing on the stack is faster because as it would be at top of stack, while allocation on heap require demand more work as first finding the enough big space and then doing book-keeping for that founded block of memory.

Second accessing data on stack is faster compare to heap.

Because it is a two-step process, u have to follow pointer to get there.
And contemporary processor work faster if they have to jump around less.

Example vector, dynmaic array or strings.

#### Ownership

- It is unique memory management feature of RUST.
- It gaurantees memory safety without garbage collector.
- Set of rules with govern memory management. These rules are checked by compiler.
- If any of the rules is violated, source code would not be compiled.
- Originally it manage memory on heap, because most memory related problems occur due to imrpoperly managing of heap portion.

Related constructs

1. Borrowing
2. Slices
3. Rust layout in memory

### Problem with pointer in c

1. Uninitialsed pointer
2. Memory Leak
3. Dangling pointer

4. Uninitialsed pointer

Pointer was declared but not initialsed at all, despite that down the line in program if try to initialised value to that pointer.

2. Memory leak

Pointer was declared & initialised with block of free memory on heap, but not de-allocated.

Or not freeing the no-longer-used it lead to memory being occupied with un-necessary data.

3. Dangling pointer

Even after de-allocating the pointer, we try to access that pointer thinking data might be present at that pointer address.

#### Rules of ownership

1. Each value must have only and only 1 owner at a time.
2. When the owner gets out of scope, value will be dropped.
