npm run build



rm -rf cordova/www/*

cp -r build cordova/www
cp index.html cordova/www
cp -r assets cordova/www
cp manifest.json cordova/www

cd cordova

cordova platforms add android
cordova build android
