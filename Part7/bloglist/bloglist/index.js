const app = require('./app')
const { PORT } = require('./utils/config')
const logger = require('./utils/logger')

app.listen(PORT, () => {
  logger.info('server running on port', PORT)
})
