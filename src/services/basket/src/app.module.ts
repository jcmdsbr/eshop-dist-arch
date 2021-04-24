import {  Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  
    BasketModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
