import React from "react";
import { getSession } from "next-auth/react";
import serverAuth from "../../../lib/serverAuth";
import Head from "next/head";
import styles from "../../styles/MyList.module.css";
import NavBar from "./../../../components/navbar/navbar";
import Carousel from "./../../../components/carousel/carousel";

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
  
  const { currentUser } = await serverAuth(context.req, context.res);
  
  const username = session.user.name;
  const videoIds = currentUser.watchAgainIds;

  const videos =
    videoIds?.map((videoId) => {
      return {
        id: videoId,
        imgUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      };
    }) || [];

  return {
    props: {
      videos,
      username,
    },
  };
}
const myList = ({ videos, username }) => {
  return (
    <div>
      <Head>
        <title>Watch Again</title>
      </Head>
      <main className={styles.main}>
        <NavBar username={username} />
        <div className={styles.sectionWrapper}>
          <Carousel
            title="Watch Again"
            videos={videos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default myList;
