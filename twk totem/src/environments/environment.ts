// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: false,
  clientUrl: "http://192.168.0.141",
  serverUrl: "http://192.168.0.141",
  urlFolder: "NAVWS_DEV/publish",
  serverUrlApi: "/api/",
  serverUrlApiOData: "/OData/Company('TWINPACK')/",
  serverUrlApiSoap: "/WS/TWINPACK/Codeunit/",
  clientUrlApp: "app/",
  clientPort: "",
  serverPortOData: ":7068/",
  serverPortSoap: ":7067/",
  redirecTo: "http://tpnav18app.twinpack.local/",
  navAutorization: "VE9URU06T3NpcmlkZTIwMjYh",
  company: "TWINPACK",
  key: "jmAdiutoNav2024",
  mock: false

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
