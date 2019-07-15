rm -rf dist/
rm -rf build/
rm -rf cordova/www/*

mkdir dist

npm run build

mv bundle.js dist/

cp -r assets dist
cp manifest.json dist
cp index.html dist

npm run createsw

cp -r dist/* cordova/www