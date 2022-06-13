class Scylladb {
  constructor(config, service, settings) {
    this.config = config;
    this.service = service;
    this.settings = settings;
    this.cassandra = require('cassandra-driver');
    const distance = this.cassandra.types.distance;
    
    this.connection = {
      contactPoints: this.settings.contactPoints,
      credentials: {
        username: this.settings.username,
        password: this.settings.password
      },
      localDataCenter: 'us-east',
      keyspace: 'directory',
      pooling: {
        coreConnectionsPerHost: {
          [distance.local]: 9,
          [distance.remote]: 9
        },
        maxRequestsPerConnection: 5000
      },
      encoding: {
        copyBuffer: false
      }
    };
    console.log(this.connection);
  }
  async init() { }

  async check() {
    try {
      const client = new this.cassandra.Client(this.connection);
      // this.db = await this.scylla.connect(
      //   this.settings.url,
      //   this.settings.scylla_settings
      // );
      await client.shutdown();
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

module.exports = function(config, service, settings) {
  return new Scylladb(config, service, settings);
};
