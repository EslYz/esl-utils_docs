#!/usr/bin/env sh

set -e
npm run doc:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:EslYz/web.git master:gh-pages