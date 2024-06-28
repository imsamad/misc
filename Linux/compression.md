## Compression

Have various tools like

1. gzip
2. bzip2
3. tar - Used to compressed or archive the entire folder, it retain the directory structure intact.

### gzip

- Shortcut to remember them is gzip is comprssion, if we pass -d it would do opposite.

#### Variants of gzip for compression and decompression of files

```sh
gzip file.txt
# output - file.txt.gz

gzip -d file.txt.gz
# output - file.txt

# For Compression but kept the original file back
gzip -c file.txt >> file.txt.gz

# For De-Compression but kept the original file back
gzip -c -d file.txt.gz >> file.txt

# with custom compression ratio - default is 6
gzip -c -9 hello.txt >> hello.txt.gz
```

#### List out compressed file info

```sh
#For information of compressed files
gzip -l file.txt.gz
```

#### Read compressed file info

```sh
#For information of compressed files
gzip -c -d file.txt.gz
# OR
zcat file.txt.gz

# In case of directory, it will spit out the content of all files

```

### bzip2

- Replace gzip with bzip2
- zcat -> bzcat

### tar

##### compression

```bash
tar czvfp dir.tar dir
c - create
z - gzip compression | j - to use bzip2
v - verbose
f - name of the file we have to pass
p - preserve user permssion
```

##### de-compression

```bash
tar xzvf dir.tar dir
x - expand
z - gzip compression | j - to use bzip2
v - verbose
f - name of the file we have to pass
```

##### List out

```bash
tar tvf dir.tar
t - list out
v - verbose
f - name of the file we have to pass
```
