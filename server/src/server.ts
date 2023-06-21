
import { signalHandler } from './signalHandler';
import { connectToDatabase } from './database';
import { startServer } from './httpAPI';

async function test() {
}
test()

//start database
connectToDatabase();

//start http server
const server = startServer();

// handle signals
signalHandler(server);

