package greetings

import (
	"fmt"

	"golang.org/x/example/hello/reverse"
)

func What(s string) {
    fmt.Println(reverse.String(s))
}