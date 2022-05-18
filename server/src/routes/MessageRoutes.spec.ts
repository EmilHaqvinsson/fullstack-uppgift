import chaiHttp from 'chai-http'
import Chai from 'chai'
import server from '../server'
import StatusCode from '../utils/StatusCode'
import {ReadMessage} from '../interface/IMessage'
import {describe, it as test} from 'mocha'
import Logger from '../utils/Logger'

Chai.should()
Chai.use(chaiHttp)

const newMessage = {
    message: 'God dag',
    author: 'Aram'
}

const updatedMessage = {
    message: 'God kväll',
    author: 'Emil'
}

let global_id = ''
Logger.http(global_id)
const expect = Chai.expect

const registerMessage = () => {
    describe('Test to register a message', () => {
        test('Created a new message', (done) => {
            Chai.request(server)
                .post('/message')
                .send(newMessage)
                .then((responese) => {
                    expect(responese).to.have.a.status(StatusCode.CREATED)
                    expect(responese.body.message).to.equal('God dag')
                    global_id = responese.body.id
                    done()
                })
        })
    })
}

const getAllMessages = () => {
    describe('Testing to get all message', () => {
        test('Get all message', (done) => {
            Chai.request(server)
                .get('/message/all')
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

const getMessageById = () => {
    describe('Testing to get a message by id', () => {
        test('Get a message by id', (done) => {
            Chai.request(server)
                .get('/message/6284b50b94a0197318c48e1b')
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.message).to.equal('God dag')
                    expect(body.author).to.equal('Aram')
                    done()
                })
        })
    })
}

const deleteMessageById = () => {
    describe('Testing to delete a message by id', () => {
        test('Delete a message by id', (done) => {
            Chai.request(server)
                .delete('/message/6284b97fa0139e63ee4c2f40')
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    expect(response.body.message).to.equal('Message with id 6284b97fa0139e63ee4c2f40 was deleted')
                    done()
                })
        })
    })
}

describe('Testing message routes', () => {
    registerMessage(),
    getAllMessages(),
    getMessageById()
    deleteMessageById()
})