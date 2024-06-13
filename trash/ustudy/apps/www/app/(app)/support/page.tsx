"use client"
import { Metadata, type NextPage } from "next"
import Image from "next/image"
import { initializeApp } from "firebase/app"
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
import { z } from "zod"
import GroupComponent from "@/components/specialty-page/group-component"
import TableCell from "@/components/specialty-page/table-cell"
import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { taskSchema } from "./data/schema"

const firebaseConfig = {
  apiKey: "AIzaSyAj8jpnqU9Xo1YXVFJh-wCdulweO5z--H8",
  authDomain: "ustudy-96678.firebaseapp.com",
  projectId: "ustudy-96678",
  storageBucket: "ustudy-96678.appspot.com",
  messagingSenderId: "581632635532",
  appId: "1:581632635532:web:51ccda7d7adce6689a81a9",
}
const app = initializeApp(firebaseConfig)
const db: any = getFirestore(app)
import FrameComponent from "@/components/support/frame-component"
import { useEffect, useState } from "react"



// async function getTasks() {
//     // const data = await fs.readFile(
//     //   path.join(process.cwd(), "app/(app)/calculator/data/tasks.json")
//     // )
//     const [users, setUsers] = useState<any>([]);
//     useEffect(() => {
//       const fetchDocs = async () => {
//         const q = query(collection(db, "users"));
//         const querySnapshot = await getDocs(q);
//         const newDocs: any = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setUsers(newDocs);
//       };
//       fetchDocs();
//     }, []);

//     const q = query(collection(db, "supports"))
//     const querySnapshot = await getDocs(q)
//     const newDocs = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       topcs: doc.data().topcs,
//       comment: doc.data().comment,
//       userId: doc.data().userId,
//       // name: doc.data().specialtyName,
//       // code: doc.data().specialtyCode,
//       // generalQuota: doc.data().possibleScoreGeneralCompetition,
//       // ruralQuota: doc.data().possibleScoreRuralQuota,
//       ...doc.data(),
//     }))

//     const tasks = newDocs

//     return tasks
//   }

// async function TaskPage() {

//   const [supports, setSupports] = useState<any>([]);
//   const [users, setUsers] = useState<any>([]);
//   const [tasks, setTasks] = useState<any>([]);
//   useEffect(() => {
//     const fetchSupports = async () => {
//       const q = query(collection(db, "supports"));
//       const querySnapshot = await getDocs(q);
//       const newDocs: any = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSupports(newDocs);
//     };
//     const fetchUsers = async () => {
//       const q = query(collection(db, "users"));
//       const querySnapshot = await getDocs(q);
//       const newDocs: any = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setUsers(newDocs);
//     };


//     const setTable = async () => {
//       const q = query(collection(db, "supports"))
//       const querySnapshot = await getDocs(q)
//       const newDocs = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         topcs: doc.data().topcs,
//         comment: doc.data().comment,
//         userId: users.map((user: any) => user.userId === doc.data().userId ? user.name : ""),
//         ...doc.data(),
//       }))
//       setTasks(newDocs);
//     }

//     setTable();
//     fetchSupports();
//     fetchUsers();
//   }, []);


//   return (
//     <>
//       <div className="md:hidden">
//         <Image
//           src="/examples/tasks-light.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/tasks-dark.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="hidden dark:block"
//         />
//       </div>
//       <div className="hidden h-full flex-1 flex-col space-y-8 p-8 pt-0 md:flex">
//         <div className="flex items-center justify-between space-y-2">
//           <div>
//             <h2 className="bg-gradient-to-r from-yellow-600 to-pink-600 bg-clip-text text-[3rem] font-bold tracking-tight text-transparent">
//               History of supports we provided.
//             </h2>
//             {/* <p className="text-muted-foreground">
//                 Here&apos;s a list of super usefull specialties you can from Ustudy!
//               </p> */}
//           </div>
//           {/* <div className="flex items-center space-x-2">
//               <UserNav />
//             </div> */}

//           {users.map((user: any) => <p key={user}>{user.userId}</p>)}
//         </div>
//         <DataTable data={tasks} columns={columns} />
//       </div>
//     </>
//   )
// }


const SupportPage: NextPage = () => {

  const [supports, setSupports] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
  const [tasks, setTasks] = useState<any>([]);
  const [userName, setUserName] = useState<any>("");

  useEffect(() => {

    // {users.map((user: any) => {
    //   const matchedSubjects = supports.find((tag: any) =>
    //     tag.userId === user.userId
    //   );
    //   if (matchedSubjects) {
    //     setUserName(user.name); // Update the userName state
    //   }
    //   return null;
    // })}


    const fetchSupports = async () => {
      const q = query(collection(db, "supports"));
      const querySnapshot = await getDocs(q);
      const newDocs: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSupports(newDocs);
    };
    const fetchUsers = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const newDocs: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(newDocs);
    };
    const setTable = async () => {
      const q = query(collection(db, "supports"))
      const querySnapshot = await getDocs(q)
      // const newDocs = querySnapshot.docs.map((doc) => ({
      //   // id: doc.id,
      //   topics: doc.data().topics,
      //   comment: doc.data().comment,
      //   // userName: users.find((user: any) => user.userId === doc.data().userId ? user.name : "fdsafsdafsd"),
      //   // userName: users.map((user: any) => {
      //   //   const matchedSubjects = supports.find((tag: any) =>
      //   //     tag.userId === user.userId
      //   //   );
      //   //   return matchedSubjects ? user.name : "fdsdsf";
      //   // }),
      //   // id: doc.data().userId,
      //   userName: userName,
      //   ...doc.data(),
      // }))
      const newDocs = querySnapshot.docs.map((doc) => {
        // Find the user that matches the userId of the current doc
        // const user = users.find((user: any) => doc.data().userId === user.userId);
        // const user = users.find((tag: any) =>
        //   tag.userId === doc.data().userId
        // );

        return {
          topics: doc.data().topics,
          comment: doc.data().comment,
          userName: doc.data().name, // Use the user's name if found, otherwise use a default value
          ...doc.data(),
        }
      })
      setTasks(newDocs);
    }

    setTable();
    fetchSupports();
    fetchUsers();
  }, []);

  return (
    <div className="relative box-border flex w-full flex-col items-start justify-start gap-4 overflow-hidden bg-black px-0 pb-32 pt-0 leading-[normal] tracking-[normal]">
      <FrameComponent />

      <div className="mx-auto mt-16 w-auto lg:w-[1150px]">
        {/* <TaskPage /> */}
        <div className="md:hidden">
          <Image
            src="/examples/tasks-light.png"
            width={1280}
            height={998}
            alt="Playground"
            className="block dark:hidden"
          />
          <Image
            src="/examples/tasks-dark.png"
            width={1280}
            height={998}
            alt="Playground"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 pt-0 md:flex">
          <div className="flex flex-col items-center justify-between space-y-2">
            <div>
              <h2 className="bg-gradient-to-r from-yellow-600 to-pink-600 bg-clip-text text-[3rem] font-bold tracking-tight text-transparent">
                History of supports we provided.
              </h2>
              {/* <p className="text-muted-foreground">
                Here&apos;s a list of super usefull specialties you can from Ustudy!
              </p> */}
            </div>
            {/* <div className="flex items-center space-x-2">
              <UserNav />
            </div> */}
            <div className="flex flex-col items-start justify-start gap-3">
              {/* {users.map((user: any) => <p key={user}>{user.name}</p>)} */}
              {/* {users.map((user: any) => 
                // tasks.find((task: any) => user.userId === task.id ? <p key={task}>{user.name}</p> : "Nothing macthes but why??")
                 supports.find((task: any) => task.id === user.userId && <p key={task}>{user.name}</p>)
              )} */}
              {/* {users.map((user: any) => {
                const matchedSubjects = supports.find((tag: any) =>
                  tag.userId === user.userId
                );
                return matchedSubjects ? (
                  <p key={user}>{user.name}</p>
                ) : null;
              })} */}


            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>
      </div>
    </div>
  )
}

export default SupportPage;