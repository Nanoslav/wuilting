import {Client, Databases, ID, Permission, Role, Users} from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT)
      .setProject(process.env.APPWRITE_PROJECT)
      .setKey(process.env.APPWRITE_KEY);

  const users = new Users(client);

  const database = new Databases(client);

  if (req.method === 'POST') {
    try {const newUser = req.body;

      const authID = newUser.$id;

      const users = await users.list();
      console.log("USERS", users)
      const user = await users.get(authID);
      console.log("USER", user)

      await database.createDocument(
          'wuilting',
          'users',
          authID,
          {
            "name": user.name,
          },
          [
            Permission.read(Role.any()),
            Permission.update(Role.user(authID)),
            Permission.delete(Role.user(authID))
          ]
      );

      return res.json({
        success: true,
        message: 'User record created successfully.',
      });
    } catch (err) {
      error('Error creating user record:', err);
      error(err.message)

      return res.json({
        success: false,
        message: 'Error creating user record.',
        error: err.message || 'Unknown error',
      });
    }
  }

  return res.json({
    success: false,
    message: 'Invalid Method',
  });
};
