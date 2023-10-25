import { useEffect, useState } from 'react';

interface DbObject {
  key: string;
  data: File;
}

const DB_NAME = 'models3dDB';
const STORE_NAME = 'myStore'; // merchantID or something

function useIndexedDB() {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    // Open the database when the component mounts
    const openDB = async () => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'key' });
        }
      };

      request.onsuccess = (event) => {
        const db = request.result;
        setDb(db);
      };

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', request.error);
      };
    };

    openDB();
  }, []);

  const getObject = async (url: string) => {
    return new Promise<DbObject | undefined>((resolve, reject) => {
      if (!db) {
        reject('Database not opened yet');
        return;
      }

      const transaction = db.transaction(STORE_NAME, 'readonly');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.get(url);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject('Error getting object from IndexedDB');
      };
    });
  };

  const addObject = async (url: string, data: Blob) => {
    return new Promise<void>((resolve, reject) => {
      if (!db) {
        reject('Database not opened yet');
        return;
      }

      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.add({ key: url, data });

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (err) => {
        reject(err/* 'Error adding object to IndexedDB' */);
      };
    });
  };

  const deleteObject = async (url: string) => {
    return new Promise<void>((resolve, reject) => {
      if (!db) {
        reject('Database not opened yet');
        return;
      }

      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const objectStore = transaction.objectStore(STORE_NAME);
      const request = objectStore.delete(url);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject('Error deleting object from IndexedDB');
      };
    });
  };

  return {db, getObject, addObject, deleteObject };
}

export default useIndexedDB;