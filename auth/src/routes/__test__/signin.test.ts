import request from 'supertest';
import { app } from '../../app';

it('return 400 when a email not exist', async () => {
    return request(app)
    .post('/api/users/signin')
    .send({
        email:'test1@test1.com',
        password:'1234'
    })
    .expect(400);
});

it('return 400 when password not correct', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test1@test1.com',
        password:'1234'
    })
    .expect(201);

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email:'test1@test1.com',
        password:'1abc'
    })
    .expect(400);
});

it('set a cookie after successful signin', async() => {

    await request(app)
    .post('/api/users/signup')
    .send({
        email:'test1@test1.com',
        password:'1234'
    })
    .expect(201);

    const response = await request(app)
    .post('/api/users/signin')
    .send({
        email:'test1@test1.com',
        password:'1234'
    })
    .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
})