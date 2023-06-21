import * as http from 'http';


import { getRegister } from './httpAPI/registerAPI';
import { getLogin } from './httpAPI/loginAPI';
import { getData } from './httpAPI/dataAPI';
import { getPro } from './httpAPI/goPro';
import { getDeleteUser } from './httpAPI/deleteUser';
import { getUpdateUser } from './httpAPI/updateUser';


export function startServer() {
    //start http server in port 8080
    const server = http.createServer();
    server.listen(8080, () => console.log('http running on port 8080'));

    /* event is emitted when an error occurs while processing a client's request */
    server.on('clientError', (err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request ${err.message}\r\n\r\n');
    });

    // handle requests and return the response
    server.on('request', (req, res) => {
        let data = '';

        // data is  senting ,parts,parts
        req.on('data', chunk => {
            data += chunk;
        });
        // data is all sent
        req.on('end', async () => {
            // send the response
            res.end(await handleApi(data, req.url.substring(5))); // Removes the first 5 characters '/api/'
        });
    });

    return server;

}

/* UTILS */
async function handleApi(data: string, url: String): Promise<string> {
    console.log("got req to " + url);

    switch (url) {
        case 'register':
            return await parseRES(getRegister, data);
        case 'login':
            return await parseRES(getLogin, data);
        case 'data':
            return await parseRES(getData, data);
        case 'goPro':
            return await parseRES(getPro, data);
        case 'deleteUser':
            return await parseRES(getDeleteUser, data);
        case 'updateEmail':
            return await parseRES(getUpdateUser, data);
        default:
            return 'HTTP/1.1 400 Bad Request ${err.message}\r\n\r\n';
    }
}

/* parse json string req to object and then after middleware return the res object parse it as json string */
async function parseRES(middlewar: (object: object) => object, data: string) {
    return JSON.stringify(await middlewar(JSON.parse(data)));
}