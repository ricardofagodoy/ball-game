rm -rf dist
rm -rf build
mkdir dist

npm run build

cp -r build dist
cp -r assets dist
cp manifest.json dist
cp index.html dist
