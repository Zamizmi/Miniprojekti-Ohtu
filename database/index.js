var mongodb = require("mongodb");
const TIPS_COLLECTION = "TIPS";
let uri;
try {
    uri = require("../config").dburi;
} catch (error) {
    uri = process.env.MONGODB_URI;
}

// Create a database variable outside of the database connection callback to reuse the connection pool
var db;
class database {
    // Connect to the database
    connect() {
        mongodb.MongoClient.connect(uri, function (err, database) {
            if (err) {
                console.log(err);
                process.exit(1);
            }

            // Save database object from the callback for reuse
            db = database;
            console.log("Database connection ready");
        });
    }

    getAllTips(callback) {
        db.collection(TIPS_COLLECTION).find({}).toArray(function (err, docs) {
            if (err) throw err;

            callback(docs);
        });
    }
}

module.exports = new database;