import { type ReqLogin, type ResLogin } from '../FrontBackSharedTypes';
import { getByEmailDB } from '../database';
import { sessionManager } from '../sessionManager';
import bcrypt from 'bcrypt';

export async function getLogin(req: ReqLogin): Promise<ResLogin> {
    // certifie user from the database and send session
    const userdata = await getByEmailDB(req.email);
    if (userdata.email !== '' && await bcrypt.compare(req.password, userdata.password)) {
        const sid = await sessionManager.add(userdata.username);
        return {
            isAccepted: true,
            username: userdata.username,
            email: userdata.email,
            ispro: userdata.ispro,
            sid: sid
        };
    }
    else {
        return {
            isAccepted: false,
            username: '',
            email: '',
            ispro: false,
            sid: ''
        };
    }
}