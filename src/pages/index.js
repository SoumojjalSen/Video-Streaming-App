import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "../../components/banner/banner.js";
import NavBar from "./../../components/navbar/navbar.js";
import Card from "./../../components/card/card";
import Carousel from "../../components/carousel/carousel.js";
import getVideos, { getPopularVideos } from "../../lib/videoData.js";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const animatedVideos = await getVideos("animated movie trailers", "animated");
  const bollywoodVideos = await getVideos("bollywood movie trailers", "bollywood");
  const hollywoodVideos = await getVideos("hollywood movie trailers", "hollywood");
  const popularVideos = await getPopularVideos();
  const kidsVideos = await getVideos("kids content", "kids");

  // console.log("animated", {animatedVideos});
  // console.log("bolly", {bollywoodVideos});
  // console.log("holly", {hollywoodVideos});
  // console.log("kids", {kidsVideos});

  return {
    props: { animatedVideos, bollywoodVideos, hollywoodVideos, kidsVideos, popularVideos }, // will be passed to the page component as props
  };
}

export default function Home(initialProps) {

  const { animatedVideos, bollywoodVideos, hollywoodVideos, kidsVideos, popularVideos } = initialProps;

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
        <NavBar username="Soumojjal Sen" />
        <Banner
          title="Kungfu Panda"
          subTitle="The Dragon Warrior"
          imgUrl="/static/kungfu-panda-4-stretched.webp"
        />
        <div className={styles.sectionWrapper}>
          <Carousel
            title="Animated movies"
            videos={animatedVideos}
            size="large"
          />
          <Carousel title="Bollywood" videos={bollywoodVideos} size="medium" />
          <Carousel title="Hollywood" videos={hollywoodVideos} size="medium" />
          <Carousel title="Popular" videos={popularVideos} size="small" />
          <Carousel title="Kids" videos={kidsVideos} size="medium" />
        </div>
      </div>
    </>
  );
}
