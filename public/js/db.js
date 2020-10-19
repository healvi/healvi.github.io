var dbPromised = idb.open("submisiion-2", 1, function(upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("klasemen", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
  });
  function saveForLater(team) {
    dbPromised
    .then(function(db) {
      console.log(team);
        var tx = db.transaction("klasemen", "readwrite");
        var store = tx.objectStore("klasemen");
        store.put(team);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }
  function DeleteForLater(team) {
    dbPromised
    .then(function(db) {
      console.log(team);
        var tx = db.transaction("klasemen", "readwrite");
        var store = tx.objectStore("klasemen");
        store.delete(team.id);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di dihapus.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("klasemen", "readonly");
          var store = tx.objectStore("klasemen");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }
  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
      .then(function(db) {
        var tx = db.transaction("klasemen", "readonly");
        var store = tx.objectStore("klasemen");
        let ida = Number(id)
          return store.get(ida);
        })
        .then(function(article) {
          resolve(article);
        });
    });
  }
  