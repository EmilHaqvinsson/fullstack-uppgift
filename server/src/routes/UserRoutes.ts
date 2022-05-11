import { Express } from 'express'
import UController from '../controllers/UController'

const UserRoutes = (server: Express) => {
	server.post('/user/', UController.registerUser)
}

export default UserRoutes