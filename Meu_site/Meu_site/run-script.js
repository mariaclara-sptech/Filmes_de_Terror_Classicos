require("dotenv").config({ path: './.env.dev' });

const mysql = require("mysql2");

const mySqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
};

const fs = require('fs');
const path = require('path');

const sqlFile = path.join(__dirname, 'src', 'database', 'script-tabelas.sql');
const sql = fs.readFileSync(sqlFile, 'utf8');

// Split by semicolon and execute each statement
const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 0 && !s.startsWith('--'));

async function runScript() {
    const connection = mysql.createConnection(mySqlConfig);
    
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                console.error('Error connecting to MySQL:', err);
                reject(err);
                return;
            }

            let index = 0;

            function executeNext() {
                if (index >= statements.length) {
                    console.log('\n✓ All statements executed successfully!');
                    connection.end();
                    resolve();
                    return;
                }

                const statement = statements[index];
                console.log(`[${index + 1}/${statements.length}] Executing: ${statement.substring(0, 60)}...`);

                connection.query(statement, (err, results) => {
                    if (err) {
                        console.error('✗ Error:', err.message);
                    } else {
                        console.log('✓ Success');
                    }
                    index++;
                    executeNext();
                });
            }

            executeNext();
        });
    });
}

runScript()
    .catch(err => {
        console.error('Fatal error:', err);
        process.exit(1);
    });