# Connect to MYSQL sever source code typeorom

```ts
import * as path from "path";
import { readFileSync } from "fs";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

// use online databases
if (process.env.NODE_ENV == "production") {
    /**
     * getconnectionoptions  > weeklyreports_users_online
     */
    const weeklyreports_users_online = await getConnectionOptions(
        "weeklyreports_users_online"
    );
    /**
     * getconnectionoptions  > lawpool_online_ng
     */
    const lawpool_online_ng = await getConnectionOptions("lawpool_online_ng");

    /**
     * getconnectionoptions  > constitution_online_ng
     */
    const constitution_online_ng = await getConnectionOptions(
        "constitution_online_ng"
    );

    /**
     * getconnectionoptions  > civilprocedurerules_online_ng
     */
    const civilprocedurerules_online_ng = await getConnectionOptions(
        "civilprocedurerules_online_ng"
    );

    // const ssl = {
    //     ca: readFileSync(
    //         path.join(__dirname, "../../../certificates/ca.pem")
    //     ),
    //     key: readFileSync(
    //         path.join(__dirname, "../../../certificates/client-key.pem")
    //     ),
    //     cert: readFileSync(
    //         path.join(
    //             __dirname,
    //             "../../../certificates/client-cert.pem"
    //         )
    //     )
    // };

    // establlish connections without ssl || seems to be broken

    return createConnections([
        {
            ...weeklyreports_users_online,
            name: "default",
            connectTimeout: 60 * 60 * 1000
        },
        {
            ...lawpool_online_ng,
            name: "lawpool_ng",
            connectTimeout: 60 * 60 * 1000
        },
        {
            ...constitution_online_ng,
            name: "constitution_ng",
            connectTimeout: 60 * 60 * 1000
        },
        {
            ...civilprocedurerules_online_ng,

            name: "civilprocedurerules_ng",
            connectTimeout: 60 * 60 * 1000
        }
    ] as MysqlConnectionOptions[]);
}
```

```json
// ormconfig.json
[
    {
        "name": "lawpool_online_ng",
        "type": "mysql",
        "host": "vmi352052.contaboserver.net",
        "port": 3306,
        "username": "wrn-server-rs",
        "password": "wrn-remote-labs123@",
        "database": "lawpool_ng",
        "synchronize": false,
        "logging": false,
        "entities": ["build/Database/lawpool-schema/ng/*.js"]
    },
    {
        "name": "constitution_online_ng",
        "type": "mysql",
        "host": "vmi352052.contaboserver.net",
        "port": 3306,
        "username": "wrn-server-rs",
        "password": "wrn-remote-labs123@",
        "database": "constitution_ng",
        "synchronize": false,
        "logging": false,
        "entities": ["build/Database/entities/constitution-schema/ng/*.js"]
    },
    {
        "name": "civilprocedurerules_online_ng",
        "type": "mysql",
        "host": "vmi352052.contaboserver.net",
        "port": 3306,
        "username": "wrn-server-rs",
        "password": "wrn-remote-labs123@",
        "database": "civilprocedurerules_ng",
        "synchronize": false,
        "logging": false,
        "entities": [
            "build/Database/entities/civilprocedurerules-schema/ng/*.js"
        ]
    },
    {
        "name": "weeklyreports_users_online",
        "type": "mysql",
        "host": "vmi352052.contaboserver.net",
        "port": 3306,
        "username": "wrn-server-rs",
        "password": "wrn-remote-labs123@",
        "database": "weeklyreports_userschema",
        "synchronize": false,
        "logging": false,
        "entities": ["build/Database/entities/weeklyreports_userschema/*.js"]
    }
]
```
