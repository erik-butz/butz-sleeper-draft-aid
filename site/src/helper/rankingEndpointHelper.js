
const rankingEndpointHelper = () => {
  switch (process.env.NODE_ENV) {
    case 'local':
    case 'development':
      return `http://localhost:8000/rankings`
    case 'production':
      return 'https://butz-sleeper-draft-aid-backend.herokuapp.com/rankings'
    default:
      return 'http://localhost:8000/rankings'
  }
}

module.exports = { rankingEndpointHelper }