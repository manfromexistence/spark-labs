Things to do:
1. functinality to add many student by csv file.
2. close menu after action
3. add automatically after creating classrooms
4. preview prjoect & remove unnessasary socail account links
5. giving you access to firebase & deploying to your hosting

# Workshop Website for Scratch Visual Programming Language

## Project Overview

This project is developed by **MD MAHABUB HOSSAIN** for **Hareem Fatima** as a part of an Upwork contract. The main goal of this project is to create a workshop website where Hareem Fatima can teach students about the Scratch visual programming language.

## Scratch Visual Programming Language

Scratch is a block-based visual programming language targeted primarily at children. Users of the site can create online projects using a block-like interface. With Scratch, you can program your own interactive stories, games, and animations — and share your creations with others in the online community.

## Features

The website includes the following features:

1. **User Registration**: Allows students to register for the workshop.
2. **Course Content**: Provides a detailed curriculum of the Scratch programming language.
3. **Interactive Learning**: Includes interactive Scratch blocks for hands-on learning.
4. **Discussion Forum**: A platform for students to ask questions and discuss their learnings.
5. **Progress Tracker**: Tracks and displays the student's progress in the course.

## Technologies Used

The website is built using the following technologies:

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

Follow the steps below to set up the project on your local machine:

1. Clone the repository: `git clone https://github.com/username/projectname.git`
2. Navigate into the project directory: `cd projectname`
3. Install the dependencies: `npm install`
4. Start the server: `npm start`

Now, the server should be up and running at `http://localhost:3000`.

## Contributing

We welcome contributions from the community. If you wish to contribute, please take a moment to review our **Contributing Guidelines**.

## License

This project is licensed under the MIT License. See the **LICENSE** file for more details.

## Contact

For any queries or suggestions, please feel free to reach out to MD MAHABUB HOSSAIN.

Happy Learning!




















































In React Typescript I have firebase firestore and firebase
auth in it. I need ou to make a file picker which will only
add csv files. That csv file has bookname and bookauthor 
I need you to get the csv info using a npm library then add 
this info to firabase database.

Here is my fireabase configurations:
```
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    query,
    startAfter,
    updateDoc,
} from "firebase/firestore"
import { initializeApp } from "firebase/app"
const firebaseConfig = {
    apiKey: "AIzaSyBbh73d_g_CVG0PZPlljzC6d8U-r0DRTFk",
    authDomain: "snap-workspace.firebaseapp.com",
    projectId: "snap-workspace",
    storageBucket: "snap-workspace.appspot.com",
    messagingSenderId: "1092527848130",
    appId: "1:1092527848130:web:a6ad15060f8d379b43595b",
    measurementId: "G-JVEZGJHL8H"
}

const app = initializeApp(firebaseConfig)
const db: any = getFirestore(app)
const auth = getAuth(app);
```