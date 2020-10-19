import idb from './idb.js';
 
var dbPromise = idb.open("mydatabase", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("events")) {
      upgradeDb.createObjectStore("events");
    }
  });