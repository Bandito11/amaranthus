import { Storage } from '@ionic/storage';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

const { Filesystem } = Plugins;
const directoryName = 'database';

const storage = new Storage({});


async function createLocalDirectory(opts: { dbName: string }) {
    try {
        await Filesystem.mkdir({
            path: directoryName,
            directory: FilesystemDirectory.Documents,
            recursive: false // like mkdir -p
        });
        return readLocalFile({ dbName: opts.dbName });
    } catch (e) {
        try {
            return readLocalFile({ dbName: opts.dbName });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

async function readLocalFile(opts: { dbName: string }) {
    try {
        const lokiDBContents = await Filesystem.readFile({
            path: `${directoryName}/${opts.dbName}.txt`,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        return lokiDBContents.data;
    } catch (error) {
        throw error;
    }

}



/**
 * A loki persistence adapter which persists to web browser's local storage object
 * @constructor IonicStorageAdapter
 */
export function IonicStorageAdapter() { }

/**
 * loadDatabase() - Load data from IonicStorage
 * @param {string} dbname - the name of the database to load
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.loadDatabase = function loadDatabase(dbname, callback) {
    try {
        createLocalDirectory({ dbName: dbname });
    } catch (error) {
        console.error(error);
    }
    storage
        .get(dbname)
        .then(value => {
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
IonicStorageAdapter.prototype.saveDatabase = async function saveDatabase(dbName, dbString, callback) {
    storage
        .set(dbName, dbString)
        .catch(error => console.error(error));
    if (navigator.userAgent.toLowerCase().match('android')) {
        try {
            await Filesystem.writeFile({
                path: `${directoryName}/${dbName}.txt`,
                data: dbString,
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
            });
            callback(null)
        } catch (error) {
            callback(error);
        }
    } else if (navigator.userAgent.toLowerCase().match('iphone') || navigator.userAgent.toLowerCase().match('ipad')) {
        try {
            await Filesystem.writeFile({
                path: `${directoryName}/${dbName}.txt`,
                data: dbString,
                directory: FilesystemDirectory.Documents,
                encoding: FilesystemEncoding.UTF8
            });
            callback(null)
        } catch (error) {
            callback(error);
        }
    }

    callback(null);
};

/**
 * deleteDatabase() - delete the database from IonicStorage, will throw an error if it
 * can't be deleted
 * @param {string} dbname - the filename of the database to delete
 * @param {function} callback - the callback to handle the result
 * @memberof IonicStorageAdapter
 */
IonicStorageAdapter.prototype.deleteDatabase = async function deleteDatabase(dbName, callback) {
    storage
        .remove(dbName)
        .catch(error => console.error(error));
    try {
        await Filesystem.deleteFile({
            path: `${directoryName}/${dbName}.txt`,
            directory: FilesystemDirectory.Documents
        });
        callback(null);
    } catch (error) {
        callback(error);
    }

    callback(null);
};
