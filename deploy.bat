@echo "Deploying updates to GitHub"
@echo off

@echo "Get Refresh Contents"
git pull origin main

@echo "Get public Contents"
cd public
git pull origin main
cd ..

@echo "Index"
@call npm run index

@echo "Build the project."
hugo --minify

@echo "Go To Public folder, sub module commit"
cd public

@echo "Add changes to git."
git add .

@echo "Commit changes."
SET MSG="rebuilding site %DATE%"

git commit -m %MSG%

@echo "Push source and build repos."
git push origin main --force

@echo "Come Back up to the Project Root"
cd ..

@echo "Contents source Commit & Push"
git add .

@echo "Commit changes."
git commit -m %MSG%

@echo "git push"
git push origin main
