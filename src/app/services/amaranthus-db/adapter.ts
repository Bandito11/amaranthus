import { Storage } from '@ionic/storage';

const directoryName = 'database';

const storage = new Storage({});

/**
 * A loki persistence adapter which persists to web browser's local storage object
 * @constructor IonicStorageAdapter
 */
export function IonicStorageAdapter() {}

/**
 * loadDatabase() - Load data from IonicStorage
 * @param {string} dbname - the name of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.loadDatabase = function loadDatabase(
  dbname,
  callback
) {
  storage.get(dbname).then((value) => {
    callback(value);
  });
};

/**
 * saveDatabase() - save data to IonicStorage, will throw an error if the file can't be saved
 * might want to expand this to avoid dataloss on partial save
 * @param {string} dbname - the filename of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.saveDatabase = async function saveDatabase(
  dbName,
  dbString,
  callback
) {
  storage.set(dbName, dbString).catch((error) => console.error(error));
  callback(null);
};

/**
 * deleteDatabase() - delete the database from IonicStorage, will throw an error if it
 * can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.deleteDatabase = async function deleteDatabase(
  dbName,
  callback
) {
  storage.remove(dbName).catch((error) => console.error(error));

  callback(null);
};
