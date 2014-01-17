#!/usr/bin/env bash

DIR=$(dirname $0)
pushd $DIR > /dev/null

if [[ ! -d node_modules ]]; then
	echo 'Installing compiler tools...'
	sleep 1
	npm install
fi

echo 'Compiling bitconcat...'

node_modules/uglify-js/bin/uglifyjs bitconcat.js -o bitconcat.min.js

popd > /dev/null
echo 'Done!'
