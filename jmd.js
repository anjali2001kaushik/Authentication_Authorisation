const { MongoClient } = require("mongodb");
const fs = require("fs");

const uri =
  "mongodb+srv://skillrisers:skillrisers@cluster0.gbjkb4e.mongodb.net/?retryWrites=true&w=majority";

async function uploadDataToDocuments(data) {
  const courses_data = data.permissions;
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db("User-Management");
    // const collection = database.collection('courses');
    const collection = database.collection("permissions");

    for (let index = 0; index < courses_data.length; index++) {
      const sectionData = courses_data[index];
      const result = await collection.insertOne(sectionData);
      console.log(`${result} document inserted for section "${sectionData}".`);
    }
  } finally {
    await client.close();
  }
}

const jsonData = JSON.parse(fs.readFileSync("json/permissions.json", "utf8"));
// console.log(jsonData.courses_data);
uploadDataToDocuments(jsonData);
