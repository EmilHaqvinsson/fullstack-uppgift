import StatusCode from '../utils/StatusCodes'
import { Request, Response } from 'express'

const aliveController = (request: Request, response: Response) => {
	response.status(StatusCode.OK).send('Connected to TypeScript API!')
}

export default {
	alive: aliveController
}