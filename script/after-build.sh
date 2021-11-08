#! /bin/sh

git rev-parse --short HEAD > build/gitlog.txt
echo "export git log done"

tar -zcvf build.tar.gz build
echo "zip done"
