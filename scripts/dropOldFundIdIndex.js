const mongoose = require("mongoose");
require("dotenv").config();

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const collection = mongoose.connection.collection("savedfunds");

    const indexes = await collection.indexes();
    console.log("📋 Current Indexes:", indexes);

    const fundIdIndex = indexes.find((index) => index.name === "fundId_1");
    if (fundIdIndex) {
      await collection.dropIndex("fundId_1");
      console.log("✅ Dropped old unique index on fundId");
    } else {
      console.log("ℹ️ No old fundId_1 index found — already clean.");
    }

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error dropping index:", error.message);
    process.exit(1);
  }
};

run();
