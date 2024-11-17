import Client from '@utils/client.js';
import { ENV } from '@utils/env.js';
import { Cache } from '@services/cache.js';

ENV.init();
Cache.init();
Client.init();

Client.instance.login(process.env.BOT_TOKEN);
