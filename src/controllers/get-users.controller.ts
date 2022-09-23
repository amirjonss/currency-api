import {get} from '@loopback/rest';
import {MongoClient} from 'mongodb';

const uri = 'mongodb+srv://amirjon:asd123@cluster0.u7abbtg.mongodb.net';
const client = new MongoClient(uri);

export class GetUsersController {


  @get('/users', {
    responses: {
      '200': {
        description: 'greeting text',
        content: {
          'application/json': {
            schema: {type: 'string'},
          },
        },
      },
    },
  })
  getUsers() {
    // const uri = "mongodb+srv://amirjon:asd123@cluster0.u7abbtg.mongodb.net";
    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);
    async function run(): Promise<Array<object>> {
      try {
        const database = client.db("Currency");
        const dbUsers = database.collection("user")

        const cursor = dbUsers.find()
        return await cursor.toArray()
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
    return run()
  }
  // greet(@param.query.string('name') name: string) {
  //   return `hello ${name}`;
  // }
}