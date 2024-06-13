const { fontFamily } = require("tailwindcss/defaultTheme")
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: "#000",
        "neutrals-2": "#23262f",
        gray: {
          "100": "#7e7e7e",
          "200": "#121212",
          "300": "rgba(0, 0, 0, 0.75)",
          "400": "rgba(0, 0, 0, 0)",
          "500": "rgba(255, 255, 255, 0.2)",
        },
        "shade-white": "#fff",
        mediumpurple: "#a683fc",
        "neutrals-3": "#353945",
        lightsteelblue: {
          "100": "#9da5c4",
          "200": "#9da5c3",
        },
        blueviolet: {
          "100": "#804efe",
          "200": "#804dfe",
        },
        plum: "#ad9adb",
        darkslateblue: "#37226a",
        gainsboro: {
          "100": "#e6e6e6",
          "200": "#d9dae0",
        },
        darkblue: "#4e21bc",
        lightgray: "#ccc",
        silver: "#c8c8c8",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // borderRadius: {
      //   xl: `calc(var(--radius) + 4px)`,
      //   lg: `var(--radius)`,
      //   md: `calc(var(--radius) - 2px)`,
      //   sm: "calc(var(--radius) - 4px)",
      // },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        "dm-sans": "'DM Sans'",
        "headings-desktop-poppins-16px-regular": "Poppins",
        "dm-sans-desktop-24px-medium": "'Nunito Sans'",
        // mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
    fontSize: {
      base: "16px",
      xl: "20px",
      sm: "14px",
      "8xl": "27px",
      "3xl": "22px",
      lg: "18px",
      xs: "12px",
      "21xl": "40px",
      "13xl": "32px",
      "5xl": "24px",
      "7xl": "26px",
      lgi: "19px",
      "45xl": "64px",
      "32xl": "51px",
      "19xl": "38px",
      "37xl": "56px",
      "26xl": "45px",
      "15xl": "34px",
      "29xl": "48px",
      "10xl": "29px",
      inherit: "inherit",
    },
    screens: {

      mq1225: {
        raw: "screen and (max-width: 1225px)",
      },
      mq1050: {
        raw: "screen and (max-width: 1050px)",
      },
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      
      ...defaultTheme.screens,

      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
