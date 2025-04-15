import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"; // Updated import path

const poppins = Poppins({ 
  weight: ["100", "200", "400", "700", "900"],
  subsets: ['latin'],
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div id="root" className={poppins.className}>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights 
        sampleRate={0.8} 
        beforeSend={(data) => { 
          if (data.url.includes('/admin')) {
            return null;  
          }
          return data;
        }} 
      />
    </div>
  );
}
