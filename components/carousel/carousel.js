// splitting sections and horizontal scrolling

import React from "react";
import styles from "./carousel.module.css";
import Card from "../card/card";
import Link from 'next/link';
import classNames from 'classnames'

const Carousel = (props) => {
  const { title, videos=[], size , shouldWrap = false, shouldScale } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2> {/* Animated movies */}
      <div className={classNames(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return(
            <Link href={`/video/${video.id}`}>
              <Card cardId={idx} imgUrl={video.imgUrl} size={size} shouldScale={shouldScale}/>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Carousel;
