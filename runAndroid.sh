npm run build

rm -rf cordova/www/*

cp -r build cordova/www
cp index.html cordova/www
cp -r assets cordova/www
cp -r styles cordova/www

cd cordova
cordova run android