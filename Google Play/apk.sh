mkdir temp
mv css temp
mv img temp
mv js temp
mv index.html temp
cordova create bouncypup co.edu.upb.bouncypup BouncyPup
mv bouncypup/* ./
rm -rf bouncypup
rm -rf ./www/*
mv ./temp/* ./www/
rm -rf temp
cordova platform add android
