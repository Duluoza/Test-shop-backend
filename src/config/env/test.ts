module.exports = {
    the_number_of_days_after_which_the_discount_is_set: 30, // days
    bull: {
        queueName: 'redisBullQueue',
        redis: {
          host: '127.0.0.1',
          port: 6379,
        },
        checkProductsDelay: 60000, // // MILLISECONDS_IN_A_1_MINUTES
      },
}