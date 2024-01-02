import React from "react";
import Image from "next/image";
import styles from "./card.module.css";
import { useState } from "react";
import classNames from "classnames";

import { motion } from "framer-motion";

const Card = (props) => {
  const {
    imgUrl = "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    size = "medium",
    cardId,
    shouldScale = true,
  } = props;

  const [imgSrc, setImgSrc] = useState(imgUrl);
  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleOnError = () => {
    setImgSrc("https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  };

  const scale = cardId === 0 ? { scaleY: 1.1 } : { scale: 1.1  };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={classNames(
          classMap[size],
          styles.imgMotionWrapper,
          !shouldScale && styles.imgPosition
        )}
        {...shouldHover}
      >
        <Image
          // src={imgSrc}
          src={imgSrc}
          alt="Card Image"
          fill
          className={styles.cardImg}
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
