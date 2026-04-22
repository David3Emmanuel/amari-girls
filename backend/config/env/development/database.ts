import path from 'path'

export default ({ env }) => {
  const databaseUrl = env('DATABASE_URL')
  if (databaseUrl)
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: databaseUrl,
        },
        acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
      },
    }

  return {
    client: 'sqlite',
    connection: {
      filename: path.join(
        __dirname,
        '..',
        '..',
        env('DATABASE_FILENAME', '.tmp/data.db'),
      ),
    },
    useNullAsDefault: true,
  }
}
