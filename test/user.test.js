// userController.test.js

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/userModels'); // Assurez-vous que le chemin est correct
const { modifyUser, deleteUser, getOneUser, getAllUsers, createUser } = require('../controllers/userControllers'); // Assurez-vous que le chemin est correct

const app = express();
app.use(express.json());
app.put('/users/:id', modifyUser);
app.delete('/users/:id', deleteUser);
app.get('/users/:id', getOneUser);
app.get('/users', getAllUsers)
app.post('/users', createUser);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.disconnect(); // Ajout de la déconnexion avant de se reconnecter
  await mongoose.connect(mongoServer.getUri(), {  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Nettoyer les collections avant chaque test
beforeEach(async () => {
  await User.deleteMany({});
});

describe('PUT /usersF/:id', () => {
  it('should update the user successfully', async () => {
    const user = new User({
      
      email: 'john.doe@example.com',
      city: 'Sample City',
      ZIPCode: '12345',
      adressName: 'tes',
      addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
      adressNumber: '123',
      dateOfBirth: "08/11/1987",
      phone: '1234567890',
      firstname: 'John',
      surname: 'Doe'
    });
    await user.save();

    const updatedData = { surname: 'Doe' };
    const response = await request(app)
      .put(`/users/${user._id}`)
      .send(updatedData);

    console.log('Response body:', response.body); // Log the response body

    expect(response.status).toBe(200);
    expect(response.body.surname).toBe('Doe');
  });

  it('should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const updatedData = { surname: 'Doe' };
    const response = await request(app)
      .put(`/users/${fakeId}`)
      .send(updatedData);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 500 on database error', async () => {
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const user = new User({
    
      email: 'unique.email@example.com', // Utilisez une adresse e-mail unique ici
      city: 'Sample City',
      ZIPCode: '12345',
      adressName: 'test',
      addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
      adressNumber: '123',
      dateOfBirth: "08/11/1987",
      phone: '1234567890',
      firstname: 'John',
      surname: 'Doe'
    });
    await user.save();

    const updatedData = { surname: 'Doe' };
    const response = await request(app)
      .put(`/users/${user._id}`)
      .send(updatedData);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error updating user');
    expect(response.body.error).toBe('Database error');
  });
});

describe('DELETE /users/:id', () => {
  it('should delete the user successfully', async () => {
    const user = new User({
    
      email: 'john.doe@example.com',
      city: 'Sample City',
      ZIPCode: '12345',
      adressName: 'test',
      addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
      adressNumber: '123',
      dateOfBirth: "08/11/1987",
      phone: '1234567890',
      firstname: 'John',
      surname: 'Doe'
    });
    await user.save();

    const response = await request(app)
      .delete(`/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });

  it('should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .delete(`/users/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 500 on database error', async () => {
    jest.spyOn(User, 'findByIdAndDelete').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const user = new User({
   
      email: 'unique.email@example.com', // Utilisez une adresse e-mail unique ici
      city: 'Sample City',
      ZIPCode: '12345',
      adressName: 'test',
      addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
      adressNumber: '123',
      dateOfBirth: "08/11/1987",
      phone: '1234567890',
      firstname: 'John',
      surname: 'Doe'
    });
    await user.save();

    const response = await request(app)
      .delete(`/users/${user._id}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error deleting user');
    expect(response.body.error).toBe('Database error');
  });
});

describe('GET /users/:id', () => {
  it('should get the user successfully', async () => {
    const user = new User({
     
      email: 'john.doe@example.com',
      city: 'Sample City',
      ZIPCode: '12345',
      adressName: 'test',
      addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
      adressNumber: '123',
      dateOfBirth: "08/11/1987",
      phone: '1234567890',
      firstname: 'John',
      surname: 'Doe'
    });
    await user.save();

    const response = await request(app)
      .get(`/users/${user._id}`);

    expect(response.status).toBe(200);
    expect(response.body.surname).toBe('Doe');
    expect(response.body.email).toBe('john.doe@example.com');
  });

  it('should return 404 if user not found', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .get(`/users/${fakeId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 500 on database error', async () => {
    jest.spyOn(User, 'findById').mockImplementationOnce(() => {
      throw new Error('Database error');
    });

    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .get(`/users/${fakeId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error fetching user');
    expect(response.body.error).toBe('Database error');
  });
});
describe('GET /users', () => {
    it('should get all users successfully', async () => {
      const user1 = new User({
       
        email: 'john.doe@example.com',
        city: 'Sample City',
        ZIPCode: '12345',
        adressName: 'test',
        addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
        adressNumber: '123',
        dateOfBirth: "08/11/1987",
        phone: '1234567890',
        firstname: 'John',
        surname: 'Doe'
      });
  
      const user2 = new User({
        
        email: 'jane.doe@example.com',
        city: 'Another City',
        ZIPCode: '67890',
        adressName: 'test',
        addressType: 'Rue', // Assurez-vous que 'Work' est une valeur valide pour 'addressType'
        adressNumber: '456',
        dateOfBirth: "09/11/1987",
        phone: '0987654321',
        firstname: 'Jane',
        surname: 'Dae'
      });
  
      await user1.save();
      await user2.save();
  
      const response = await request(app)
        .get('/users');
  
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0].surname).toBe('Doe');
      expect(response.body[1].surname).toBe('Dae');
    });
  
    it('should return 500 on database error', async () => {
      jest.spyOn(User, 'find').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
  
      const response = await request(app)
        .get('/users');
  
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });
  describe('POST /users', () => {
    it('should create a user successfully', async () => {
      const newUser = {
        surname: 'Doe',
        firstname: 'John',
        email: 'john.doe@example.com',
        phone: '1234567890',
        dateOfBirth: "08/11/1987",
        adressNumber: '123',
        addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
        adressName: 'test',
        ZIPCode: '12345',
        city: 'Sample City',
      };
  
      const response = await request(app)
        .post('/users')
        .send(newUser);
  
      expect(response.status).toBe(201);
      expect(response.body.message).toBe('User created successfully');
      expect(response.body.user).toHaveProperty('surname', 'Doe');
      expect(response.body.user).toHaveProperty('firstname', 'John');
      expect(response.body.user).toHaveProperty('email', 'john.doe@example.com');
    });
  
    it('should return 400 if any required field is missing', async () => {
      const newUser = {
        surname: 'Doe',
        firstname: 'John',
        email: 'john.doe@example.com',
        phone: '1234567890',
        dateOfBirth: "08/11/1987",
        adressNumber: '123',
        addressType: 'Rue', // Assurez-vous que 'Home' est une valeur valide pour 'addressType'
        adressName: 'test',
        ZIPCode: '12345',
        // city est manquant
      };
  
      const response = await request(app)
        .post('/users')
        .send(newUser);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('All fields are required');
    });
  
    it('should return 400 if email is invalid', async () => {
      const newUser = {
        surname: 'Doe',
        firstname: 'John',
        email: 'invalid-email',
        phone: '1234567890',
        dateOfBirth: "08/11/1987",
        adressNumber: '123',
        addressType: 'Rue', 
        adressName: 'test',
        ZIPCode: '12345',
        city: 'Sample City',
      };
  
      const response = await request(app)
        .post('/users')
        .send(newUser);
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid email address');
    });
  
    it('should return 500 on database error', async () => {
      jest.spyOn(User.prototype, 'save').mockImplementationOnce(() => {
        throw new Error('Database error');
      });
  
      const newUser = {
        surname: 'Doe',
        firstname: 'John',
        email: 'john.doe@example.com',
        phone: '1234567890',
        dateOfBirth: "08/11/1987",
        adressNumber: '123',
        addressType: 'Rue',
        adressName: 'test',
        ZIPCode: '12345',
        city: 'Sample City',
      };
  
      const response = await request(app)
        .post('/users')
        .send(newUser);
  
      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Database error');
    });
  });
