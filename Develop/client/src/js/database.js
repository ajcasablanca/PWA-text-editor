import { openDB } from 'idb';

const initdb = async () => {
  try {
    const db = await openDB('jate', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('contact')) {
          const store = db.createObjectStore('contact', { keyPath: 'id', autoIncrement: true });
          console.log('contact object store created');
        }
      },
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

export const putDb = async (content) => {
  try {
    const db = await openDB('jate', 1);

    const tx = db.transaction('contact', 'readwrite');

    const store = tx.objectStore('contact');

    const request = store.add(content);

    const result = await request;
    console.log('Data saved to the database', result);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB('jate', 1);

    const tx = db.transaction('contact', 'readonly');

    const store = tx.objectStore('contact');

    const request = store.getAll();

    const result = await request;
    console.log('Data retrieved from the database', result);
    return result;
  } catch (error) {
    console.error('Error retrieving content from the database:', error);
    return [];
  }
};

initdb();
