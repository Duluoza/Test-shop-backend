import { Module } from '@nestjs/common';
import { BillController } from './bill.controller';
import { BillService } from './bill.service';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    OrderModule
  ],
  controllers: [BillController],
  providers: [BillService]
})
export class BillModule {}
