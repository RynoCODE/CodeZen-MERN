import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const client = new Redis({
  username: 'default',
  password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
  host: process.env.NEXT_PUBLIC_REDIS_HOST,
  port: 14429
});

client.on('error', (err) => console.log('Redis Client Error', err));

export default client;