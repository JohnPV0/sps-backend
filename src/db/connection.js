import { createPool } from 'mysql2/promise';
import { MYSQLPORT, MYSQLDATABASE, MYSQLHOST, MYSQLPASSWORD, MYSQLUSER } from '../config.js';

export const pool = createPool({
    host: MYSQLHOST,
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    port: MYSQLPORT,
    database: MYSQLDATABASE
});