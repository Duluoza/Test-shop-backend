/** Env spicific config */
module.exports = {
  the_number_of_days_after_which_the_discount_is_set: 30, // days
  http: {
    port: process.env.PORT || 5000,
  },
  bull: {
    queueName: 'redisBullQueue',
    redis: {
      host: 'redis',
      port: 6379,
    },
    checkProductsDelay: 60000, // MILLISECONDS_IN_A_24_HOUR
  },
  sequelizeConfig: {
    dialect: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'Shop',
    autoLoadModels: true,
    synchronize: true,
    logging: false
  }
};
