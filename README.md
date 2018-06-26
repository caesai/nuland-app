# Nuland App

## Installation

Nuland App is a frontend application based on React-Native framework. To run App while in development you need to download and install Android Studio. Choose a "Custom" setup when prompted to select an installation type. Check:

```
Android SDK
Android SDK Platform
Android Virtual Device
```

Full guide [is here](https://facebook.github.io/react-native/docs/getting-started.html).

Also Java Development Kit needed to be installed. [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

Set your device in development mode, follow instructions and enable all needed options to install apps on your device.

To instantiate App on device follow

```
npm install
npm run start
```

In another console you should run

```
npm run android
```

Now App is running on your device.
To debug open developer console on http://localhost:8081/debugger-ui/, shake your device to use debug menu, set Debug JS Remotely.


## Repository structure

1. /android - Android project folder compiled
2. /ios - Ios project folder compiled
3. /src - sources
