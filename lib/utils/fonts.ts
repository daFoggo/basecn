// fonts.ts
import localFont from 'next/font/local'

export const ppEditorial = localFont({
  src: [
    {
      path: '../../public/fonts/PPEditorialNew-Ultralight-BF644b21500d0c0.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPEditorialNew-UltralightItalic-BF644b214ff1e9b.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../../public/fonts/PPEditorialNew-Regular-BF644b214ff145f.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/PPEditorialNew-Italic-BF644b214fb0c0a.otf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-pp-editorial',
  display: 'swap',
})
