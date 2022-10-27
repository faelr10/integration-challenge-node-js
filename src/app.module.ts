import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IntegrationModule } from './modules/integration/integration.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, IntegrationModule, ConfigModule.forRoot()],
})
export class AppModule {}
