 /** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* =====================================================
         COLORS
      ===================================================== */

      colors: {
        blueprint: {
          950: "#0B1420",
          900: "#0F1B2E",
          800: "#16273D",
          700: "#1F3450",
          600: "#2C4B6E",
          500: "#385F86",
          line: "#4A90A4",
        },

        brass: {
          50: "#FBF3E7",
          100: "#F3E1BF",
          200: "#EBD09F",
          300: "#DDB477",
          400: "#C9944D",
          500: "#C08B3E",
          600: "#A5722E",
          700: "#835723",
          800: "#654419",
        },

        paper: "#FAF8F3",

        ink: "#1B2431",

        slate: {
          650: "#3E4A5C",
        },

        propintel: {
          bg: "#F7F8FA",
          surface: "#FFFFFF",
          soft: "#F1F3F6",

          navy: "#0B172A",
          "navy-2": "#12233D",
          "navy-3": "#172D4D",

          brass: "#C9944D",
          "brass-light": "#E7C58F",

          border: "#E4E7EC",

          success: "#12B76A",
          danger: "#F04438",
          warning: "#F79009",
          info: "#2E90FA",

          purple: "#7F56D9",
        },
      },

      /* =====================================================
         TYPOGRAPHY
      ===================================================== */

      fontFamily: {
        display: [
          '"Fraunces"',
          '"DM Serif Display"',
          "Georgia",
          "serif",
        ],

        body: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],

        mono: [
          '"IBM Plex Mono"',
          "monospace",
        ],
      },

      /* =====================================================
         BACKGROUND IMAGES
      ===================================================== */

      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(74,144,164,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,164,0.16) 1px, transparent 1px)",

        "propintel-grid":
          "linear-gradient(rgba(11,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(11,23,42,0.045) 1px, transparent 1px)",

        "propintel-mesh":
          "radial-gradient(circle at 15% 20%, rgba(201,148,77,0.15), transparent 30%), radial-gradient(circle at 85% 10%, rgba(46,144,250,0.08), transparent 28%), radial-gradient(circle at 70% 85%, rgba(18,183,106,0.06), transparent 30%)",

        "propintel-hero":
          "radial-gradient(circle at 10% 20%, rgba(201,148,77,0.18), transparent 32%), radial-gradient(circle at 90% 10%, rgba(46,144,250,0.10), transparent 28%), linear-gradient(135deg, #0B172A, #12233D)",
      },

      /* =====================================================
         BACKGROUND SIZE
      ===================================================== */

      backgroundSize: {
        grid: "32px 32px",
        "propintel-grid": "36px 36px",
      },

      /* =====================================================
         BORDER RADIUS
      ===================================================== */

      borderRadius: {
        pi: "16px",
        "pi-lg": "22px",
        "pi-xl": "30px",
        "pi-2xl": "36px",
      },

      /* =====================================================
         BOX SHADOWS
      ===================================================== */

      boxShadow: {
        "pi-xs":
          "0 1px 2px rgba(16, 24, 40, 0.03)",

        "pi-sm":
          "0 1px 3px rgba(16, 24, 40, 0.05)",

        "pi-md":
          "0 8px 30px rgba(16, 24, 40, 0.07)",

        "pi-lg":
          "0 20px 60px rgba(16, 24, 40, 0.10)",

        "pi-xl":
          "0 30px 80px rgba(16, 24, 40, 0.14)",

        "pi-brass":
          "0 5px 18px rgba(201, 148, 77, 0.20)",

        "pi-navy":
          "0 5px 16px rgba(11, 23, 42, 0.18)",
      },

      /* =====================================================
         TRANSITIONS
      ===================================================== */

      transitionDuration: {
        150: "150ms",
        220: "220ms",
        350: "350ms",
        450: "450ms",
      },

      /* =====================================================
         TYPOGRAPHY PLUGIN
      ===================================================== */

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",

            color: theme("colors.gray.700"),

            h1: {
              color: theme("colors.blue.700"),
              fontWeight: "700",
            },

            h2: {
              color: theme("colors.blue.700"),
              fontWeight: "700",
            },

            h3: {
              color: theme("colors.blue.600"),
            },

            strong: {
              color: theme("colors.gray.900"),
            },

            code: {
              color: theme("colors.red.600"),
            },

            table: {
              width: "100%",
            },

            th: {
              backgroundColor: theme("colors.gray.100"),
            },

            a: {
              color: theme("colors.blue.600"),
              textDecoration: "none",
            },
          },
        },
      }),
    },
  },

  plugins: [
    typography,
  ],
};