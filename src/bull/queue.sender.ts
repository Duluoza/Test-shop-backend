import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import config from '../config';

@Injectable()
export class QueueSender {
  constructor(@InjectQueue(config.bull.queueName) readonly queue: Queue) { }

  async sendToServiceQueue(serviceName: string, actionName: string, data: any, delay: number) {
    return this.queue.add(
      'dynamicServiceScheduleJobStart', // static name of schedule with a dinamyc params
      { 
        serviceName,
        actionName,
        actionData: data,
      },
      {
        delay, // delay of queue job
        removeOnComplete: true,
      },
    );
  }

  async cleanQueue(): Promise<void> {
    this.queue.clean(0, 'delayed');
    this.queue.clean(0, 'wait');
    this.queue.clean(0, 'active');
    this.queue.clean(0, 'completed');
    this.queue.clean(0, 'failed');
  }
}
