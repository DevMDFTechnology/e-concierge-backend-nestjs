import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private client: mqtt.MqttClient;
  private messages: { topic: string; message: string }[] = [];

  onModuleInit() {
    this.client = mqtt.connect('mqtt://m15.cloudmqtt.com', {
      port: 17423,          
      username: 'ppmxhjms',
      password: '3OFde3Jdvakn',
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('error', (err) => {
      console.error('MQTT connection error:', err);
    });

    this.client.on('message', (topic, message) => {
      const msg = message.toString();
      this.messages.push({ topic, message: msg });
      console.log(`Received message on topic ${topic}: ${msg}`);
    });
  }

  onModuleDestroy() {
    if (this.client) {
      this.client.end();
    }
  }

  subscribe(topic: string) {
    this.client.subscribe(topic, (err, granted) => {
      if (err) {
        console.error(`Failed to subscribe to topic ${topic}:`, err);
      } else {
        console.log(`Subscribed to topic: ${topic}`);
        console.log(`Granted subscriptions: ${JSON.stringify(granted)}`);
      }
    });
  }

  publish(topic: string, message: string) {
    console.log(`Publishing message to topic ${topic}: ${message}`);
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error(`Failed to publish message to topic ${topic}:`, err);
      } else {
        console.log(`Message published to topic ${topic}: ${message}`);
      }
    });
  }

  getMessages() {
    return this.messages;
  }
}
