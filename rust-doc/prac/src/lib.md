mod hotel {
    mod hosting {
        fn waiting() {
            print!("Waiting")
        }

        fn table() {
            print!("table")
        }
    }

    mod serve {
        fn waiting_serve() {
            print!("waiting_serve")
        }

        fn table_serve() {
            print!("table_serve")
        }
    }
}
