import { BullModule } from '@nestjs/bull';
import { Module, Global } from '@nestjs/common';
import { QueueConsumer } from './queue.consumer';
import { QueueSender } from './queue.sender';
import config from '../config';

@Global()
@Module({
  imports: [
  BullModule.registerQueue({
      name: config.bull.queueName,
      redis: {
        host: config.bull.redis.host,
        port: config.bull.redis.port
      },
    }),
  ],
  providers: [QueueConsumer, QueueSender],
  exports: [QueueSender, QueueConsumer],
})
export class BullQueueModule { }
