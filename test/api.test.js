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
		console.log (temp.token);
        done();
      });
  });
});

describe('POST /user', () => {
  it('should add a user', done => {
    request
      .post('/api/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .send({
         email: 'toandung@gmail.com',
         password: '12381727'        
      })
      .expect(200, (err, res) => {
        temp.idUser = res.body._id;
		console.log (res.body._id);
        done();
      });
  });
});

describe('GET /users', () => {
  it('should get all users', done => {
    request
      .get('/api/users')
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .expect(200, (err, res) => {
        expect(res.body.length).to.be.at.least(1);
		console.log (res.body.email);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it('should get a user', done => {
    request
      .get(`/api/users/${temp.idUser}`)
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .expect(200, (err, res) => {
        res.body.email.should.equal('toandung@gmail.com');
        res.body.password.should.equal('12381727');
        res.body._id.should.equal(temp.idUser);
        done();
      });
  });
});

describe('PUT /users', () => {
  it('should update a user', done => {
    request
      .put(`/api/users/${temp.idUser}`)
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .send({
        email: 'ptoandung@gmail.com',
        password: '012381727'   
      })
      .expect(200, (err, res) => {
        temp.idCity = res.body._id;
        done();
      });
  });

  it('should get updated user', done => {
    request
      .get(`/api/users/${temp.idUser}`)
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .expect(200, (err, res) => {
        res.body.email.should.equal('ptoandung@gmail.com');
        res.body.password.should.equal('012381727');
        res.body._id.should.equal(temp.idUser);
        done();
      });
  });
});

/* describe('DELETE /users', () => {
  it('should delete a user', done => {
    request
      .delete(`/api/users/${temp.idUser}`)
      .set('Authorization', `Bearer ${temp.token}`)
      .set('Accept', 'application/json')
      .expect(200, (err, res) => {
        done();
      });
  });

  it('should get error', done => {
    request
      .get(`/api/cities/${temp.idUser}`)
      .set('Accept', 'application/json')
      .expect(404, () => {
        done();
      });
  });
}); */
