go mod init project_name

go get package_url

### Init workspace

go work init ./hello
The go command produces a go.work file that looks like this:

```sh
go 1.18

use ./hello
```

The go work init command tells go to create a go.work file for a workspace containing the modules in the ./hello directory.

The use directive tells Go that the module in the hello directory should be main modules when doing a build.

The Go command includes all the modules in the workspace as main modules.

This allows us to refer to a package in the module, even outside the module. Running the go run command outside the module or the workspace would result in an error because the go command wouldn’t know which modules to use.
