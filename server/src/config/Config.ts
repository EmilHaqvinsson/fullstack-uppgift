import dotenv from 'dotenv'
import {Express} from 'express'
import {connect} from 'mongoose'
import Logger from '../utils/Logger'

dotenv.config()

const PORT: number = Number(process.env.PORT) || 3001
const env: string = process.env.NODE_ENV || 'production'

let uri: string

if (env === 'development') {
    uri = process.env.MONGODB_URL + process.env.MONGODB_DB_NAME
} else {
    uri = process.env.MONGODB_URI
}

const connectToDatabase = async () => {
    try {
        await connect(uri)
        Logger.info('Ansluten till databasen!')
    } catch (error) {
        Logger.error('Fel vid anslutning till databasen'.toUpperCase(), error)
        process.exit()
    }
}

const connectToPort = (server: Express) => {
    server.listen(PORT, () => {
        Logger.info(`Server startad i port: ${PORT}`)
        if (env === 'development') {
            Logger.warn('Server körs i utvecklings läge!'.toUpperCase())
        }
    })
}

export default {
    connectToPort,
    connectToDatabase
}