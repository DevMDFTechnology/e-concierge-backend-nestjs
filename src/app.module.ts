import { Module } from '@nestjs/common';
import { MqttService } from './mqtt/mqtt.service';
import { MqttController } from './mqtt/mqtt.controller';


@Module({
  imports: [],
  controllers: [MqttController],
  providers: [MqttService],
})
export class AppModule {}
