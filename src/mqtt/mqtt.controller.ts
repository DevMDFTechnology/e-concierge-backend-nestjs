import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('publish')
  publish(@Body() body: { topic: string; message: string }) {
    this.mqttService.publish(body.topic, body.message);
    return `Message published to topic: ${body.topic}, with message: ${body.message}`;
  }

  @Get('subscribe/:topic')
  subscribe(@Param('topic') topic: string) {
    this.mqttService.subscribe(`NTK/GWY/${topic}/sub`);
    return `Subscribed to topic ${topic}`;
  }

  @Get('messages')
  getMessages() {
    return this.mqttService.getMessages();
  }
}
