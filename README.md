# workout-plan-app
React Native client for workout plan project


### View blur issue

The view blur lib requires a lib that has problem to be installed. To solve we need to add ```jcenter()``` on  build.gradle:
```
allprojects {
    repositories {
        jcenter()
        mavenCentral()
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url("$rootDir/../node_modules/react-native/android")
        }
        maven {
            // Android JSC is installed from npm
            url("$rootDir/../node_modules/jsc-android/dist")
        }

        google()
        maven { url 'https://www.jitpack.io' }
    }
}
```