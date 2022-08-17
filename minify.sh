#!/bin/bash

declare -a dirs
declare -a jsIndex
declare -a jsFiles

for i in $(ls -R public/script)
do
    if [ ${i: -1} == ":" ];
    then
        dirs+=($i)
    fi
    if [ "${i: -3}" == ".js" ];
    then
        jsIndex+=($(expr ${#dirs[@]} - 1))
        jsFiles+=($i)
    fi
done

for ((i = 0; i < ${#jsFiles[@]}; i++))
do
    fileDir=$(echo ${dirs[${jsIndex[$i]}]} | sed 's?:?/?g')
    file=${jsFiles[$i]}
    ./node_modules/.bin/minify $fileDir$file > ./dist/$fileDir$file
done