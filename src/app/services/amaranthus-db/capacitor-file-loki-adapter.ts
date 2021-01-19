import { Plugins, FilesystemDirectory, FilesystemEncoding } from "@capacitor/core";

const { Filesystem } = Plugins;
const directoryName = 'database';

export function CapacitorFileLokiAdapter() { }

CapacitorFileLokiAdapter.prototype.loadDatabase = async function (dbName: string, callback: Function) {
    try {
        callback(await createLocalDirectory({ dbName: dbName }));
    } catch (error) {
        callback(new Error(error));
    }
};

CapacitorFileLokiAdapter.prototype.saveDatabase = async function (dbName: string, dbString: string, callback: Function) {
    try {
        await Filesystem.writeFile({
            path: `${directoryName}/${dbName}.txt`,
            data: dbString,
            directory: FilesystemDirectory.Documents,
            encoding: FilesystemEncoding.UTF8
        });
        callback(null)
    } catch (error) {
        callback(new Error(error));
    }
};

CapacitorFileLokiAdapter.prototype.deleteDatabase = async function deleteDatabase(dbName: string, callback: Function) {
    try {
        await Filesystem.deleteFile({
            path: `${directoryName}/${dbName}.txt`,
            directory: FilesystemDirectory.Documents
        });
        callback(null);
    } catch (error) {
        callback(new Error(error));
    }
};


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
