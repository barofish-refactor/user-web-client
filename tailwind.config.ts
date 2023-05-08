import { type Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

type Hsla = `hsla(${number}, ${number}%, ${number}%, ${number})`
type HslaOption = {
  hue?: number | ((hue: number) => number);
  sat?: number | ((sat: number) => number);
  light?: number | ((light: number) => number);
  alpha?: number | ((alpha: number) => number);
}

const hslaRegex = /^hsla\(\s*(?<hue>3[0-5][0-9]|[0-2]?[0-9]{1,2})\s*,\s*(?<sat>100|[0-9]{1,2})%\s*,\s*(?<light>100|[0-9]{1,2})%\s*,\s*(?<alpha>1|0\.\d+)\)$/;
// const gray400 = 'hsla(0, 0%, 74%, 1)';

/**
 * @example
 * calcHsla('hsla(0, 0%, 0%, 1)', { alpha: 0.5 })
 * calcHsla('hsla(0, 0%, 0%, 1)', { alpha: p => p - 0.5 })
 * hsla(0, 0%, 0%, 0.5)
*/
function calcHsla(hsla: Hsla, options?:HslaOption) {
  const matched = hsla.match(hslaRegex);
  if (!matched?.groups) return hsla;
  
  const { hue, sat, light, alpha } = matched.groups;
  const calcHue = typeof options?.hue === 'function' ? options.hue(Number(hue)) : options?.hue ?? Number(hue);
  const calcSat = typeof options?.sat === 'function' ? options.sat(Number(sat)) : options?.sat ?? Number(sat);
  const calcLight = typeof options?.light === 'function' ? options.light(Number(light)) : options?.light ?? Number(light);
  const calcAlpha = typeof options?.alpha === 'function' ? options.alpha(Number(alpha)) : options?.alpha ?? Number(alpha);

  const getToFixed = (value: number) => value.toFixed(2);
  
  return `hsla(${getToFixed(calcHue)}, ${getToFixed(calcSat)}%, ${getToFixed(calcLight)}%, ${getToFixed(calcAlpha)})`;
}

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

/**
 * @example
 * getClickablePallete('hsla(0, 0%, 98%, 1)');
 * {
 *  DEFAULT: 'hsla(0, 0%, 98%, 1)',
 *  hover: 'hsla(0, 0%, 103%, 1)',
 *  press: 'hsla(0, 0%, 93%, 1)'z
 * }
 */
function getActiveColorPallete(hslaColor: Hsla) {
  return {
    DEFAULT: hslaColor,
    hover: calcHsla(hslaColor, { light: p => p + 5 }),
    press: calcHsla(hslaColor, { light: p => p - 5 }),
  };
}

const config: Config = {
  content: ['./src/**/*.{mdx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-pretendard)', ...fontFamily.sans],
    }, 
    fontSize: {
      'display-L': ['3.50rem', { lineHeight: '4.50rem', letterSpacing: '-0.3px', fontWeight: '700' }],
      'display-M': ['2.50rem', { lineHeight: '3.25rem', letterSpacing: '-0.3px', fontWeight: '700' }],
      'display-S': ['2.25rem', { lineHeight: '2.88rem', letterSpacing: '-0.3px', fontWeight: '700' }],
      'headline-L': ['2.00rem', { lineHeight: '2.63rem', letterSpacing: '-0.3px', fontWeight: '600' }],
      'headline-M': ['1.75rem', { lineHeight: '2.38rem', letterSpacing: '-0.3px', fontWeight: '600' }],
      'headline-S': ['1.50rem', { lineHeight: '2.13rem', letterSpacing: '-0.3px', fontWeight: '600' }],
      'title-L': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.3px', fontWeight: '500' }],
      'title-M': ['1.13rem', { lineHeight: '1.63rem', letterSpacing: '-0.3px', fontWeight: '500' }],
      'title-S': ['1.00rem', { lineHeight: '1.38rem', letterSpacing: '-0.3px', fontWeight: '500' }],
      'body-L': ['1.00rem', { lineHeight: '1.50rem', letterSpacing: '-0.3px', fontWeight: '400' }],
      'body-L-long': ['1.00rem', { lineHeight: '1.75rem', letterSpacing: '-0.3px', fontWeight: '400' }],
      'body-M': ['0.88rem', { lineHeight: '1.25rem', letterSpacing: '0px', fontWeight: '400' }],
      'body-M-long': ['0.88rem', { lineHeight: '1.50rem', letterSpacing: '0px', fontWeight: '400' }],
      'body-S': ['0.75rem', { lineHeight: '1.13rem', letterSpacing: '0px', fontWeight: '400' }],
      'label-L': ['0.88rem', { lineHeight: '1.25rem', letterSpacing: '0.1px', fontWeight: '500' }],
      'label-M': ['0.75rem', { lineHeight: '1.13rem', letterSpacing: '0.25px', fontWeight: '500' }],
      'label-S': ['0.69rem', { lineHeight: '1.00rem', letterSpacing: '0.25px', fontWeight: '500' }],
    },
    colors: {
      black: 'hsla(0, 0%, 0%, 1)',
      white: 'hsla(0, 0%, 100%, 1)',
      primary: {
        // ...getActiveColorPallete('hsla(224, 79%, 52%, 1)')
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
        // ...getActiveColorPallete('hsla(209, 79%, 52%, 1)')
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
      transparent: 'transparent',
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
    plugin(({ addBase, theme }) => {
      addBase({
        ':root': extractColorVars(theme('colors')),
      });
    }),
  ],
};


export default config;
