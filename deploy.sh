#!/bin/bash

set -e

npm run docs:build

git add .
git commit -m "update Docs: "$1
git push origin master

cd docs/.vuepress/dist

php -r 'function changeDir($dirname)
{
    $dir = scandir($dirname);
    unset($dir[0], $dir[1]);
    foreach ($dir as $file) {
        if (is_dir($dirname . "/" . $file)) changeDir($dirname . "/" . $file);
        else {
            if (pathinfo($dirname . "/" . $file)["extension"] == "html") {
                $files = explode("\n", file_get_contents($dirname . "/" . $file));
                foreach ($files as $k => $v) if (trim($v) == "<head>") {
                    $files[$k] = "<head><script>\nvar _hmt = _hmt || [];\n(function() {\n  var hm = document.createElement(\"script\");\n  hm.src = \"https://hm.baidu.com/hm.js?cbe56eae2cca5fbda55b7a1a1a493870\";\n  var s = document.getElementsByTagName(\"script\")[0]; \n  s.parentNode.insertBefore(hm, s);\n})();\n</script>";
                    break;
                }
                file_put_contents($dirname."/".$file, implode("\n", $files));
                echo "成功添加统计 ".$dirname."/".$file."!".PHP_EOL;
            }
        }
    }
}
changeDir(".");'

git init
git add -A
git commit -m 'deploy'

git push -f https://e.coding.net/zhamao-robot/zhamao-framework-pages.git master

scp -r ./* root@crazywhale.cn:/var/www/framework-docs/

cd -
