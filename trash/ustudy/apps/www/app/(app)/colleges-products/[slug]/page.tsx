"use client"

/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import type { NextPage } from "next"
import Link from "next/link"
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import FrameComponent from "@/components/spcialty-products-page/frame-component"
import { useToast } from "@/registry/default/ui/use-toast"

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

const fetchDocument = async (docId: string) => {
  const docRef = doc(db, "universities", docId)
  const docSnap = await getDoc(docRef)
  return docSnap.data()
  // if (docSnap.exists()) {
  //     return docSnap.data();
  // } else {
  //     // Handle document not found
  //     console.error('Document not found');
  //     return null;
  // }
}

const Collages: any = ({ params }: { params: { slug: string } }) => {
  const [docs, setDocs] = useState<any>([])
  const [lastDoc, setLastDoc] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchDocs = async () => {
      setLoading(true)
      const data = await fetchDocument(params.slug)
      setDocs(data)
      setLoading(false)
    }
    fetchDocs()
  }, [])

  const loadMore = async () => {
    setLoading(true)
    const q = query(
      collection(db, "universities"),
      startAfter(lastDoc),
      limit(8)
    )
    const querySnapshot = await getDocs(q)
    if (querySnapshot.docs.length === 0) {
      toast({
        title: "There is no more data in the database.",
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-primary-foreground p-4">
            <span>Please add more data to load more!</span>
          </div>
        ),
      })
      setLoading(false)
      return
    }
    const newDocs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setDocs([...docs, ...newDocs])
    setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1])
    setLoading(false)
  }

  if (loading) {
    return (
      <main className="h-auto w-full px-[5%] py-5">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-center text-lg font-bold tracking-[-0.02em] drop-shadow-sm md:text-3xl md:leading-[5rem]">
            Collages
          </span>
        </div>
        <div className="admin-panel-lists-loading place-content-center">
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
          <div className="flex min-h-max w-full max-w-[90%] flex-col space-y-3 rounded-xl border p-5">
            <Skeleton className="h-[225px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-full" />
              <Skeleton className="h-7 w-full" />
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      {docs ? (
        <div className="font-headings-desktop-poppins-16px-bold relative box-border flex w-full flex-col items-start justify-start overflow-hidden bg-black px-0 pb-[404px] pt-0 text-center text-xl leading-[normal] tracking-[normal] text-shade-white">
          {docs.images && docs.images.length > 0 ? (
            docs.images.map((index: any) => (
              <div key={index}>
                <img
                  className="!m-0 h-[800px] w-full rounded-[5px] object-cover"
                  alt="Images"
                  src={index}
                />
              </div>
            ))
          ) : docs.image ? (
            <img
              className="!m-0 h-[800px] w-full rounded-[5px] object-cover"
              alt="Image"
              src={docs.image}
            />
          ) : (
            ""
          )}

          {docs.images && docs.images.length > 0 ? (
            ""
          ) : docs.image ? (
            ""
          ) : (
            <img
              className="!m-0 h-[800px] w-full rounded-[5px] object-cover"
              alt="No Image"
              src="/rectangle14230.png"
            />
          )}
          {docs.logo ? (
            <Avatar className="absolute left-[312px] top-[655px] z-[1] !m-0 h-[113.3px] w-[126.9px] rounded-[5px] object-cover">
              <AvatarImage src={docs.logo} alt="@Ustudy" />
              <AvatarFallback>UY</AvatarFallback>
            </Avatar>
          ) : (
            <img
              className="absolute left-[312px] top-[655px] z-[1] !m-0 h-[113.3px] w-[126.9px] rounded-[5px] object-cover"
              loading="lazy"
              alt=""
              src={"/rectangle14231.png"}
            />
          )}

          {/* <img
                    className="!m-0 h-[800px] w-full rounded-[5px] object-cover"
                    loading="lazy"
                    alt="1"
                    src="/rectangle14230.png"
                />
                <img
                    className="absolute left-[312px] top-[655px] z-[1] !m-0 h-[113.3px] w-[126.9px] rounded-[5px] object-cover"
                    loading="lazy"
                    alt="2"
                    src="/rectangle14231.png"
                /> */}
          <div className="z-[2] box-border hidden w-[274px] flex-row items-center justify-start whitespace-nowrap rounded-lg bg-blueviolet-100 px-0 py-4">
            <b className="relative inline-block h-4 flex-1 leading-[16px]">
              Read uSTAKING white paper
            </b>
          </div>
          <main className="flex max-w-full flex-col items-start justify-start space-y-2 self-stretch lg:space-y-10">
            <span className="title !mx-auto mt-32 w-[700px] truncate bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-37xl text-transparent">
              {docs.universityName || "Astana IT University"}
            </span>
            <section className="text-lightsteelblue font-headings-desktop-poppins-16px-bold !mx-auto box-border flex w-[1245px] max-w-full flex-row items-start justify-center px-5 py-0 text-left text-5xl">
              <div className="flex w-[1061px] max-w-full flex-row items-start justify-start gap-[16.6px]">
                <div className="flex flex-col items-start justify-start px-0 pb-0 pt-1.5">
                  <div className="flex flex-col items-start justify-start gap-[54px]">
                    <div className="relative flex flex-row items-start justify-start">
                      <img
                        className="relative size-5"
                        loading="lazy"
                        alt=""
                        src="/circle.png"
                      />
                      <div className="absolute bottom-[-457px] left-[-20px] z-[1] !m-0 h-[483px] w-[30px] rounded-sm bg-black" />
                    </div>
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt=""
                      src="/circle.png"
                    />
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt=""
                      src="/circle.png"
                    />
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt=""
                      src="/circle.png"
                    />
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt=""
                      src="/circle.png"
                    />
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt=""
                      src="/circle.png"
                    />
                    <img
                      className="relative size-5"
                      loading="lazy"
                      alt=""
                      src="/circle.png"
                    />
                  </div>
                </div>
                <div className="flex max-w-[calc(100%_-_37px)] flex-1 flex-row items-start justify-start gap-[22.4px]">
                  <div className="flex flex-col items-start justify-start gap-[44.2px] mq750:hidden">
                    <a
                      className="!m-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
                      href="https://www.appily.com/colleges/ucla"
                      target="_blank"
                    >
                      Overview
                    </a>
                    <a
                      className="relative inline-block min-w-[90px] !bg-clip-text font-bold leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] [text-decoration:none] mq450:text-lgi mq450:leading-[24px]"
                      href="https://www.appily.com/colleges/ucla/admissions"
                      target="_blank"
                    >{`Tuition `}</a>
                    <b className="relative inline-block min-w-[119px] !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
                      Contacts
                    </b>
                    <b className="relative inline-block min-w-[87px] !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
                      Majors
                    </b>
                    <b className="relative !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">{`Campus Life `}</b>
                    <b className="relative !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
                      Academics
                    </b>
                    <b className="relative inline-block min-w-[104px] !bg-clip-text leading-[125%] tracking-wider text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] [background:linear-gradient(#9da5c3,_#9da5c3),_#fff] mq450:text-lgi mq450:leading-[24px]">
                      Reviews
                    </b>
                  </div>
                  <div className="font-dm-sans-desktop-24px-regular flex max-w-[calc(100%_-_182px)] flex-1 flex-col items-start justify-start gap-[62px] mq1050:gap-[31px] mq750:max-w-full mq450:gap-[15px]">
                    <div className="box-border flex max-w-full flex-row items-start justify-start self-stretch py-0 pl-0.5 pr-1.5">
                      <div className="relative inline-block max-w-full flex-1 mq450:text-lgi">
                        <p className="m-0">
                          {docs.universityName} University has an active student
                          self-government,
                        </p>
                        <p className="m-0">
                          which is an element of the general system of
                          management of educational process in the university
                          and implies maximum consideration of interests of
                          students.
                        </p>
                        <p className="m-0">{`
process at the university and assumes maximum consideration of interests,`}</p>
                        <p className="m-0">
                          needs of students on the basis of studying their
                          public opinion.
                        </p>
                      </div>
                    </div>
                    <div className="text-whitesmoke font-poppins flex flex-col items-start justify-start gap-[7px] self-stretch text-13xl">
                      <b className="relative self-stretch mq1050:text-7xl mq450:text-lgi">
                        Entire Ecosystem
                      </b>
                      <div className="font-dm-sans-desktop-24px-regular text-lightsteelblue relative self-stretch text-5xl mq450:text-lgi">
                        <p className="m-0">
                          {docs.universityName} University has an active student
                          self-government,
                        </p>
                        <p className="m-0">
                          which is an element of the general system of
                          management of educational process in the university
                          and implies maximum consideration of interests of
                          students.
                        </p>
                        <p className="m-0">{`process at the university and assumes maximum consideration of interests,`}</p>
                        <p className="m-0">
                          needs of students on the basis of studying their
                          public opinion.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <div className="relative z-[4] hidden h-[512px] w-[41px] bg-black" />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default Collages
