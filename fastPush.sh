#!/bin/bash

echo "adding"
git add .
echo "finish adding"
echo "_______________________________________________"
echo "finish committing"
git commit -m "fast push to github using shell"
echo "commit"
echo "_______________________________________________"
echo "pushing"
git push
echo "finish push"
echo "_______________________________________________"
echo "showing logs"
git log -n 1
