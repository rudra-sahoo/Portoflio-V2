import Head from "next/head";
import { Home } from "@/components/home/Home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Rudra | Building beautiful, functional websites for your business</title>
        <meta name="description" content="I am a full stack web developer experienced in MERN stack" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="web developer, full stack, MERN stack, React, Node.js, MongoDB" />
        <meta property="og:title" content="Rudra | Full Stack Developer" />
        <meta property="og:description" content="Building beautiful, functional websites for your business" />
      </Head>
      <Home />
    </>
  );
}
