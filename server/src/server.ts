import express from 'express'
import Configuration from './configurations/Configuration'
// import Middleware from './middleware/Middleware/'
import AliveRoutes from './routes/AliveRoute'
// import UserRoutes from './routes/UserRoutes'
import Logger from './utils/Logger'

const server = express()
// Middleware.applyMiddlewares(server)

// Routes
AliveRoutes(server)
// UserRoutes(server)

// Middleware.errorHandlerAndNotFound(server)

Configuration.connectToPort(server)
Configuration.connectToDatabase().then(() => {
	Logger.debug('--== lolz ==--')
})

export default server