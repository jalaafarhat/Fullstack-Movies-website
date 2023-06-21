import { Pool } from 'pg';
import bcrypt from 'bcrypt';

export type ROW = {
    username: string;
    email: string;
    password: string;
    ispro: boolean;
}


const dbPool = new Pool({
    host: 'db',// important stay db as the name of the image
    port: 5432, // defualt port in postgre
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    //max: 4
});

// start the database
export async function connectToDatabase() {
    const client = await dbPool.connect();
    try {
        // remove in production
        // const deleteTable = "DROP TABLE IF EXISTS users;";
        // await dbPool.query(deleteTable);
        /********************/
        const createTable = `
        CREATE TABLE IF NOT EXISTS users (
            "userid" SERIAL PRIMARY KEY,
            "username" VARCHAR(255) NOT NULL UNIQUE,
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "password" VARCHAR(255) NOT NULL,
            "ispro" BOOLEAN NOT NULL
        );`;

        await dbPool.query(createTable);

    } catch (err) {
        console.error('Error creating the database table :', err);
    } finally {
        client.release();
    }
}

export async function insertDB(data: ROW): Promise<boolean> {
    const client = await dbPool.connect();
    try {
        // check if they contain spaces
        if (/\s/.test(data.username) || /\s/.test(data.password) || /\s/.test(data.email)) {
            console.log('inserted inputs contain spaces');
            return false;
        }
        else if (data.username == '' || data.password == '' || data.email == '') {
            console.log('some of the inputs are empty!');
            return false;
        }
        else if (await isUsernameExists(data.username) && await isEmailExists(data.email)) {
            console.log('username or email exist');
            return false;
        }
        else {
            const insert = `
            INSERT INTO users (username, email, password, ispro) 
            VALUES ('${data.username}', '${data.email}', '${await bcrypt.hash(data.password, 10)}', ${data.ispro ? 'true' : 'false'});
        `;

            const result = await dbPool.query(insert);
            // if inserted
            if (result.rowCount === 1) {
                console.log(`inserted ${data.username}`);
                return true;
            }
            console.log(`failed to insert  ${data.username}`);
            return false;


        }
    } catch (err) {
        console.log('Error inserting to database:', err);
    } finally {
        client.release();
    }
}

async function isUsernameExists(username: string) {
    try {
        const result = await dbPool.query('SELECT COUNT(*) FROM users WHERE username = $1', [username]);
        return result.rows[0].count > 0;

    } catch (err) {
        console.error('Error checking in database:', err);
    }
}

async function isEmailExists(email: string) {
    try {
        const result = await dbPool.query('SELECT COUNT(*) FROM users WHERE email = $1', [email]);
        return result.rows[0].count > 0;

    } catch (err) {
        console.error('Error checking in database:', err);
    }
}

export async function deleteDB(username: string) {
    const client = await dbPool.connect();
    try {
        if (await isUsernameExists(username)) {
            const result = await dbPool.query('DELETE FROM users WHERE username = $1', [username]);
            // if deleted
            if (result.rowCount === 1) {
                console.log(`deleted ${username}`);
                return true;
            }
            console.log(`failed to delete  ${username}`);
            return false;

        }
        else {
            console.log(`error, ${username} does not exist`);
        }
    } catch (err) {
        console.error('Error deleting in database:', err);
    } finally {
        client.release();
    }
}

export async function getByUsernameDB(username: string) {
    const emptyRes = {
        username: '',
        email: '',
        password: '',
        ispro: false
    } as ROW;

    if (username === null)
        return emptyRes;

    const client = await dbPool.connect();
    try {
        const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length > 0) {
            return result.rows[0] as ROW;
        }
        // return empty row
        console.log('No user found with username:', username);
        return emptyRes;

    } catch (err) {
        console.error('Error getting in database:', err);
    } finally {
        client.release();
    }
}

export async function getByEmailDB(email: string) {
    const emptyRes = {
        username: '',
        email: '',
        password: '',
        ispro: false
    } as ROW;

    if (email === null)
        return emptyRes;

    const client = await dbPool.connect();
    try {
        const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return result.rows[0] as ROW;
        }
        // return empty row
        console.log('No user found with email:', email);
        return emptyRes;

    } catch (err) {
        console.error('Error getting in database:', err);
    } finally {
        client.release();
    }
}

export async function updateDBispro(username: string, ispro: boolean) {
    const client = await dbPool.connect();
    try {
        await dbPool.query('UPDATE users SET ispro = $1 WHERE username = $2', [ispro, username]);
    } catch (err) {
        console.error('Error updating ispro in database:', err);
    } finally {
        client.release();
    }
}



export async function updateDBemail(username: string, email: string) {
    const client = await dbPool.connect();
    try {
        // dont update if email is exist
        if (await isEmailExists(email))
            return false;

        await dbPool.query('UPDATE users SET email = $1 WHERE username = $2', [email, username]);
        return true;
    } catch (err) {
        console.error('Error updating  email in database:', err);
    } finally {
        client.release();
    }
}