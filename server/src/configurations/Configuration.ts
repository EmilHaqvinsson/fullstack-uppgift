import dotenv from 'dotenv'
import { Express } from 'express'
import { connect } from 'mongoose'
import Logger from '../utils/Logger'

dotenv.config()

const PORT: number = Number(process.env.SERVER_PORT) || 3001
const env: string = process.env.NODE_ENV || 'production'
const dbUrl: string = process.env.MONGODB_URL || 'mongodb://localhost'

let uri = process.env.MONGODB_URI

// if (env === 'development') {
// 	uri = process.env.MONGODB_URL + process.env.MONGODB_DB_NAME
// } else {
// 	uri = process.env.MONGODB_URI
// }

const connectToDatabase = async () => {
	try {
		await connect(dbUrl)
		Logger.info('Successfully connected to the Database')
	} catch (error) {
		Logger.error('Error connecting to the Database'.toUpperCase(), error)
		process.exit()
	}
}

const connectToPort = (server: Express) => {
	server.listen(PORT, () => {
		Logger.info(`⚡️[server]: Server is running at http://localhost:${ PORT }`)
		if (env === 'development') {
			Logger.warn('Server running in development mode!'.toUpperCase())
		}
	})
}

export default {
	connectToDatabase,
	connectToPort
}