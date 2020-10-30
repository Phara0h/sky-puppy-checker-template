class Checker {
  constructor(config, service, settings) {
    this.config = config;
    this.service = service;
    this.settings = settings;

    // just for fun;
    this.flip = false;
  }
  async init() {
    // Do your init things here.
  }

  async check() {
    // do your checking here. Expects an object returned with a code prop (curr: v1.0.0)
    // this might change.
    return {
      code: (this.flip = !this.flip) ? 200 : 500
    };
  }
}

module.exports = function(config, service, settings) {
  return new Checker(config, service, settings);
};
