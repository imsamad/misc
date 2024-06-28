package main

import (
	"fmt"
	"log"
	"net/http"
)

func formHandler(res http.ResponseWriter, req *http.Request) {
	fmt.Print(req.ParseForm())
	
	if err := req.ParseForm(); err != nil {
		fmt.Fprintf(res, "ParseForm() err: %v",err)
		return
	}

	if req.Method != "POST" {
		http.Error(res, "Method is not supported", http.StatusNotFound)
		return
	}

	fmt.Fprintf(res, "<h1>POST request successful!</h1>")

	name:= req.FormValue("name")
	pwd:= req.FormValue("pwd")

	if name == "" || pwd == "" {
		fmt.Fprintf(res,"what is this\n")
		fmt.Fprintf(res,"what is this \n")
	} else {
		fmt.Fprintf(res,"Name = %s \n",name )
		fmt.Fprintf(res,"Password = %s \n",pwd )
		
	}
}

func helloHandler(res http.ResponseWriter, req *http.Request) {
	if req.URL.Path != "/form"{
		http.Error(res, "404 not found", http.StatusNotFound)
		return
	}

	if req.Method != "GET" {
		http.Error(res, "Method is not supported", http.StatusNotFound)
		return
	}

	fmt.Fprintf(res, "helloHandler, Hi there, I love %s!", req.URL.Path[1:])
}

func main() {
  fileServer := http.FileServer(http.Dir("./static"))  

	http.HandleFunc("/form", formHandler)
	http.HandleFunc("/hello", helloHandler)

	http.Handle("/",fileServer)

	if err :=	http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}

	fmt.Println("Server is on 8080")
}