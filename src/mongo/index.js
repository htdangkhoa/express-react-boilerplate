/* @flow */
import { MongoClient } from 'mongodb';
import { type MongoConnectionType, type MongoResultType } from 'types';

const useMongo = ({
  host,
  database,
  user,
  password,
  app,
}: MongoConnectionType): Promise<MongoResultType> =>
  MongoClient.connect(host, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: !user || !password ? null : { user, password },
  })
    .then((client) => {
      const db = client.db(database);

      const usersCollection = db.collection('users');

      const result: MongoResultType = {
        client,
        db,
      };

      if (app) {
        const { request } = app;

        Object.assign(request, { ...result, usersCollection });
      }

      return result;
    })
    .catch((error) => {
      throw error;
    });

export default useMongo;
