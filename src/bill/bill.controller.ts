import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/role.strategy';
import { BillService } from './bill.service';
import { GenerateBillDto } from './dto/generateBill.dto';
import { PublicBillDto } from './dto/publicBill.dto';

@ApiTags('bill')
@Controller('bill')
export class BillController {
      /** logger */
  private readonly logger = new Logger(BillController.name);
  /**
   * BillController
   * @param {BillService} billService - bill service inject
   */
  constructor(
    private readonly billService: BillService,
  ) {
  }

  /**
   * /generateBill endpoint handler
   */
  @RolesGuard(['cashier'])
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'OK', type: PublicBillDto })
  @Get('/generate')
  async generateBill(
    @Query() data: GenerateBillDto,
  ): Promise<PublicBillDto> {
    this.logger.log(`generate bill by order id: ${data.orderId}`);
    return this.billService.generateBill(data);
  }
}
