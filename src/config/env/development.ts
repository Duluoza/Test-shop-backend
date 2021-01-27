/** Env spicific config */
module.exports = {
  the_number_of_days_after_which_the_discount_is_set: 30, // days
  http: {
    port: process.env.PORT || 5000,
  },
  bull: {
    queueName: 'redisBullQueue',
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
    checkProductsDelay: 60000, // // MILLISECONDS_IN_A_1_MINUTES
  },
  sequelizeConfig: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'Shop',
    autoLoadModels: true,
    synchronize: true,
    logging: false
  }
};
