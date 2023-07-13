import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

/** 
 * TailwindCSS Config의 colors를 CSS Variables로 나타내줍니다.
 * @example
 * extractColorVars(theme('colors'))
 * :root {
 *  --color-black: hsla(0, 0%, 0%, 1);
 * }
 */
function extractColorVars(colorObj: any, colorGroup = ''): Record<string, string> {
  return Object.keys(colorObj).reduce<Record<string, string>>((vars, colorKey) => {
    const value = colorObj[colorKey];
    const cssVariable = colorKey === "DEFAULT" ? `--color${colorGroup}` : `--color${colorGroup}-${colorKey}`;

    const newVars = typeof value === 'string' ? { [cssVariable]: value } : extractColorVars(value, `${colorGroup}-${colorKey}`);

    return { ...vars, ...newVars };
  }, {});
}

const config: Config = {
  content: ['./src/**/*.{mdx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-pretendard)', ...fontFamily.sans],
    },
    colors: {
      black: 'hsla(0, 0%, 0%, 1)',
      white: 'hsla(0, 0%, 100%, 1)',
      transparent: 'transparent',
      primary: {
        10: 'hsla(224, 79%, 13%, 1)',
        20: 'hsla(224, 79%, 25%, 1)',
        30: 'hsla(224, 79%, 37%, 1)',
        40: 'hsla(224, 79%, 42%, 1)',
        50: 'hsla(224, 79%, 52%, 1)',
        60: 'hsla(224, 79%, 65%, 1)',
        70: 'hsla(224, 79%, 77%, 1)',
        80: 'hsla(224, 78%, 84%, 1)',
        90: 'hsla(223, 88%, 97%, 1)',
      },
      secondary: {
        10: 'hsla(209, 79%, 13%, 1)',
        20: 'hsla(209, 79%, 25%, 1)',
        30: 'hsla(209, 79%, 37%, 1)',
        40: 'hsla(209, 79%, 42%, 1)',
        50: 'hsla(209, 79%, 52%, 1)',
        60: 'hsla(209, 79%, 65%, 1)',
        70: 'hsla(209, 79%, 77%, 1)',
        80: 'hsla(209, 78%, 84%, 1)',
        90: 'hsla(209, 88%, 97%, 1)',
      },
      grey: {
        10: 'hsla(224, 4%, 13%, 1)',
        20: 'hsla(224, 4%, 25%, 1)',
        30: 'hsla(224, 4%, 37%, 1)',
        40: 'hsla(224, 4%, 42%, 1)',
        50: 'hsla(224, 4%, 52%, 1)',
        60: 'hsla(224, 4%, 65%, 1)',
        70: 'hsla(224, 4%, 77%, 1)',
        80: 'hsla(224, 4%, 84%, 1)',
        90: 'hsla(223, 4%, 97%, 1)',
      },
      error: {
        dark: 'hsla(6, 79%, 37%, 1)',
        DEFAULT: 'hsla(6, 79%, 52%, 1)',
        light: 'hsla(6, 79%, 82%, 1)',
      },
      warning: {
        dark: 'hsla(47, 79%, 32%, 1)',
        DEFAULT: 'hsla(47, 79%, 52%, 1)',
        light: 'hsla(47, 79%, 82%, 1)',
      },
      success: {
        dark: 'hsla(151, 79%, 32%, 1)',
        DEFAULT: 'hsla(151, 79%, 52%, 1)',
        light: 'hsla(151, 79%, 82%, 1)',
      },
      teritory: 'hsla(16, 100%, 52%, 1)',
    },
    container: {
      padding: {
        DEFAULT: '16px',
        md: '0',
      },
      center: true,
    },
    screens: {
      md: '768px',
      lg: '1200px',
    },
  },

  corePlugins: { preflight: false },
  plugins: [
    require('tailwind-scrollbar-hide'),
    plugin(({ addBase, theme }) => {
      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    }),
  ],
};


export default config;
