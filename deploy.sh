#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# get new contents
git pull origin main

# get public contents
cd public
git pull origin main
cd ..

# index make
npm run index

# Build the project.
hugo --minify

# Go To Public folder, sub module commit
cd public
# Add changes to git.
git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin main --force

# Come Back up to the Project Root
cd ..


# blog 저장소 Commit & Push
git add .

msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git push origin main

