import { createConnection, DataSource } from "typeorm";

export const Session: (action: (datasource: DataSource) => Promise<void>) => void = (action) => {
    createConnection({
        type: "sqlite",
        database: "test.db",
        entities: [
            __dirname + "/entity/*.js"
        ],
        synchronize: true,
        logging: false
    }).then(connection => {
        action(connection);
        connection.close();
    }).catch(error => console.log(error));
}