import packageInfo from '../../package.json';

export const environment = {
  appVersion: packageInfo.version,
  production: true,
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
  company: "TWINOVA",
  key: "jmAdiutoNav2024",
  mock: false

  
  // appVersion: packageInfo.version,
  // production: true,
  // clientUrl: "http://localhost:8080/",
  // serverUrl: "http://localhost:8080/",
  // urlFolder: "",
  // serverUrlApi: "/api/",
  // serverUrlApiOData: "/OData/Company('TWINPACK')/",
  // serverUrlApiSoap: "/WS/TWINPACK/Codeunit/",
  // clientUrlApp: "app/",
  // clientPort: "",
  // serverPortOData: ":7068/",
  // serverPortSoap: ":7067/",
  // redirecTo: "http://localhost:8080/",
  // navAutorization: "VE9URU06T3NpcmlkZTIwMjYh",
  // company: "TWINPACK",
  // key: "jmAdiutoNav2024",
  // mock: false
};

