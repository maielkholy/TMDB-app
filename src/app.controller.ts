import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Setup')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get example data' }) // Add a summary to this endpoint
  @ApiResponse({ status: 200, description: 'Successfully retrieved data.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
