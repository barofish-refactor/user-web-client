import clsx, { type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customFontRegex = /\b(?:display|headline|title|body|label)-(?:L(?:-long)?|M(?:-long)?|S)\b/g;
const customColorRegex =
  /\b(?:black|white|yellow|red|blue|orange|green|primary|secondary|transparent)\b.*/g;

const isCustomColor = (v: string): boolean => customColorRegex.test(v);
const isCustomFont = (v: string): boolean => customFontRegex.test(v);

const customTwMerge = extendTailwindMerge({
  classGroups: {
    'font-size': [{ text: [isCustomFont] }],
    'text-color': [{ text: [isCustomColor] }],
  },
});

/**
 * @link https://github.com/lukeed/clsx
 * @link https://github.com/dcastil/tailwind-merge
 * @example cm('text-red-500', 'text-2xl', { 'bg-blue-500': true, 'bg-red-500': true })
 *  => 'text-red-500 text-2xl bg-red-500'
 */
export const cm = (...classes: ClassValue[]) => customTwMerge(clsx(classes));
export const classMerge = cm;
export default cm;
