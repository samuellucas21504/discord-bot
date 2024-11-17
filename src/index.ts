import Client from '@utils/client.js';
import { ENV } from '@utils/env.js';
import { Cache } from '@services/cache.js';
import { Deploy } from '@config/deploy-commands.js';
import { CRON } from '@config/cron.js';

ENV.init();
Cache.init();
Client.init();
Deploy.init();
CRON.schedule();

Client.instance.login(process.env.BOT_TOKEN);
