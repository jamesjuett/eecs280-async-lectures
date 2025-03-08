#!/bin/bash

# find typescript sources
# each will be of this format: ./lectures/lecture21/src/list_max.ts
SOURCES=$(find -wholename "./lectures/*src/*.ts" | sort)

cd lectures

# iterate over sources
for SOURCE in $SOURCES
do
  echo $SOURCE

  # split source based on '/' and extract 2nd element
  LECTURE_DIR=$(echo $SOURCE | cut -d'/' -f3)
  
  # get file and remove .ts extension
  FILE=$(echo $SOURCE | cut -d'/' -f5 | cut -d'.' -f1)

  cd $LECTURE_DIR
  npx webpack ./src/$FILE.ts --config ../../lobster/webpack.config.js
  mv assets/main.html assets/$FILE.html
  mv assets/main.js assets/$FILE.js
  sed -i "s/main\.js/$FILE\.js/" assets/$FILE.html
  cd ..

done

cd ..