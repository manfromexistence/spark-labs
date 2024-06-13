"use client";

// import {
//   FADE_DOWN_ANIMATION_VARIANTS,
//   FADE_UP_ANIMATION_VARIANTS,
// } from "@/lib/constants";
import { motion, useInView } from "framer-motion";
import React from "react";
// import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { HeartFilledIcon } from "@radix-ui/react-icons";

const features = [
  {
    name: "Effortless Data Entry",
    description:
      "The intuitive interface simplifies adding universities, specialties, and questions. Drag-and-drop functionality or clear wizards can further enhance ease of use.",
    icon: HeartFilledIcon,
  },
  {
    name: "Quick Navigation",
    description:
      "A well-organized sidebar or menu with clear labels allows Ustudy to find the needed section instantly, minimizing clicks and maximizing productivity",
    icon: HeartFilledIcon,
  },
  {
    name: "Real-Time Previews",
    description:
      " Let Ustudy see how the added information will appear on the Ustudy website, ensuring everything looks polished before publishing.",
    icon: HeartFilledIcon,
  },
  {
    name: "Clean and Uncluttered Design",
    description:
      "A minimalist aesthetic with ample white space keeps the interface focused and reduces cognitive load for Ustudy",
    icon: HeartFilledIcon,
  },
  {
    name: "Visually Appealing Elements",
    description:
      "Consider incorporating subtle icons or color-coding to categorize different sections, making information visually distinct.",
    icon: HeartFilledIcon,
  },
  {
    name: "Responsive Design",
    description:
      "The admin panel adapts seamlessly across devices, allowing Ustudy to manage Ustudy content from desktops, tablets, or even mobile phones.",
    icon: HeartFilledIcon,
  },
];

export default function Info() {
  //   const { ref: refBottom, inView: inViewBottom } = useInView({
  //     triggerOnce: false,
  //   });
  const ref = React.useRef(null);
  const isInView = useInView(ref);

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <div className="overflow-hidden py-1 sm:py-32 mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <motion.div
                ref={ref}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                viewport={{ once: false }}
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      staggerChildren: 0.15,
                    },
                  },
                }}
              >
                <motion.h2
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="text-base font-semibold leading-7 text-muted-foreground"
                >
                  Streamlined Efficiency for Ustudy
                </motion.h2>
                <motion.p
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  A User-Friendly Experience
                </motion.p>
                <motion.p
                  variants={FADE_UP_ANIMATION_VARIANTS}
                  className="mt-6 text-lg leading-8 "
                >
                  Ready to use powers for your next project. Just add,remove,update
                  and delete data.
                </motion.p>

                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
                  {features.map((feature) => (
                    <motion.div
                      key={feature.name}
                      variants={FADE_DOWN_ANIMATION_VARIANTS}
                      className="relative pl-9"
                    >
                      <dt className="inline font-semibold">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-muted-foreground"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </motion.div>
                  ))}
                </dl>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3">
            <Image
              src="/website/ustudy-index.png"
              alt="Product screenshot"
              className="!min-w-full !max-w-[350px] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto md:-ml-4 lg:-ml-0 !max-h-[300px]"
              width={300}
              height={200}
            />
            <Image
              src="/website/ustudy-rubix-cube.png"
              alt="Product screenshot"
              className="!min-w-full  !max-w-[350px] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto md:-ml-4 lg:-ml-0 !max-h-[300px]"
              width={300}
              height={300}
            />
            <Image
              src="/website/ustudy-footer-calculator.png"
              alt="Product screenshot"
              className="!min-w-full !max-w-[350px] rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-auto md:-ml-4 lg:-ml-0 !max-h-[300px]"
              width={300}
              height={300}
            />

          </div>

        </div>
      </div>
    </div>
  );
}
