import { type ReqRegister, type ResRegister } from '../FrontBackSharedTypes';
import { insertDB } from '../database';
import { sessionManager } from '../sessionManager';

export async function getRegister(req: ReqRegister): Promise<ResRegister> {
    //add to DB and send the session ID to him 
    const isAdded = await insertDB({ ...req, ispro: false });
    if (isAdded) {
        const sid = await sessionManager.add(req.username);
        return {
            isAccepted: true,
            username: req.username,
            email: req.email,
            sid: sid
        };
    } else {
        return {
            isAccepted: false,
            username: '',
            email: '',
            sid: ''
        };
    }
}