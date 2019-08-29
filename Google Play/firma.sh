cordova build android --release
mkdir temporal
mv BouncyPup.keystore temporal
mv platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk temporal
cd temporal/
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore BouncyPup.keystore app-release-unsigned.apk BouncyPup
zipalign -v 4 app-release-unsigned.apk bouncypup.apk

