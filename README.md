## Nuland App

Nuland App is a frontend application based on React-Native framework. To run App while in development you need to download and install Android Studio. Choose a "Custom" setup when prompted to select an installation type. Check:

```
Android SDK
Android SDK Platform
Android Virtual Device
```

Full guide [is here](https://facebook.github.io/react-native/docs/getting-started.html).

Set your device in development mode, follow instructions and enable all needed options to install apps on your device.

To instantiate App on device follow

```
npm run start-dev
```

In another console you should run

```
npm run build
```

After compile complete you may close first console. Then run

```
run android
```

Now App is running on your device.
To debug open developer console on http://localhost:8081/debugger-ui/, shake your device to use debug menu, set Debug JS Remotely.
