const mongoose = require("mongoose");
require("dotenv").config();
const request = require('supertest');
const app = require('../index');

let accessToken;
let userId;
let taskId ;

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

describe('Registration End Point', () =>{
    it('Register a user', async () =>{
        const response = await request(app)
            .post('/api/users/register')
            .send({
                fullName: 'Job Steve',
                username: 'job123',
                email: 'job123@gmail.com',
                password:'job1234',
                role:'admin',
            }) 
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'user created successfully');

    }, 10000);
});

describe('Login End Point', () =>{
    it('Login a user', async () =>{
        const response = await request(app)
            .post('/api/users/login')
            .send({
                username: 'job123',
                password:'job1234',
            }) 
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('accessToken');
        accessToken = response.body.accessToken;
        // console.log(accessToken);
    });
});

describe('Adding a New Task', () =>{
    it('adds a new task', async () => {
        const response = await request(app)
          .post('/api/shopitems')
          .set('Authorization', `Bearer ${accessToken}`)
          .send({ name: 'New Task 7', description: 'Task description', price:'49' });
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('shopItem.userId');
        userId = response.body.shopItem.userId; 
        taskId = response.body.shopItem._id;
        // console.log(userId);
      });
});

describe('Get the list of tasks', () =>{
    it('Get all tasks', async () => {
        const response = await request(app)
          .get('/api/shopitems')
          .set('Authorization', `Bearer ${accessToken}`);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'successfull');
      });
});

describe('Delete task endpoint', () => {
    it('deletes a task', async () => {
        if (!userId) {
            return;
        }
        const response = await request(app)
            .delete(`/api/shopitems/remove-item/`)
            .set('Authorization', `Bearer ${accessToken}`)
            .send({id:taskId})
        expect(response.statusCode).toBe(204);
    });
});