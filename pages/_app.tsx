import type { AppProps } from 'next/app';
import { Figtree } from 'next/font/google';
import '../src/app/globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={figtree.variable}>
      <Component {...pageProps} />
    </div>
  );
}
