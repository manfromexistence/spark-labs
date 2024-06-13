/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QivqNTqjXb4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <main className="flex flex-col gap-12 md:gap-16 lg:gap-20">
      <section className="w-full py-12 md:py-16 lg:py-20">
        <div className="container grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Our Platform
            </h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover the best solutions for your needs and take the first step towards a better future.
            </p>
            {/* <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Get Started
            </Link> */}
            <Button>Get Started</Button>
          </div>
          <img
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-first"
            height="550"
            src="/placeholder.svg"
            width="550"
          />
        </div>
      </section>
      <section className="w-full py-12 md:py-16 lg:py-20 bg-background dark:bg-gray-800">
        <div className="container grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Link
            className="group grid h-auto w-full items-start justify-start gap-3 rounded-lg border p-6 transition-colors hover:bg-background focus:bg-background dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
            href="#"
          >
            <HandHelpingIcon className="h-8 w-8 text-white group-hover:text-[#804dfe] dark:text-gray-50 dark:group-hover:text-gray-50" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold group-hover:text-[#804dfe] dark:group-hover:text-gray-50">Support</h3>
              <p className="text-gray-500 line-clamp-2 dark:text-gray-400">
                Get the help you need from our dedicated support team.
              </p>
            </div>
          </Link>
          <Link
            className="group grid h-auto w-full items-start justify-start gap-3 rounded-lg border p-6 transition-colors hover:bg-background focus:bg-background dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
            href="#"
          >
            <InfoIcon className="h-8 w-8 text-white group-hover:text-[#804dfe] dark:text-gray-50 dark:group-hover:text-gray-50" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold group-hover:text-[#804dfe] dark:group-hover:text-gray-50">FAQ</h3>
              <p className="text-gray-500 line-clamp-2 dark:text-gray-400">
                Find answers to your questions in our comprehensive FAQ.
              </p>
            </div>
          </Link>
          <Link
            className="group grid h-auto w-full items-start justify-start gap-3 rounded-lg border p-6 transition-colors hover:bg-background focus:bg-background dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
            href="#"
          >
            <FocusIcon className="h-8 w-8 text-white group-hover:text-[#804dfe] dark:text-gray-50 dark:group-hover:text-gray-50" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold group-hover:text-[#804dfe] dark:group-hover:text-gray-50">
                Specialties
              </h3>
              <p className="text-gray-500 line-clamp-2 dark:text-gray-400">
                Explore our wide range of specialized services.
              </p>
            </div>
          </Link>
          <Link
            className="group grid h-auto w-full items-start justify-start gap-3 rounded-lg border p-6 transition-colors hover:bg-background focus:bg-background dark:bg-gray-950 dark:hover:bg-gray-800 dark:focus:bg-gray-800"
            href="#"
          >
            <TestTubeIcon className="h-8 w-8 text-white group-hover:text-[#804dfe] dark:text-gray-50 dark:group-hover:text-gray-50" />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold group-hover:text-[#804dfe] dark:group-hover:text-gray-50">
                Career Test
              </h3>
              <p className="text-gray-500 line-clamp-2 dark:text-gray-400">
                Take our career test to find the perfect path for you.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  )
}

function FocusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}


function HandHelpingIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
      <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 13 6 6" />
    </svg>
  )
}


function InfoIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}


function TestTubeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path d="M8.5 2h7" />
      <path d="M14.5 16h-5" />
    </svg>
  )
}