@echo off
echo ========================================================
echo Deploying Mohamed Fazil J Portfolio to GitHub Pages...
echo ========================================================

git remote remove origin 2>nul
git remote add origin https://github.com/J-Mohamed-Fazil/J-Mohamed-Fazil.github.io.git
git branch -M main
git push -u origin main

echo.
echo ========================================================
echo Done! If push succeeded, your site will be live at:
echo https://j-mohamed-fazil.github.io
echo ========================================================
pause
