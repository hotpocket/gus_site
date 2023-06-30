#!/bin/sh

calc(){ 
  awk "BEGIN { print "$*" }"
}

for i in *;do 
  dim=`identify -format "%wx%h" $i 2>/dev/null`
  if [ $? -eq 0 ]; then
    aspect=$(calc $(echo $dim | sed 's/x/\//'))
    widescreen=$(calc 16/9)
    if [ "$aspect" != "$widescreen" ];then
      echo "$i is not 16:9(1.77778) it is $aspect"
    fi
  fi
done
