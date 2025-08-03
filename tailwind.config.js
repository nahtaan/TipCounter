/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/index.html"],
  theme: {
    extend: {
      colors: {
        'true-red': '#ff0000'
      }
    },
  },
  safelist: [
    'flex',
    'hidden',
    'flex-row',
    'place-content-center',
    'bg-neutral-700',
    'bg-teal-500',
    'border-teal-700',
    'rounded-xl',
    'divide-x-2',
    'p-3',
    'border-gray-700',
    'border-x-2',
    'divide-neutral-400',
    'min-w-min',
    'max-w-full',
    'justify-center',
    'items-center',
    'm-3',
    'align-middle',
    'fill-true-red',
    'border-gray-500',
    'lg:h-9',
    '-translate-x-full',
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

