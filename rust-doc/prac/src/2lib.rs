mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {
            println!("Hello, world! 2");
        }
    }
}

pub fn main_2() {
    // waiting();

    crate::front_of_house::hosting::add_to_waitlist();
    println!("Hello, world!");
}
