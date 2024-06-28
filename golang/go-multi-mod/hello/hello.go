package main

import (
	"fmt"

	"example.org/greetings"
	"golang.org/x/example/hello/reverse"
)

func main() {
	greetings.What("csdjkcn")
	fmt.Println(reverse.String("Hello"), reverse.Int(24601))

	fmt.Println(reverse.String("Hello"))
}