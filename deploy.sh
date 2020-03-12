#!/bin/bash

set -e

npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://e.coding.net/zhamao-robot/zhamao-framework-pages.git master

scp -r ./* root@crazywhale.cn:/var/www/framework-docs/

cd -
