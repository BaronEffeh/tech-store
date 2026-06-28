const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// Simple test function
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello Firebase Works");
});

// Debug callable function
exports.setAdminRole = functions.https.onCall(async (data, context) => {
  console.log("context.auth =", context.auth);

  if (!context.auth) {
    throw new functions.https.HttpsError(
        "unauthenticated",
        "You must be logged in",
    );
  }

  return {
    uid: context.auth.uid,
  };
});
