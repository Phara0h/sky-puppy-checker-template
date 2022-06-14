const redis_module = require('redis');
const createClient = redis_module.createClient;

class redis {
  constructor(config, service, settings) {
    this.config = config;
    this.service = service;
    this.settings = settings;

    this.db = null;
  }
  async init() { }

  async check() {

    try {
      const client = createClient({
        url: settings.REDIS_URL
      });

      const conn = await client.connect();
      await client.time();
      await client.quit();

      return {
        code: 200,
        message: 'OK'
      };
    } catch (e) {
      console.log(e);
      return {
        code: 500,
        message: e.message
      };
    }
  }
}
module.exports = function (config, service, settings) {
  return new redis(config, service, settings);
};
