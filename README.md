# Szark Chat

Szark Chat is a real-time chat application built with Firebase and Next.js. It allows users to authenticate using Google and exchange messages in real-time.

## Features

- **Google Authentication**: Users can sign in and out using their Google accounts.
- **Real-Time Messaging**: Messages are stored in Firestore and updated in real-time.
- **Firebase Integration**: Uses Firebase for authentication, Firestore for the database, and environment variables for secure configuration.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sharkofwitch/szark-chat.git
   cd szark-chat
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your Firebase configuration:

   ```plaintext
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=your-database-url
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

   Replace the placeholders with your Firebase project settings.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## Project Structure

```
szark-chat/
├── public/               # Static assets
├── szark-frontend/       # Frontend source code
│   ├── firebase.js       # Firebase configuration and initialization
│   ├── components/       # Reusable React components
│   ├── pages/            # Next.js pages
│   ├── styles/           # CSS and styling files
├── .env.local            # Environment variables (not committed to Git)
├── .gitignore            # Files and directories to ignore in Git
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

---

## Deployment

To deploy the application, follow these steps:

1. Choose a hosting platform (e.g., [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/)).
2. Add the environment variables in the platform's settings.
3. Deploy the project using the platform's deployment process.

---

## Environment Variables

The following environment variables are required for the project:

| Variable Name                     | Description                          |
|-----------------------------------|--------------------------------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY`    | Firebase API key                     |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`| Firebase Auth domain                 |
| `NEXT_PUBLIC_FIREBASE_DATABASE_URL`| Firebase Realtime Database URL       |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID                  |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`| Firebase Storage Bucket            |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`| Firebase Messaging Sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID`     | Firebase App ID                      |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch.
4. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Firebase](https://firebase.google.com/) for backend services.
- [Next.js](https://nextjs.org/) for the frontend framework.
- [React](https://reactjs.org/) for building the UI.

---

## Troubleshooting

### Common Issues

1. **`auth/invalid-api-key` Error**:
   - Ensure your `.env.local` file contains the correct Firebase API key.
   - Restart the development server after updating the `.env.local` file.

2. **Duplicate Firebase Initialization**:
   - Ensure `firebase.js` checks for existing Firebase apps using `getApps()`.

3. **Environment Variables Not Loaded**:
   - Verify the `.env.local` file is in the root directory.
   - Ensure the `NEXT_PUBLIC_` prefix is used for all variables.

---

Happy coding!
