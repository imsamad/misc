use create::lib;
fn main() {
    for i in 2..2000 {
        print!("{} ", fib(i))
    }
}

fn fib(num: i32) -> f64 {
    let mut res: f64 = 0.0;

    let mut f: f64 = 0.0;
    let mut s: f64 = 1.0;

    for _ in 2..num {
        res = f + s;

        f = s;
        s = res;
    }

    return res;
}
