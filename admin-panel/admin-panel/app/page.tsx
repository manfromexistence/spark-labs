"use client"

import IntroText from "@/components/landing/intro-text";
import Features from "@/components/landing/features";
import Blockquote from "@/components/landing/blockquote";
import Info from "@/components/landing/info";
import WebsiteTab from "@/components/tab";
import { useEffect, useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import date from 'date-and-time';
import { useEditableProps } from "@udecode/plate-common";

// const now = new Date();

export default function Home() {

  // const [time, setTime] = useState("");
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // function timePassed(date1: Date, date2: Date): string {
  //   const diffInSeconds = Math.abs(date2.getTime() - date1.getTime()) / 1000;
  //   const units = [
  //     { name: 'second', limit: 60, in_seconds: 1 },
  //     { name: 'minute', limit: 3600, in_seconds: 60 },
  //     { name: 'hour', limit: 86400, in_seconds: 3600 },
  //     { name: 'day', limit: 604800, in_seconds: 86400 },
  //     { name: 'week', limit: 2629743, in_seconds: 604800 },
  //     { name: 'month', limit: 31556926, in_seconds: 2629743 },
  //     { name: 'year', limit: Infinity, in_seconds: 31556926 }
  //   ];
  //   let diff = diffInSeconds;
  //   for (let i=0; i<units.length; i++) {
  //     if (diff < units[i].limit) {
  //       const val = Math.floor(diff / units[i].in_seconds);
  //       return `${val} ${units[i].name}${val > 1 ? 's' : ''} ago`;
  //     }
  //     diff = diffInSeconds / units[i].limit;
  //   }
  //   return 'just now';
  // }

  // const date1 = new Date('2024/05/31 10:44:33');
  // const date2 = new Date('2024/05/30 10:44:33');

  function humanReadableTimeDifference(date1: string | number | Date, date2: string | number | Date) {
    // Parse the dates
    let d1: any = new Date(date1);
    let d2: any = new Date(date2);

    // Calculate the difference in milliseconds
    let diff = Math.abs(d2 - d1);

    // Calculate time difference in various units
    let seconds = Math.floor(diff / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let years = Math.floor(days / 365);

    // Construct the human-readable time difference string
    let result = "";
    if (years > 0) result += years + " year(s) ";
    days %= 365;
    if (days > 0) result += days + " day(s) ";
    hours %= 24;
    if (hours > 0) result += hours + " hour(s) ";
    minutes %= 60;
    if (minutes > 0) result += minutes + " minute(s) ";
    seconds %= 60;
    if (seconds > 0) result += seconds + " second(s)";

    return result;
  }


  let date1 = "2024/05/31 11:54:25";
  let date2 = "2024/06/01 12:00:00";


  return (
    <>
      <div className="min-h-screen bg-background">

        {/* <div className="h-max border w-max flex items-start justify-start flex-col gap-3 p-10">
          <span className="select-all">{date.format(now, 'YYYY/MM/DD HH:mm:ss')}</span>
          <span className="select-all">{humanReadableTimeDifference(date1, date.format(now, 'YYYY/MM/DD HH:mm:ss'))}</span>
        </div> */}

        <main className="isolate">
          {/* Hero section */}
          <div className="relative pt-14">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>

            {/* <CustomButton /> */}

            <div className="py-12 sm:py-0">
              <IntroText />
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <WebsiteTab />

          {/* Info section */}
          <Info />

          {/* Feature section */}
          <Features />

          {/* Testimonial section */}
          <div className="mx-auto mb-32 max-w-7xl sm:mt-16 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden  px-6 py-20 shadow-xl sm:rounded-3xl sm:px-10 sm:py-24 md:px-12 lg:px-20">
              <div className="absolute inset-0 bg-gray-900/90 mix-blend-multiply" />
              <div
                className="absolute -left-80 -top-56 transform-gpu blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-[0.45]"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>
              <div
                className="hidden md:absolute md:bottom-16 md:left-[50rem] md:block md:transform-gpu md:blur-3xl"
                aria-hidden="true"
              >
                <div
                  className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-r from-[#ff4694] to-[#776fff] opacity-25"
                  style={{
                    clipPath:
                      "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                  }}
                />
              </div>

              <Blockquote />
            </div>
          </div>

        </main>
      </div>
    </>

  );
}




// const CustomButton = () => {
//   const buttonRef = useRef<HTMLButtonElement | null>(null);

//   const handleConfetti = async () => {
//     const { clientWidth, clientHeight } = document.documentElement;
//     const boundingBox = buttonRef.current?.getBoundingClientRect?.();

//     const targetY = boundingBox?.y ?? 0;
//     const targetX = boundingBox?.x ?? 0;
//     const targetWidth = boundingBox?.width ?? 0;

//     const targetCenterX = targetX + targetWidth / 2;
//     const confetti = (await import("canvas-confetti")).default;

//     confetti({
//       zIndex: 999,
//       particleCount: 100,
//       spread: 70,
//       origin: {
//         y: targetY / clientHeight,
//         x: targetCenterX / clientWidth,
//       },
//     });
//   };

//   return (
//     <Button
//       ref={buttonRef}
//       disableRipple
//       className="center relative overflow-visible border !rounded-md hover:bg-primary-foreground bg-background hover:text-accent-foreground"
//       size="lg"
//       onPress={handleConfetti}
//     >
//       Press me
//     </Button>
//   );
// };

