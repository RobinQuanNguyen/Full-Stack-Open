const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')


//const PORT = 3003
const POR_T = config.PORT

app.listen(POR_T, () => {
    logger.info(`Server running on port ${POR_T}`)
})

