// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // serverIp: 'https://api.dreamhousie.com/',
  serverIp: 'http://localhost:3002/',
  production: false,
  envName: 'production',
  appName: 'housie',
  // host: 'http://35.154.140.92:3002/admin/'

    //host: 'http://192.168.0.94:3002/api/admin/'

  // host: 'http://3.109.48.128:3002/api/admin/'
  // host: 'https://api.dreamhousie.com/api/admin/'
  host: 'http://localhost:3002/api/admin/'
};

/* 3.111.94.238
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
