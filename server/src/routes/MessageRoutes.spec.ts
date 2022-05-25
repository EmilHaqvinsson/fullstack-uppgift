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
                .get('/message/628df4801e0ddeca09160027')
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.message).to.equal('God kväll')
                    expect(body.author).to.equal('Michaela')
                    done()
                })
        })
    })
}

const updateMessageById = () => {
    describe('Update message with id', () => {
        test('Update a message with a id', (done) => {
            Chai.request(server)
                .put(`/message/628df4801e0ddeca09160027`)
                .send(updatedMessage)
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    const body = response.body
                    expect(body).to.be.an('object')
                    expect(body.author).to.equal('Emil')
                    done()
                })
        })
    })
}

const deleteMessageById = () => {
    describe('Testing to delete a message by id', () => {
        test('Delete a message by id', (done) => {
            Chai.request(server)
                .delete('/message/628df4801e0ddeca09160027')
                .end((error, response) => {
                    expect(response).to.have.a.status(StatusCode.OK)
                    expect(response.body.message).to.equal('Message with id 628df4801e0ddeca09160027 was deleted')
                    done()
                })
        })
    })
}

describe('Testing message routes', () => {
    registerMessage(),
    getAllMessages(),
    getMessageById()
    updateMessageById()
    deleteMessageById()
})