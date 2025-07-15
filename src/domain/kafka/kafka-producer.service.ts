import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;
  private readonly logger = new Logger(KafkaProducerService.name);

  constructor(private readonly configService: ConfigService) {
    const kafka = new Kafka({
      clientId: 'delivery-service',
      brokers: [this.configService.get<string>('KAFKA_BROKERS') || 'my-kafka-cluster-kafka-bootstrap.kafka:9092'],
      retry: {
        initialRetryTime: 100,
        retries: 10,
      },
    });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    try {
      await this.producer.connect();
      this.logger.log('Kafka producer connected successfully');
    } catch (error) {
      this.logger.error('Failed to connect Kafka producer:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    this.logger.log('Kafka producer disconnected');
  }

  async sendMessage(topic: string, message: any) {
    try {
      const record: ProducerRecord = {
        topic,
        messages: [{ value: JSON.stringify(message) }],
      };
      await this.producer.send(record);
      this.logger.log(`Message sent to topic ${topic}: ${JSON.stringify(message)}`);
    } catch (error) {
      this.logger.error(`Failed to send message to topic ${topic}:`, error);
      throw error;
    }
  }
}