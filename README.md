### Installing

Clone or download repo in your system from GitHub. After you unzipped the file, you should have the following folders:

```
.
├── README.md
├── config.xml
├── ionic.config.json
├── package-lock.json
├── package.json
├── resources
├── src
├── tsconfig.json
├── tslint.json
└── www
```

Make sure you have the latest NodeJS installed on your system.

- https://nodejs.org/en/download/

Make sure you have installed the Ionic CLI on your system by running below cmd:

```
npm install -g @ionic/cli
```

In your Ionic application directory:

1. Install the dependencies and platforms:

```
npm install
```

2. Run the application:

```
ionic serve
```

Additionally can install cordova to run project for native browser, ios simulator or android simulator.

```
npm install -g cordova
```

and then Run the application:

```
ionic cordova run browser
ionic cordova run android
ionic cordova run ios
```
