import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import config from '../config'
import { ModuleRef } from '@nestjs/core';
import { OnQueueError, OnQueueFailed, Process, Processor } from '@nestjs/bull';

@Processor({ name: config.bull.queueName })
export class QueueConsumer {
  private readonly logger = new Logger(config.bull.queueName);
  constructor(
    private moduleRef: ModuleRef,
  ) { }

  @Process({ name: 'dynamicServiceScheduleJobStart' })
  jobProcess(job: Job): void {
    this.logger.log(
      `Processing job Start! job: ${job.id} of type ${job.name}. ${job.data.serviceName}.${job.data.actionName}`,
    );
    try {
      const dynamicService = this.moduleRef.get(job.data.serviceName, { strict: false });
      dynamicService[job.data.actionName](job.data.actionData);
    } catch (error) {
      this.logger.error(
        `Processing job Start error! job: ${job.id} of type ${job.name}`,
      );
    }
  }

  @OnQueueFailed()
  onFailed(job: any): void {
    this.logger.error(
      `Processing job is FAILED, job: ${job.id} of type ${job.name} with data ${job.data.actionData}`,
    );
  }

  @OnQueueError()
  onError(job: any): void {
    this.logger.error(
      `Processing job is ERROR, job: ${job.id} of type ${job.name} with data ${job.data.actionData}`,
    );
  }
}
