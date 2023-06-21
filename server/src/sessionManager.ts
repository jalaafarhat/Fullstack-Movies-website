import { createClient, type RedisClientType } from 'redis';
import { v4 as uuidv4 } from 'uuid';

class SessionManager {
    private redisClient: RedisClientType;

    constructor() {
        this.redisClient = createClient({
            url: `redis://cache:6379`
        });
        this.redisClient.on('error', err => console.log('Redis Client Error', err));
    }

    async get(sid: string): Promise<string | null> {
        await this.redisClient.connect();
        // may return null
        const username = await this.redisClient.get(sid);
        await this.redisClient.disconnect();
        return username;
    }
    async add(username: string) {
        const sid = uuidv4();
        await this.redisClient.connect();
        await this.redisClient.set(sid, username);

        // Set a TTL for the session key for one week 3600 * 24 * 7 = 604800
        // when TTL end it automaticly deleted
        await this.redisClient.expire(sid, 604800);

        await this.redisClient.disconnect();
        return sid;
    }
}

export const sessionManager = new SessionManager();
