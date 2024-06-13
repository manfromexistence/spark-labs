"use client"

import "./globals.css"

// import "../../style/globals.css"

// import { Inter } from "next/font/google"
import Script from "next/script"
import { ClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"
import { Toaster } from "@/components/ui/toaster"
// import { TooltipProvider } from "@/components/plate-ui/tooltip"
import { SiteFooter } from "@/components/footer"
import { SiteHeader } from "@/components/site-header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
import { Toaster as NewYorkSonner } from "@/registry/new-york/ui/sonner"
import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"

import { Nextui } from "./nextui"

// const inter = Inter({ subsets: ["latin"] })

// const title =
//   "Admin Panel";
// const description =
//   "This is a highly cutomizable admin panel.";

// export const metadata: Metadata = {
//   title,
//   description,
//   openGraph: {
//     title,
//     description,
//   },
//   twitter: {
//     title,
//     description,
//     card: "summary_large_image",
//     creator: "@abdo_eth",
//   },
//   metadataBase: new URL("https://variantvault.chrisabdo.dev"),
//   // themeColor: "#ffffff",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"

  return (
    <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ClerkProvider
          appearance={{
            baseTheme: isDarkMode ? dark : undefined,
            variables: {
              colorPrimary: "hsl(263.4, 70%, 50.4%)", // change this value (you can get it from you're css variables, make sure to include 'hsl' and commas)
            },
          }}
        >
          <body className="">
            <Nextui>
              {/* <TooltipProvider
                disableHoverableContent
                delayDuration={500}
                skipDelayDuration={0}
              >

              </TooltipProvider> */}
                              <SiteHeader />
                <div className="min-h-[90vh]">{children}</div>
                <SiteFooter />
                <Toaster />
                <NewYorkToaster />
                <DefaultToaster />
                <NewYorkSonner />
            </Nextui>
          </body>
        </ClerkProvider>
      </ThemeProvider>

      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />
    </html>
  )
}

// variables: { colorPrimary: 'hsl(263.4, 70%, 50.4%)' },
// elements: {
//   formButtonPrimary: 'bg-black border border-black border-solid hover:bg-white hover:text-black',
//   socialButtonsBlockButton:
//     'bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black',
//   socialButtonsBlockButtonText: 'font-semibold',
//   formButtonReset:
//     'bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black',
//   membersPageInviteButton: 'bg-black border border-black border-solid hover:bg-white hover:text-black',
//   card: 'bg-[#fafafa]',
// },




// import "./globals.css";
// import { ClerkProvider } from '@clerk/nextjs';
// import Script from 'next/script';
// import { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono';
// import { Inter } from "next/font/google";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "@/components/ui/toaster";
// import MainNav from "@/components/shared/main-nav";
// import Footer from "@/components/shared/footer";
// import { Nextui } from "./nextui";
// import { TooltipProvider } from '@/components/plate-ui/tooltip';
// import { Toaster as DefaultToaster } from "@/registry/default/ui/toaster"
// import { Toaster as NewYorkSonner } from "@/registry/new-york/ui/sonner"
// import { Toaster as NewYorkToaster } from "@/registry/new-york/ui/toaster"
// import { SiteHeader } from "@/components/site-header";
// import { SiteFooter } from "@/components/footer";

// const inter = Inter({ subsets: ["latin"] });

// const title =
//   "Admin Panel";
// const description =
//   "This is a highly cutomizable admin panel.";

// export const metadata: Metadata = {
//   title,
//   description,
//   openGraph: {
//     title,
//     description,
//   },
//   twitter: {
//     title,
//     description,
//     card: "summary_large_image",
//     creator: "@abdo_eth",
//   },
//   metadataBase: new URL("https://variantvault.chrisabdo.dev"),
//   themeColor: "#ffffff",
// };
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <ClerkProvider
//         appearance={{
//           variables: { colorPrimary: 'hsl(263.4, 70%, 50.4%)' },
//           elements: {
//             formButtonPrimary: 'bg-black border border-black border-solid hover:bg-white hover:text-black',
//             socialButtonsBlockButton:
//               'bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black',
//             socialButtonsBlockButtonText: 'font-semibold',
//             formButtonReset:
//               'bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black',
//             membersPageInviteButton: 'bg-black border border-black border-solid hover:bg-white hover:text-black',
//             card: 'bg-[#fafafa]',
//           },
//         }}
//       >
//         <body className={inter.className}>
//           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//             <Nextui>
//               <TooltipProvider
//                 disableHoverableContent
//                 delayDuration={500}
//                 skipDelayDuration={0}
//               >
//                 <SiteHeader />
//                 <div className="min-h-[90vh]">
//                   {children}
//                 </div>
//                 <SiteFooter />
//                 <Toaster />
//                 <NewYorkToaster />
//                 <DefaultToaster />
//                 <NewYorkSonner />
//               </TooltipProvider>

//             </Nextui>
//           </ThemeProvider>
//         </body>
//       </ClerkProvider>


//       <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" />
//       <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" />

//     </html>
//   );
// }

