import {get} from '@loopback/rest';
const { MongoClient } = require("mongodb");


export class HelloController {
  @get('/hello')
  hello(): string {
    // const uri = "mongodb+srv://amirjon:asd123@cluster0.u7abbtg.mongodb.net";
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    async function run() {
      try {
        const database = client.db("Currency");
        const haiku = database.collection("user");
        // create a document to insert
        const doc = [
          {id: 1, name: 'Vasya'},
          {id: 2, name: 'Vasya1'},
          {id: 3, name: 'Vasya2'},
          {id: 4, name: 'Vasya3'},
          {id: 5, name: 'Vasya4'},
        ]

        const options = { ordered: true };
        const result = await haiku.insertMany(doc, options);
        // const result = await haiku.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
    return 'Hello world!';
  }


}