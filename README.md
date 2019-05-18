This illustrates using ES6 modules with [now](https://zeit.co/now) in a mono-repo.

You can see the live-version [here](https://now-server-reload.dkonsumer.now.sh).

```
npm i          # install dev-tools
npm start      # run local, relaoding dev-server
npm run deploy # deploy on now.sh
```

The basic thing it shows it that `now` can handle merging all the sub-apps in this mono-repo into a single URL, both locally (with reloading) and on lambdas, deployed on the web.