// splitting sections and horizontal scrolling

import React from "react";
import styles from "./carousel.module.css";
import Card from "../card/card";

const Carousel = (props) => {
  const { title, videos=[], size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2> {/* Animated movies */}
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          return <Card cardId={idx} imgUrl={video.imgUrl} size={size} />;
        })}
      </div>
    </section>
  );
};

export default Carousel;
