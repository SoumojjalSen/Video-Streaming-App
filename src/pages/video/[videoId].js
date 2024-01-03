import { useRouter } from "next/router";
import React, { useState } from "react";
import Modal from "react-modal";
import styles from "../../styles/Video.module.css";
import classNames from "classnames";
import { getYoutubeVideoById } from "../../../lib/videoData";
import NavBar from "../../../components/navbar/navbar";
import { getSession } from "next-auth/react";
import FavoriteButton from "../../../components/addFavorite/addFavourite.js";

Modal.setAppElement("#__next");

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

  const videoId = context.params.videoId;
  const videoInfoArray = await getYoutubeVideoById(videoId);

  const username = session.user.name;

  return {
    props: {
      videoInfo: videoInfoArray.length > 0 ? videoInfoArray[0] : {},
      username,
    },
  };
}

const Video = (initialProps) => {
  const { videoInfo, username } = initialProps;

  const router = useRouter();

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = videoInfo;



  return (
    <div className={styles.container}>
      <NavBar username={username} />
      <Modal
        isOpen={true}
        onRequestClose={() => {
          router.back();
        }}
        // style={customStyles}
        contentLabel="Example Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      > 
      <div className="videoPlayerWrapper">
        <iframe
          id="player"
          type="text/html"
          className={styles.videoPlayer}
          width="100%"
          height="390"
          src={`http://www.youtube.com/embed/${router.query.videoId}?enablejsapi=1&origin=http://example.com&rel=0&fs=0`}
          frameborder="0"
        ></iframe>
      </div>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <div>
                <FavoriteButton videoId={router.query.videoId}/>
              </div>
              <p className={styles.publishTime}>Published at : {publishTime}</p>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Channel: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={classNames(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
