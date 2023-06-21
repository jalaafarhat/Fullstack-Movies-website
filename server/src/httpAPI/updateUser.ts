import { type ResUpdateEmail, type ReqUpdateEmail } from '../FrontBackSharedTypes';
import { updateDBemail } from '../database';
import { sessionManager } from '../sessionManager';

export async function getUpdateUser(req: ReqUpdateEmail): Promise<ResUpdateEmail> {
    const username = await sessionManager.get(req.sid);

    if (await updateDBemail(username, req.email)) {
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