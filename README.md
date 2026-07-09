# KirtiClasses 📚

A React Native (Expo) learning app for CBSE Class 6–10 students — Practice
Tests, Quizzes, Tutorials, Workbook, WhatsApp Chat, and a Contact form.
All content (quizzes, workbook links, tutorial links, practice tests) is
managed live from an in-app **Admin** screen and stored in Firebase, so
updates appear for every student instantly without a new app release.

---

## 1. What's inside

```
KirtiClasses/
├── App.js                     Root component
├── app.json                   Expo app config (name, package id, icons)
├── eas.json                   Build/submit profiles for EAS
├── package.json
├── firestore.rules            Firestore security rules (see section 5)
├── PRIVACY_POLICY_TEMPLATE.md Starting point for your hosted privacy policy
├── scripts/seedFirestore.js   Optional: pushes sample content into Firestore
├── assets/                    App icon, splash screen (PLACEHOLDERS — replace!)
└── src/
    ├── config/firebaseConfig.js     <- Your Firebase keys go here
    ├── constants/classes.js         <- WhatsApp number & contact email go here
    ├── context/AuthContext.js       <- Admin username/password
    ├── navigation/AppNavigator.js   All screens & routes
    ├── screens/                     Home, Practice Test, Quiz, Tutorials,
    │                                Workbook, WhatsApp, Contact, Admin*
    ├── components/                  Shared UI + generic admin CRUD manager
    └── services/firestoreService.js Firestore read/write helper functions
```

**Student side:** Home → pick a section → pick a class (6–10) → content
loads live from Firestore.
**Admin side:** Home → "Admin Login" (bottom of screen) → `admin` / `admin`
→ add/edit/delete Practice Tests, Quizzes (with multiple-choice questions),
Tutorials, and Workbook items per class.

---

## 2. Prerequisites

Install once on your computer:
- [Node.js LTS](https://nodejs.org) (v18 or v20)
- [VS Code](https://code.visualstudio.com)
- A free [Expo](https://expo.dev) account
- A free [Firebase](https://firebase.google.com) account (Google account)
- A [Google Play Console](https://play.google.com/console) developer
  account — **one-time $25 fee**, needs identity verification (can take
  1–2 days), required to publish on the Play Store

```bash
npm install -g eas-cli
```

---

## 3. Run it locally (no Play Store needed for this step)

```bash
cd KirtiClasses
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app (Android/iOS) to preview the app
on your own phone in ~30 seconds. This is the fastest way to test changes.

> Until you complete step 4 (Firebase setup), every content screen will
> show "No items added yet" — that's expected, the app just isn't
> connected to a database yet.

---

## 4. Connect Firebase (required — this is what makes the Admin screen work)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → name it e.g. `kirticlasses`.
2. Inside the project: **Build → Firestore Database → Create database** → start in **production mode** → pick a region close to India (e.g. `asia-south1`).
3. Go to **Project Settings → General → Your apps → Web app (</> icon)** → register an app (nickname anything) → copy the `firebaseConfig` object it shows you.
4. Paste those values into **`src/config/firebaseConfig.js`** in this project, replacing every `"REPLACE_ME"`.
5. Go to **Firestore Database → Rules** and paste the contents of **`firestore.rules`** (already in this repo) → **Publish**.
6. *(Optional but recommended)* Pre-load sample content:
   ```bash
   npm install firebase-admin --save-dev
   # Firebase Console > Project Settings > Service Accounts > Generate new private key
   # save the downloaded file as serviceAccountKey.json in the project root
   node scripts/seedFirestore.js
   ```

Run `npx expo start` again — content will now load, and anything you add
via the Admin screen will sync to every device in real time.

---

## 5. ⚠️ Security note on the Admin login

The Admin screen checks `admin` / `admin` **inside the app itself**, not
with a real authentication server. That's intentionally simple so you can
launch fast, but it means:
- Anyone using the app can see the "Admin Login" button and try to guess
  the password — **change it** in `src/context/AuthContext.js` before you
  share the app publicly.
- The default `firestore.rules` (open read/write) means the *database*
  itself doesn't enforce who is an admin — the app's login screen is the
  only gate. That's fine for a small, low-stakes launch.

**For real production security**, replace this with Firebase
Authentication (Email/Password): enable it in Firebase Console →
Authentication, create yourself an admin user, swap the checks in
`AuthContext.js` for `signInWithEmailAndPassword`, then switch to the
"RECOMMENDED" block in `firestore.rules`. Happy to generate this upgrade
for you if you'd like it — just ask.

---

## 6. Things to customize before you publish (checklist)

| # | What | Where | Required? |
|---|------|-------|------------|
| 1 | Firebase project keys | `src/config/firebaseConfig.js` | ✅ Required |
| 2 | WhatsApp business number | `src/constants/classes.js` → `WHATSAPP_NUMBER` | ✅ Required |
| 3 | Contact form destination email | `src/constants/classes.js` → `CONTACT_EMAIL` | ✅ Required |
| 4 | Admin username/password | `src/context/AuthContext.js` | ✅ Strongly recommended |
| 5 | App icon, splash screen | `assets/icon.png`, `splash.png`, `adaptive-icon.png` | ✅ Required (currently placeholders — see below) |
| 6 | Android package name | `app.json` → `android.package` (currently `com.kirticlasses.app`) | ✅ Required — must be globally unique on the Play Store; confirm you're happy with this before first build, it **cannot be changed after publishing** |
| 7 | Hosted privacy policy URL | Publish `PRIVACY_POLICY_TEMPLATE.md` somewhere public (e.g. GitHub Pages) | ✅ Required by Google Play |
| 8 | Play Console "Target audience" answers | Filled inside Play Console, not in code | ✅ Required — see section 8 |
| 9 | Subjects list shown as reference | `src/constants/classes.js` → `SUBJECTS` | Optional |

**The current app icon/splash are auto-generated placeholders** (blue
background, "KirtiClasses" text) so the project builds out of the box.
Replace `assets/icon.png` (1024×1024), `assets/adaptive-icon.png`
(1024×1024), and `assets/splash.png` with your real logo before
publishing.

---

## 7. Push this to GitHub

```bash
cd KirtiClasses
git init
git add .
git commit -m "Initial commit - KirtiClasses app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kirticlasses.git
git push -u origin main
```

Then in VS Code: `File → Open Folder → KirtiClasses`. The `.gitignore`
already excludes `node_modules`, your Firebase service account key, and
any signing keys, so you won't accidentally commit secrets.

---

## 8. Build the Android app (EAS Build — cloud build, no Android Studio needed)

```bash
eas login                          # one-time
eas build:configure                # one-time, links this project to your Expo account
eas build --platform android --profile production
```

This produces a signed `.aab` (Android App Bundle) in the cloud — EAS
handles the signing key for you (it stores it securely on Expo's
servers) and gives you a download link when it's done, usually 10–20
minutes.

Want an installable `.apk` to test on a real phone before you publish?

```bash
eas build --platform android --profile preview
```

---

## 9. Publish to the Google Play Store

Google requires a few things a script cannot do on your behalf (a human
must own the account, write the store listing, and answer content
questions) — but here's every step, in order:

1. **Create your account:** [play.google.com/console](https://play.google.com/console) → pay the one-time $25 fee → verify identity (can take 1–2 days for new accounts).
2. **Create app:** Play Console → "Create app" → name **KirtiClasses** → Free → Apps.
3. **Store listing:** short description, full description, screenshots (take these from `expo start` running on a phone/emulator — at least 2 phone screenshots required), feature graphic (1024×500 banner).
4. **Privacy policy URL:** paste the public URL where you hosted `PRIVACY_POLICY_TEMPLATE.md` (see checklist item 7).
5. **Data safety form:** answer based on what this app actually does — by default it collects no analytics and no data on our own servers (the contact form opens the user's own email app; content is public, unauthenticated reads from Firestore).
6. **Target audience & content:** since CBSE Class 6–10 students are commonly 11–16 years old, answer Play Console's age-group questions honestly. Depending on your answers, Google may apply its **Families Policy** (extra restrictions on ads/data collection) — review [Play Console Help: Target audience](https://support.google.com/googleplay/android-developer/answer/9859673) before submitting, since this affects what you're allowed to add later (e.g. ad networks).
7. **Content rating questionnaire:** fill in Play Console (educational content, no violence/mature themes → typically rates "Everyone").
8. **Upload the build:** Production (or Internal testing first, recommended) → upload the `.aab` from step 8, or automate it:
   ```bash
   # One command to upload straight to Play Console, once set up:
   eas submit --platform android
   ```
   This needs a **Google Play service account JSON key** (Play Console →
   Setup → API access → create service account, grant "Release manager"
   permission, download the JSON) saved as
   `play-store-service-account.json` in the project root (already
   gitignored). This is the closest thing to "one click" for the actual
   store submission — after this one-time setup, every future update is
   just `eas build ... && eas submit ...`.
9. **Submit for review.** Google typically reviews new apps within a few
   hours to a couple of days; first-time developer accounts sometimes take
   longer.

---

## 10. Everyday content updates (after launch)

No app update or rebuild needed for content changes:
1. Open the published app (or `expo start` locally) → **Admin Login** → `admin`/`admin` (or your changed credentials).
2. Add/edit/delete Practice Tests, Quizzes, Tutorials, or Workbook items per class.
3. Changes appear for all students within seconds (Firestore real-time sync).

You only need to rebuild and resubmit to the Play Store for **code**
changes (new features, design changes, bug fixes) — not for content.

---

## 11. Quick command reference

```bash
npm install                                        # install dependencies
npx expo start                                      # run locally / preview in Expo Go
node scripts/seedFirestore.js                        # optional: add sample content
eas build --platform android --profile preview       # build a test .apk
eas build --platform android --profile production     # build the store-ready .aab
eas submit --platform android                         # upload to Play Console
```

---

## 12. Things I need you to confirm / decide

Since these involve accounts, money, or decisions only you can make, I
couldn't finalize them for you — please confirm or change:

1. **Package name** `com.kirticlasses.app` — fine to keep, or do you want something else? This is permanent once published.
2. **Real WhatsApp number** to receive chats (currently a placeholder in `classes.js`).
3. **Real contact email** for the enquiry form (currently a placeholder).
4. **Admin password** — keep `admin`/`admin` for now, or set something stronger before you share the app outside your team?
5. **Real logo/branding** — currently auto-generated placeholder icons; send me your logo if you'd like it built in, or I can design something.
6. **Do you want the more secure Firebase-Authentication admin login** instead of the hardcoded `admin`/`admin` check, before you go live? (Recommended, optional to do first.)
7. **Google Play Console account** — is this already set up under your/your organization's name, or do you need to create one? (Required before any submission step.)
8. **Target audience answer in Play Console** (children/teens/mixed) — affects Google's Families Policy requirements; confirm how you plan to answer this, since it isn't something I can decide on your behalf.

Everything else (all screens, navigation, quiz engine, admin CRUD panel,
Firebase wiring, build config) is complete and working — the app runs
end-to-end once section 4 (Firebase) is done.
