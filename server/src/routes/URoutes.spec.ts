// Kolla varför inte global_id funkar i testerna. Nu är testerna hårdkodade med befintliga id:n

import server from '../server'
import chaiHttp from 'chai-http'
import Chai from 'chai'
import StatusCode from '../utils/StatusCode'
import {ReadU} from '../interface/InterFace'
import {describe, it as test} from 'mocha'

Chai.should()
Chai.use(chaiHttp)
const expect = Chai.expect

const newU = {
    fullName: 'Lars',
    eMail: 'lars@lars.com',
    pass: 'Lars10'
};

let global_id = '';

const updatedU = {
    fullName: 'Alexis',
    eMail: 'alexis@alexis.com',
    pass: 'alexis10'
};

const registerUser = () => {
    describe('Register a new user', () => {
        test('Check if new user is created', (done) => {
            Chai.request(server)
                .post('/user/')
                .then((response) => {
                    expect(response).to.have.a.status(StatusCode.CREATED)
                    global_id = response.body._id
                    done()
                })
        })
    })
}

const getAllUsers = () => {
    describe('Check all users', () => {
        test('Look after a array with users', (done) => {
            Chai.request(server)
                .get('/user/all')
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body
                    expect(body).to.be.an('array')
                    expect(body.length).to.equal(body.length)
                    done()
                })
        })
    })
}

const getUserById = () => {
    describe('Get a user by id', () => {
        test('Look after a user with a id', (done) => {
            Chai.request(server)
                .get(`/user/${global_id}`)
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.fullName).to.equal('Alexis')
                    expect(body.eMail).to.equal('alexis@alexis.com')
                    done()
                })
        })
    })
}

const getUserByNameAndEmail = () => {
    describe('Check a users name and email', () => {
        test('Look after a name and email', (done) => {
            Chai.request(server)
                .get(`/user/name/${newU.fullName}/${newU.eMail}`)
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body[0]
                    expect(body).to.be.an('object')
                    expect(body.fullName).to.equal('Lars')
                    expect(body.eMail).to.equal('lars@lars.com')
                    done()
                })
        })
    })
}

const updateUserById = () => {
    describe('Update user with id', () => {
        test('Update a user with a id', (done) => {
            Chai.request(server)
                .put(`/user/628c8bd0244f24d4000262ad`)
                .send(updatedU)
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.fullName).to.equal('Alexis')
                    done()
                })
        })
    })
}

const deleteUserById = () => {
    describe('Testing to delete a user with id', () => {
        test('Delete a user with a id', (done) => {
            Chai.request(server)
                .delete('/user/628c8f301b14b6894854b716')
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    expect(response.body.message).to.equal(`Användare med id 628c8f301b14b6894854b716 har tagits bort från databasen!`)
                    done()
                })
        })
    })
}

describe('Test user routes', () => {
    // registerUser()
    // getAllUsers()
    // getUserById()
    // getUserByNameAndEmail()
    // updateUserById()
    // deleteUserById()
})