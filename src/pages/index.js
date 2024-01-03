import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "../styles/Home.module.css";
import Banner from "../../components/banner/banner.js";
import NavBar from "./../../components/navbar/navbar.js";
import Card from "./../../components/card/card";
import Carousel from "../../components/carousel/carousel.js";
import getVideos, { getPopularVideos } from "../../lib/videoData.js";
import { getSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/loginForm",
        permanent: false,
      },
    };
  }

  const username = session.user.name;

  const animatedVideos = await getVideos("animated movie trailers", "animated");
  const bollywoodVideos = await getVideos(
    "bollywood movie trailers",
    "bollywood"
  );
  const hollywoodVideos = await getVideos(
    "hollywood movie trailers",
    "hollywood"
  );
  const popularVideos = await getPopularVideos();
  const kidsVideos = await getVideos("kids content", "kids");

  return {
    props: {
      animatedVideos,
      bollywoodVideos,
      hollywoodVideos,
      kidsVideos,
      popularVideos,
      username,
    },
  };
}

export default function Home(initialProps) {
  const {
    animatedVideos,
    bollywoodVideos,
    hollywoodVideos,
    kidsVideos,
    popularVideos,
    username,
  } = initialProps;

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta
          name="description"
          content="Netflix inspired video streaming app"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar username={username} />
        <Banner
          videoId="hvaoXA3qw9s"
          title="Kungfu Panda"
          subTitle="The Dragon Warrior"
          imgUrl="https://i.ytimg.com/vi/hvaoXA3qw9s/maxresdefault.jpg"
        />
        <div className={styles.sectionWrapper}>
          <Carousel
            title="Animated movies"
            videos={animatedVideos}
            size="large"
          />
          <Carousel title="Bollywood" videos={bollywoodVideos} size="medium" />
          <Carousel title="Hollywood" videos={hollywoodVideos} size="medium" />
          <Carousel title="Trending now" videos={popularVideos} size="small" />
          <Carousel title="Kids" videos={kidsVideos} size="medium" />
        </div>
      </div>
    </>
  );
}
