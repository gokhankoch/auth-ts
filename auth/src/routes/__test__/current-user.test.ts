import request from 'supertest';
import { app } from '../../app';

it('Get current user', async () => {

    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test1@test1.com',
        password:'1234'
    })
    .expect(201);

   const response = await request(app)
    .post('/api/users/currentuser')
    .send({})
    .expect(200);

    console.log(response.body);
});