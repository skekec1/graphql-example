import { Low, JSONFile } from 'lowdb'
import crypto from 'crypto';

const db = new Low(new JSONFile('file.json'))
await db.read()

// If file.json doesn't exist, db.data will be null
// Set default data
// db.data = db.data || { posts: [] } // Node < v15.x
db.data ||= {
  posts: [],
  authors: [],
  skills: []
};

await db.write()

export const createAsset = async (data, type) => {
  await db.read();
  const asset = {
    id: crypto.randomUUID(),
    ...data
  };
  db.data[type].push(asset);
  await db.write();

  return asset;
}

export const getAssetsByType = async (type, resolvers) => {
  await db.read();

  let data = [...db.data[type]]

  if (resolvers) {
    data = data.map(e => {
      const resolved = Object.entries(resolvers).reduce((acc, [sourceAttribute, targetType]) => {
        const information = e[sourceAttribute];

        if (!information) return acc;

        if (Array.isArray(information)) {
          return { ...acc, [sourceAttribute]: db.data[targetType].filter(x => information.includes(x.id)) }
        }

        return { ...acc, [sourceAttribute]: db.data[targetType].find(x => x === information) };
      }, {});

      return { ...e, ...resolved };
    })
  }
  return data;
}


export default db;
