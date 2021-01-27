import * as nconf from 'nconf';
import * as _ from 'lodash';

nconf.env().argv();

/**
 * depending on
 * @param {string} NODE_ENV - evironment
 * exports config
 */
const environment = nconf.get('NODE_ENV') || 'production';
export default _.extend(
  {
    environment,
  },
  require(`${__dirname}/env/${environment}`),
  nconf.get(),
);
