/* eslint-disable react/no-unescaped-entities */

import { JSX, SVGProps } from "react"
import Link from "next/link"

// export default function Component() {
//   return (
//     <div className="flex min-h-dvh flex-col">
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
//                     Learn Anytime, Anywhere with uStudy
//                   </h1>
//                   <p className="max-w-[600px] text-gray-500 md:text-xl ">
//                     uStudy is an online learning platform that offers interactive lessons, progress tracking, and a
//                     vibrant community to help you achieve your educational goals.
//                   </p>
//                 </div>
//                 <div className="flex flex-col gap-2 min-[400px]:flex-row">
//                   <Link
//                     className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                     href="#"
//                   >
//                     Sign Up
//                   </Link>
//                   <Link
//                     className="hover:bg-background inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
//                     href="#"
//                   >
//                     Learn More
//                   </Link>
//                 </div>
//               </div>
//               <img
//                 alt="Hero"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom sm:w-full lg:order-last lg:aspect-square"
//                 height="550"
//                 src="/placeholder.svg"
//                 width="550"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="bg-background w-full py-12 md:py-24 lg:py-32 ">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="bg-background inline-block rounded-lg px-3 py-1 text-sm dark:bg-gray-700">
//                   Key Features
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Potential with uStudy</h2>
//                 <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
//                   uStudy offers a comprehensive suite of features to help you succeed in your learning journey.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
//               <div className="flex flex-col justify-center space-y-4">
//                 <ul className="grid gap-6">
//                   <li>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">Interactive Lessons</h3>
//                       <p className="text-gray-500 ">
//                         Engage with multimedia-rich lessons that bring the material to life.
//                       </p>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">Progress Tracking</h3>
//                       <p className="text-gray-500 ">
//                         Monitor your progress and identify areas for improvement.
//                       </p>
//                     </div>
//                   </li>
//                   <li>
//                     <div className="grid gap-1">
//                       <h3 className="text-xl font-bold">Community Forums</h3>
//                       <p className="text-gray-500 ">
//                         Connect with fellow learners and instructors to share insights and get support.
//                       </p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <img
//                 alt="Features"
//                 className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
//                 height="310"
//                 src="/placeholder.svg"
//                 width="550"
//               />
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <div className="bg-background inline-block rounded-lg px-3 py-1 text-sm dark:bg-gray-700">
//                   Testimonials
//                 </div>
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Students Say</h2>
//                 <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
//                   Hear from real students who have transformed their lives with uStudy.
//                 </p>
//               </div>
//             </div>
//             <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
//               <div className="flex flex-col justify-center space-y-4">
//                 <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
//                   “uStudy has been a game-changer for me. The interactive lessons and progress tracking have helped me
//                   stay motivated and on track with my learning goals.”
//                 </blockquote>
//                 <div>
//                   <div className="font-semibold">Emily Wilkins</div>
//                   <div className="text-sm text-gray-500 ">Student, uStudy</div>
//                 </div>
//               </div>
//               <div className="flex flex-col justify-center space-y-4">
//                 <blockquote className="text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl">
//                   “The community forums on uStudy have been invaluable. I've connected with like-minded learners and
//                   instructors who have provided me with the support and guidance I needed to succeed.”
//                 </blockquote>
//                 <div>
//                   <div className="font-semibold">Michael Chen</div>
//                   <div className="text-sm text-gray-500 ">Student, uStudy</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="bg-background w-full py-12 md:py-24 lg:py-32 ">
//           <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
//             <div className="space-y-2">
//               <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
//                 Take the First Step Towards Your Learning Goals
//               </h2>
//               <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
//                 Join the uStudy community and unlock your full potential.
//               </p>
//             </div>
//             <div className="flex flex-col gap-2 min-[400px]:flex-row">
//               <Link
//                 className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
//                 href="#"
//               >
//                 Sign Up
//               </Link>
//               <Link
//                 className="hover:bg-background inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
//                 href="#"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   )
// }

// function BookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
//     </svg>
//   )
// }
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e1LBvjgdwiX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
  return (
    <>
      {/* <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="space-y-4 bg-background">
              <div className="inline-block rounded-lg border bg-background px-3 py-1 text-sm">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                make a about us title for ustudy a new genrations online educatons platform
              </h2>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                For over 50 years, Siner Teknik has been a leading provider of
                industrial equipment, delivering innovative solutions and
                unparalleled service to our clients worldwide.
              </p>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our journey began in 1970 with a vision to revolutionize the
                industrial landscape. Since then, we have grown into a global
                powerhouse, leveraging cutting-edge technology and a team of
                dedicated experts to meet the ever-evolving needs of our
                clients.
              </p>
            </div>
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full border-y bg-background  py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm ">
                Our Products
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Innovative Solutions for Every Industry
              </h2>
              <p className="max-w-[900px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At Siner Teknik, we offer a comprehensive range of industrial
                equipment designed to meet the highest standards of quality,
                efficiency, and reliability.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex h-[300px] w-auto flex-col justify-center space-y-4 border px-5">
              <GaugeIcon className="mx-auto size-12 text-gray-500" />
              <h3 className="text-xl font-bold">Machinery</h3>
              <p className="text-gray-500 ">
                Our state-of-the-art machinery is engineered to deliver
                exceptional performance and durability, ensuring maximum
                productivity and efficiency in your operations.
              </p>
            </div>
            <div className="flex h-[300px] w-auto flex-col justify-center space-y-4 border px-5">
              <PenToolIcon className="mx-auto size-12 text-gray-500" />
              <h3 className="text-xl font-bold">Tools</h3>
              <p className="text-gray-500 ">
                Our comprehensive range of tools is designed to meet the highest
                standards of precision and reliability, ensuring optimal results
                in every application.
              </p>
            </div>
            <div className="flex h-[300px] w-auto flex-col justify-center space-y-4 border px-5">
              <WrenchIcon className="mx-auto size-12 text-gray-500 " />
              <h3 className="text-xl font-bold">Spare Parts</h3>
              <p className="text-gray-500 ">
                Our extensive inventory of genuine spare parts ensures that your
                equipment remains in top condition, minimizing downtime and
                maximizing productivity.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_550px]">
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/placeholder.svg"
              width="550"
            />
            <div className="space-y-4">
              <div className="inline-block rounded-lg border bg-background px-3 py-1 text-sm">
                Customer Satisfaction
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Committed to Excellence
              </h2>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At Siner Teknik, we are committed to delivering exceptional
                customer service and support. Our team of experts is dedicated
                to understanding your unique requirements and providing tailored
                solutions that exceed your expectations.
              </p>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We take pride in our ability to foster long-lasting partnerships
                with our clients, built on trust, transparency, and a shared
                commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="space-y-4 bg-background">
              <div className="inline-block rounded-lg border bg-background px-3 py-1 text-sm">
                About Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Shaping the Future: About Us at uStudy - The Vanguard of Next-Generation Online Education
              </h2>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                uStudy is a pioneering online education platform designed for the new generation. We are committed to providing innovative and accessible learning solutions to students worldwide.
              </p>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our journey began with a vision to revolutionize the educational landscape by leveraging cutting-edge technology and a team of dedicated experts to meet the ever-evolving needs of our students.
              </p>
            </div>
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/website/1.png"
              width="550"
            />
          </div>
        </div>
      </section>
      <section className="w-full border-y bg-background  py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm ">
                Our Approach
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Nurturing the Learners, Empowering the Educators
              </h2>
              <p className="max-w-[900px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At uStudy, we offer a comprehensive range of courses designed to meet the diverse learning needs of our students. We also provide our educators with a robust and intuitive platform to share their knowledge and skills.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex h-[300px] w-auto flex-col justify-center space-y-4 border px-5">
              <GaugeIcon className="mx-auto size-12 text-gray-500" />
              <h3 className="text-xl font-bold">Interactive Learning</h3>
              <p className="text-gray-500 ">
                Our interactive learning platform is designed to engage students and enhance their learning experience, ensuring maximum productivity and efficiency in their studies.
              </p>
            </div>
            <div className="flex h-[300px] w-auto flex-col justify-center space-y-4 border px-5">
              <PenToolIcon className="mx-auto size-12 text-gray-500" />
              <h3 className="text-xl font-bold">Educator Support</h3>
              <p className="text-gray-500 ">
                We provide our educators with various tools and resources to help them enhance their teaching methods and stay updated with the latest educational trends.
              </p>
            </div>
            <div className="flex h-[300px] w-auto flex-col justify-center space-y-4 border px-5">
              <WrenchIcon className="mx-auto size-12 text-gray-500 " />
              <h3 className="text-xl font-bold">Student Support</h3>
              <p className="text-gray-500 ">
                Our dedicated support team is available round the clock to assist students with any queries or issues they might encounter, ensuring a smooth and seamless learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_550px]">
            <img
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              height="310"
              src="/website/5.png"
              width="550"
            />
            <div className="space-y-4">
              <div className="inline-block rounded-lg border bg-background px-3 py-1 text-sm">
                Customer Satisfaction
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Committed to Excellence
              </h2>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                At uStudy, we are committed to delivering exceptional customer service and support. Our team of experts is dedicated to understanding your unique requirements and providing tailored solutions that exceed your expectations.
              </p>
              <p className="max-w-[600px] text-gray-500  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We take pride in our ability to foster long-lasting partnerships with our students and educators, built on trust, transparency, and a shared commitment to excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

function GaugeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}

function PenToolIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19 7-7 3 3-7 7-3-3z" />
      <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="m2 2 7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  )
}

function WrenchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}
