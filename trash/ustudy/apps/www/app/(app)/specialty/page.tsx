/* eslint-disable tailwindcss/no-contradicting-classname */
// import { promises as fs } from "fs"
import path from "path"
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

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }

// Simulate a database read for tasks.
async function getTasks() {
  // const data = await fs.readFile(
  //   path.join(process.cwd(), "app/(app)/calculator/data/tasks.json")
  // )

  const q = query(collection(db, "specialties"))
  const querySnapshot = await getDocs(q)
  const newDocs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().name,
    code: doc.data().specialtyCode,
    generalQuota: doc.data().possibleScoreGeneralCompetition,
    level: doc.data().level,
    ...doc.data(),
  }))

  const tasks = newDocs

  return tasks
}

async function TaskPage() {
  const tasks = await getTasks()

  return (
    <>
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
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-blueviolet-100 text-[2.5rem] font-bold tracking-tight">
              Specialty
            </h2>
            {/* <p className="text-muted-foreground">
              Here&apos;s a list of super usefull specialties you can from Ustudy!
            </p> */}
          </div>
          {/* <div className="flex items-center space-x-2">
            <UserNav />
          </div> */}
        </div>
        <DataTable data={tasks} columns={columns} />
      </div>
    </>
  )
}
const SpecialtyPage: NextPage = () => {
  return (
    <div className="relative box-border flex min-h-screen w-full flex-col items-start justify-start overflow-hidden bg-black px-0 pb-[13px] pt-0 leading-[normal] tracking-[normal]">
      {/* <GroupComponent /> */}

      <div className="mx-auto w-auto lg:w-[1150px]">
        <TaskPage />
      </div>
    </div>
  )
}

export default SpecialtyPage

{
  /* <main className="flex max-w-full flex-col items-start justify-start self-stretch">
        <form className="m-0 flex max-w-full flex-col items-end justify-start self-stretch">
          <GroupComponent />
          <div className="!mx-auto !mb-32 mt-[-17px] box-border flex w-[1413px] max-w-full flex-row items-start justify-center border !p-10 px-5">
            <div className="bg-gray1-500 border-gray1-200 mq750:box-border mq750:pb-9 z-[3] box-border flex w-[1235px] max-w-full shrink-0 flex-col items-start justify-start overflow-hidden rounded-lg border-DEFAULT border-solid px-0 !pb-0 pb-[55px] pt-0 shadow-[0px_4px_8px_-2px_rgba(16,_24,_40,_0.1),_0px_2px_4px_-2px_rgba(16,_24,_40,_0.06)]">
              <div className="flex max-w-full flex-row flex-wrap items-start justify-start self-stretch [row-gap:20px]">
                <div className="mq750:min-w-full flex min-w-[565px] max-w-full flex-1 flex-col items-start justify-start overflow-x-auto">
                  <div className="bg-gray1-400 border-gray1-400 box-border flex w-[807px] flex-row items-center justify-start border-b-DEFAULT border-solid px-6 pb-[13px] pt-[15px]">
                    <div className="flex flex-row items-center justify-start">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[66px] text-left text-sm font-medium leading-[18px] text-gray-500">
                        Speciality
                      </div>
                    </div>
                  </div>
                  <TableCell
                    avatar="/avatar@2x.png"
                    text="Olivia Rhye"
                    supportingText="Mathematics teacher training"
                  />
                  <TableCell
                    avatar="/avatar@2x.png"
                    text="Olivia Rhye"
                    supportingText="Fashion, design"
                    propWidth="73px"
                    propDisplay="inline-block"
                    propMinWidth="113px"
                  />
                  <TableCell
                    avatar="/avatar@2x.png"
                    text="Phoenix Baker"
                    supportingText="Marketing and advertising"
                    propWidth="95px"
                    propDisplay="unset"
                    propMinWidth="unset"
                  />
                  <div className="border-gray1-200 box-border flex w-[807px] flex-row items-center justify-start gap-[12px] border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="rounded-181xl bg-primary-50 relative hidden size-8">
                      <div className="font-text-sm-normal text-primary-600 absolute left-[calc(50%_-_16px)] top-[calc(50%_-_10px)] inline-block w-8 text-center text-sm font-medium leading-[20px]">
                        LS
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <div className="font-text-sm-normal relative hidden w-[83px] text-left text-sm leading-[20px] text-gray-900">
                        Lana Steiner
                      </div>
                      <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                        Biological and related sciences
                      </div>
                    </div>
                  </div>
                  <div className="border-gray1-200 box-border flex w-[807px] flex-row items-center justify-start gap-[12px] border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="rounded-181xl bg-primary-50 relative hidden size-8">
                      <div className="font-text-sm-normal text-primary-600 absolute left-[calc(50%_-_16px)] top-[calc(50%_-_10px)] inline-block w-8 text-center text-sm font-medium leading-[20px]">
                        DW
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <div className="font-text-sm-normal relative hidden w-[101px] text-left text-sm leading-[20px] text-gray-900">
                        Demi Wilkinson
                      </div>
                      <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                        Biological and related sciences
                      </div>
                    </div>
                  </div>
                  <TableCell
                    avatar="/avatar@2x.png"
                    text="Candice Wu"
                    supportingText="Biological and related sciences"
                    propWidth="80px"
                    propDisplay="unset"
                    propMinWidth="unset"
                  />
                  <div className="border-gray1-200 box-border flex w-[807px] flex-row items-center justify-start gap-[12px] border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="rounded-181xl bg-primary-50 relative hidden size-8">
                      <div className="font-text-sm-normal text-primary-600 absolute left-[calc(50%_-_16px)] top-[calc(50%_-_10px)] inline-block w-8 text-center text-sm font-medium leading-[20px]">
                        NC
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start">
                      <div className="font-text-sm-normal relative hidden w-[78px] text-left text-sm leading-[20px] text-gray-900">
                        Natali Craig
                      </div>
                      <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                        Biological and related sciences
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-[214px] flex-col items-start justify-start">
                  <div className="bg-gray1-400 border-gray1-400 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-[13px] pt-[15px]">
                    <div className="flex flex-row items-center justify-start">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[51px] text-left text-sm font-medium leading-[18px] text-gray-500">
                        Subject
                      </div>
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start border-b-DEFAULT border-solid pb-6 pl-6 pr-[17px] pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                      {" "}
                      Mathematics - Physics
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-6 pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[105px] text-left text-base text-gray-500">
                      Сreative exam
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start border-b-DEFAULT border-solid pb-6 pl-[23px] pr-0 pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative inline-block w-[196px] text-left text-base text-gray-500">
                      Mathematics - Geography
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                      Biology - Chemistry
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                      Biology - Chemistry
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                      Biology - Chemistry
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-[23px] pb-6 pt-[25.5px]">
                    <div className="font-headings-desktop-poppins-16px-bold relative text-left text-base text-gray-500">
                      Biology - Chemistry
                    </div>
                  </div>
                </div>
                <div className="flex w-[214px] flex-col items-start justify-start">
                  <div className="bg-gray1-400 border-gray1-400 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-[13px] pt-[15px]">
                    <div className="flex flex-row items-center justify-start">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[36px] text-left text-sm font-medium leading-[18px] text-gray-500">
                        Code
                      </div>
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <div className="bg-gray1-400 box-border flex w-[66px] flex-row items-center justify-start rounded-md py-2 pl-3 pr-0">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block w-[131px] shrink-0 text-left text-base">
                        B009
                      </div>
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <div className="bg-gray1-400 box-border flex w-[66px] flex-row items-center justify-start rounded-md py-2 pl-3 pr-0">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block w-[131px] shrink-0 text-left text-base">
                        B031
                      </div>
                    </div>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <button className="bg-gray1-400 hover:bg-darkslategray flex cursor-pointer flex-row items-center justify-start rounded-md py-2 pl-3 pr-[15px] [border:none]">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block min-w-[39px] text-left text-base">
                        B047
                      </div>
                    </button>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <button className="bg-gray1-400 hover:bg-darkslategray flex cursor-pointer flex-row items-center justify-start rounded-md px-3 py-2 [border:none]">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block min-w-[42px] text-left text-base">
                        B009
                      </div>
                    </button>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <button className="bg-gray1-400 hover:bg-darkslategray flex cursor-pointer flex-row items-center justify-start rounded-md px-3 py-2 [border:none]">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block min-w-[42px] text-left text-base">
                        B009
                      </div>
                    </button>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <button className="bg-gray1-400 hover:bg-darkslategray flex cursor-pointer flex-row items-center justify-start rounded-md px-3 py-2 [border:none]">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block min-w-[42px] text-left text-base">
                        B009
                      </div>
                    </button>
                  </div>
                  <div className="border-gray1-200 flex flex-row items-center justify-start self-stretch border-b-DEFAULT border-solid px-6 pb-4 pt-[17.5px]">
                    <button className="bg-gray1-400 hover:bg-darkslategray flex cursor-pointer flex-row items-center justify-start rounded-md px-3 py-2 [border:none]">
                      <div className="font-headings-desktop-poppins-16px-bold text-shade-white relative inline-block min-w-[42px] text-left text-base">
                        B009
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <div className="border-gray1-200 flex flex-row items-start justify-end gap-[16px] self-stretch overflow-x-auto border-t-DEFAULT border-solid px-6 pb-4 pt-3">
                <div className="mq450:flex-wrap flex flex-row items-start justify-start gap-[2px] py-0 pl-0 pr-6">
                  <div className="bg-gray1-400 flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-[17px] py-2.5">
                      <div className="font-headings-desktop-poppins-16px-bold text-primary-600 relative inline-block min-w-[6px] text-left text-base font-medium leading-[20px]">
                        1
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-[15px] py-2.5">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[10px] text-left text-base font-medium leading-[20px] text-gray-500">
                        2
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-[15px] py-2.5">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[10px] text-left text-base font-medium leading-[20px] text-gray-500">
                        3
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-3.5 py-2.5">
                      <div className="font-text-sm-normal relative inline-block min-w-[12px] text-left text-sm font-medium leading-[20px] text-gray-500">
                        ...
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-[15px] py-2.5">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[10px] text-left text-base font-medium leading-[20px] text-gray-500">
                        8
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-[14.5px] py-2.5">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[11px] text-left text-base font-medium leading-[20px] text-gray-500">
                        9
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row items-start justify-start overflow-hidden rounded-lg">
                    <div className="flex flex-row items-start justify-start rounded-lg px-[11.5px] py-2.5">
                      <div className="font-headings-desktop-poppins-16px-bold relative inline-block min-w-[17px] text-left text-base font-medium leading-[20px] text-gray-500">
                        10
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start px-0 pb-0 pt-0.5">
                  <button className="flex cursor-pointer flex-row items-start justify-start rounded-lg bg-transparent p-0 [border:none]">
                    <div className="bg-gray1-400 flex flex-row items-start justify-start gap-[8px] overflow-hidden rounded-lg px-3.5 py-2 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)]">
                      <img
                        className="relative size-5 shrink-0 overflow-hidden"
                        alt=""
                        src="/arrowleft.png"
                      />
                      <div className="font-text-sm-normal relative hidden w-[58px] self-stretch text-left text-sm font-medium leading-[20px] text-gray-700">
                        Previous
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex flex-col items-start justify-start px-0 pb-0 pt-0.5">
                  <button className="flex cursor-pointer flex-row items-start justify-start rounded-lg bg-transparent p-0 [border:none]">
                    <div className="bg-gray1-400 flex flex-row items-start justify-start gap-[8px] overflow-hidden rounded-lg px-3.5 py-2 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)]">
                      <div className="font-text-sm-normal relative hidden w-8 self-stretch text-left text-sm font-medium leading-[20px] text-gray-700">
                        Next
                      </div>
                      <img
                        className="relative size-5 shrink-0 overflow-hidden"
                        alt=""
                        src="/arrowright.png"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main> */
}
