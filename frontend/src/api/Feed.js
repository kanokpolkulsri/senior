const Config = require('../Config')

module.exports = {
    FEED_TEST: () => {
        console.log("Get into FEED_TEST")
        return Config.API_URL
    },
}