var fs = require('fs-extra');
var path = require('path');

fs.copySync(path.resolve(__dirname, './patch/react-native-os/android/build.gradle'), path.resolve(__dirname, './node_modules/react-native-os/android/build.gradle'));
fs.copySync(path.resolve(__dirname, './patch/react-native-tcp/android/build.gradle'), path.resolve(__dirname, './node_modules/react-native-tcp/android/build.gradle'));