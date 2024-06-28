// fn main() {
//     // let mut v: Vec<i32> = Vec::new();
//     // v.push(10);

//     // let v = vec![10];

//     // print!("{}", &v[2])
//     let mut v = vec![100, 32, 57];

//     // let x = &v[2];

//     // for i in &mut v {
//     //     print!("{} \n", x);
//     //     *i += 50;
//     // }

//     // let x = &v[2];

//     for i in 0..3 {
//         print!("{} \t", v[i]);
//         v[i] = v[i] + 10;
//     }

//     for i in 0..3 {
//         print!("{} \t", v[i]);
//     }

//     // v.push(6);

//     // println!("The first element is: {_first}");
// }

use std::env;

fn hello() {
    panic!("Hello")
}
fn main() {
    env::set_var("RUST_BACKTRACE", "full");
    hello()
}
