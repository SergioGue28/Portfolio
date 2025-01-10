// src/pages/_app.tsx
import { AppProps } from 'next/app';
import RootLayout from './Layout'; 

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
};

export default MyApp;
