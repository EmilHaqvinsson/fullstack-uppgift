import {Express} from 'express'
import {connect} from 'mongoose'

const port = process.env.SERVER_PORT || 3001
const env = process.env.NODE_ENV;
const mongodbUrl: string = process.env.MONGODB_URL || 'mongodb://localhost:27017//'
const dbName = process.env.MONGODB_DB_NAME || 'bookface'

const connectToDatabase = async () => {
    const uri = mongodbUrl + dbName
    try {
        await connect(uri)
        console.log('Ansluten till databasen!')
    } catch (error) {
        console.log('Fel vid anslutning till databasen'.toUpperCase(), error)
        process.exit()
    }
}

const connectToPort = (app: Express) => {
    app.listen(port, () => {
        console.log(`Server startad i port: ${port}`)
        if (env === 'development') {
            console.log('Server körs i utvecklings läge!')
        }
    })
}

export default {
    connectToPort,
    connectToDatabase
}