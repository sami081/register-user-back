// // Exemple de configuration pour Jest
// // Vous pouvez ajouter des configurations de mocks ou d'autres paramètres ici

// // Nettoyer les mocks après chaque test
// afterEach(() => {
//     jest.clearAllMocks();
//   });
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  await mongoose.connect(uri);
}, 10000); // Délai de 10 secondes

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
}, 10000); // Délai de 10 secondes
