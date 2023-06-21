import { type Resdelete, type Reqdelete } from '../FrontBackSharedTypes';
import { deleteDB } from '../database';
import { sessionManager } from '../sessionManager';

export async function getDeleteUser(req: Reqdelete): Promise<Resdelete> {
    const username = await sessionManager.get(req.sid);

    if (await deleteDB(username)) {

        return {
            isAccepted: true,
        };

    }
    else {
        return {
            isAccepted: false,
        };
    }
}