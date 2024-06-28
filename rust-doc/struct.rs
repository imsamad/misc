struct User {
    _name: String,
    _active: bool,
}

fn main() {
    let _user1 = User {
        _name: String::from("Abdus Samad"),
        _active: true,
    };

    let _user2 = User {
        _name: String::from("@WWWAbdus Samad"),
        // _active: true,
        .._user1
    };

    print!("{} \n", _user1._name);

    print!("{} \n", _user1._active);

    print!("{} \n", _user2._name);

    print!("{} \n", _user2._active);

    // println!("{} \n", build_user()._name);

    // fn build_user() -> User {
    //     User {
    //         _name: String::from("Abdus Samad"),
    //         _active: true,
    //     }
    // }
}
