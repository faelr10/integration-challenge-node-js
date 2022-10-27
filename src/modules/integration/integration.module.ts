import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExtractDataGoogleSheets } from 'src/common/extractDataGoogleSheets/extractDataGoogleSheets';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './service/integration.service';

@Module({
  imports: [HttpModule],
  controllers: [IntegrationController],
  providers: [IntegrationService, ExtractDataGoogleSheets],
})
export class IntegrationModule {}
