import express from 'express'
import setupMiddlewares from './middlewares'
import setupRotes from './routes'

const app = express()
setupMiddlewares(app)
setupRotes(app)
export default app
