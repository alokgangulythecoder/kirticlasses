/**
 * Optional helper: pushes a few sample Practice Tests, Quizzes, Tutorials
 * and Workbook entries into Firestore so the app isn't empty the first
 * time you open it. You can skip this entirely and add everything from
 * the in-app Admin screen instead.
 *
 * SETUP:
 *   1. npm install firebase-admin --save-dev
 *   2. Firebase Console > Project Settings > Service Accounts >
 *      "Generate new private key" -> save the file as
 *      serviceAccountKey.json in the project root (already gitignored).
 *   3. node scripts/seedFirestore.js
 */
const admin = require("firebase-admin");
const path = require("path");

let serviceAccount;
try {
  serviceAccount = require(path.join(__dirname, "..", "serviceAccountKey.json"));
} catch (e) {
  console.error(
    "\nMissing serviceAccountKey.json in the project root.\n" +
      "Download it from Firebase Console > Project Settings > Service Accounts,\n" +
      "save it as serviceAccountKey.json, then re-run this script.\n"
  );
  process.exit(1);
}

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

async function seed() {
  const practiceTests = [
    { classLevel: "6", subject: "Mathematics", title: "Chapter 1 - Knowing Our Numbers", url: "https://example.com/sample.pdf" },
    { classLevel: "6", subject: "Science", title: "Chapter 1 - Food: Where Does It Come From", url: "https://example.com/sample.pdf" },
  ];

  const tutorials = [
    { classLevel: "6", subject: "Mathematics", title: "Introduction to Whole Numbers", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ];

  const workbooks = [
    { classLevel: "6", subject: "English", title: "Grammar Worksheet - Nouns & Pronouns", url: "https://example.com/sample.pdf" },
  ];

  const quizzes = [
    {
      classLevel: "6",
      subject: "Mathematics",
      title: "Quick Quiz - Whole Numbers",
      questions: [
        {
          question: "What is the smallest whole number?",
          options: ["0", "1", "-1", "10"],
          correctIndex: 0,
        },
        {
          question: "Which of these is NOT a whole number?",
          options: ["5", "0", "-3", "100"],
          correctIndex: 2,
        },
      ],
    },
  ];

  for (const item of practiceTests) await db.collection("practiceTests").add({ ...item, createdAt: Date.now() });
  for (const item of tutorials) await db.collection("tutorials").add({ ...item, createdAt: Date.now() });
  for (const item of workbooks) await db.collection("workbooks").add({ ...item, createdAt: Date.now() });
  for (const item of quizzes) await db.collection("quizzes").add({ ...item, createdAt: Date.now() });

  console.log("Sample content added for Class 6. Log into the Admin screen to add the rest.");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
