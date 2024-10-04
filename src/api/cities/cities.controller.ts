import { Controller, Get } from '@nestjs/common';

@Controller('cities')
export class CitiesController {
  @Get(':postCode')
  getPostCode() {
    return 'Your post code is 001';
  }

  @Get('my-requests')
  getMyRequests() {
    return 'My requests';
  }
}
