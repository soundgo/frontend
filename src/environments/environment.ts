// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  mapbox: {
    accessToken:
      'pk.eyJ1Ijoic291bmRnbyIsImEiOiJjanRlYmM5dXcxY2tqNGFwYzNrOGkwcngzIn0.aBKY-GfqDJRHrxP0e2Yc0Q',
  },
  firebase: {
    apiKey: 'AIzaSyDudfB7sZxukeUchgumVwyJMH22NCU52IY',
    authDomain: 'soundgo-ba26c.firebaseapp.com',
    databaseURL: 'https://soundgo-ba26c.firebaseio.com',
    projectId: 'soundgo-ba26c',
    storageBucket: 'soundgo-ba26c.appspot.com',
    messagingSenderId: '142660268569'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
