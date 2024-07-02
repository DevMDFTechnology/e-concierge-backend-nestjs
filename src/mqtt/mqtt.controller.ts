import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('publish')
  publish(@Body() body: { topic: string; message: string }) {
    this.mqttService.publish(body.topic, body.message);
    return 'Message published';
  }

  @Get('subscribe/:topic')
  subscribe(@Param('topic') topic: string) {
    this.mqttService.subscribe(topic);
    return `Subscribed to topic ${topic}`;
  }
}
