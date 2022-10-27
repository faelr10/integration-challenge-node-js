import { Controller, Inject, Post } from '@nestjs/common';
import { IntegrationService } from './service/integration.service';
import { IIntegrationService } from './structure';

@Controller('integration')
export class IntegrationController {
  constructor(
    @Inject(IntegrationService)
    private readonly integrationService: IIntegrationService,
  ) {}

  @Post()
  integration() {
    return this.integrationService.execute();
  }
}
