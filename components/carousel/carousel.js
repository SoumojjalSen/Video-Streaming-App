import React, { useCallback } from "react";
import styles from "./carousel.module.css";
import Card from "../card/card";
import Link from "next/link";
import classNames from "classnames";
import axios from "axios"; // Import axios if not already imported
import useCurrentUser from "../../hooks/getCurrentUser";
import useWatchedIds from "../../hooks/getWatchedVideosId";

const Carousel = (props) => {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props;

  const { mutate: mutateWatchAgainList } = useWatchedIds();
  const { data: currentUser, mutate } = useCurrentUser();

  const handleOpenVideo = useCallback(
    async (videoId) => {
      try {
        let response = await axios.post("/api/setWatchAgain", { videoId });

        const updatedWatchedIds = response?.data?.watchAgainIds;

        mutate({
          ...currentUser,
          watchAgainIds: updatedWatchedIds,
        });

        mutateWatchAgainList();
      } catch (error) {
        console.error("Error updating watched list:", error);
      }
    },
    [currentUser, mutate, mutateWatchAgainList]
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div
        className={classNames(
          !shouldWrap && styles.cardWrapper,
          shouldWrap && styles.wrap,
          shouldWrap && styles.myListImageLayout
        )}
      >
        {videos.map((video, idx) => (
          <Link
            key={idx}
            href={`/video/${video.id}`}
            onClick={() => handleOpenVideo(video.id)}
          >
            <Card
              cardId={idx}
              imgUrl={video.imgUrl}
              size={size}
              shouldScale={shouldScale}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Carousel;
