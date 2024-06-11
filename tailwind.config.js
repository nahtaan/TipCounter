/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'true-red': '#ff0000'
      }
    },
  },
  safelist: [
    'flex',
    'flex-row',
    'place-content-center',
    'bg-neutral-700',
    'rounded-xl',
    'divide-x-2',
    'p-3',
    'divide-neutral-400',
    'min-w-min',
    'max-w-full',
    'justify-center',
    'items-center',
    'align-middle',
    'fill-true-red',
    'lg:h-9',
    'lg:w-7',
    'lg:pt-2',
    'h-7',
    'w-7',
    'justify-self-center',
    'place-self-center',
    'pl-2',
    'pr-2',
    'lg:pr-0',
    'lg:pl-0',
    'block',
    'text-clip',
    'overflow-hidden',
    'text-ellipsis',
    'break-words',
    'lg:flex-col',
    'sm:flex-row',
    'gap-3',
    'lg:pr-2',
    'cursor-pointer'
  ],
  plugins: [],
}

