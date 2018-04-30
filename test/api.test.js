import app from '../server/';
import supertest from 'supertest';
import { expect, should } from 'chai';

const temp = {};
const request = supertest.agent(app.listen());
should();

describe('POST api/authenticate', () => {
  it('should get all users', done => {
    request
      .post('/api/authenticate')
      .set('Accept', 'application/json')
      .send({
        password: 'password'
      })
      .expect(200, (err, res) => {
        temp.token = res.body.token;
		temp.idUser=res.body._id;
		console.log (temp.token);
        done();
      });
  });
});
describe('POST /users', () => {
  it('should add a user', done => {
    request
      .post('/api/users')
      .set('Accept', 'application/json')
      //.set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .send({
        email: 'binh@gmail.com',
        password: '8249117'        
      })
      .expect(200, (err, res) => {
        console.log (res.body.email);
        done();
      });
  });
});