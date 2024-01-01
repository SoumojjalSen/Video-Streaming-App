import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/outline";
import styles from "./addFavorite.module.css";
import useCurrentUser from "../../hooks/getCurrentUser";
import useFavorites from "../../hooks/getFavoriteVideosId";

const FavoriteButton = ({ videoId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(videoId);
  }, [currentUser, videoId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/setFavorite", { data: { videoId } });
    } else {
      response = await axios.post("/api/setFavorite", { videoId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [videoId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div className={styles.container}>
      <div onClick={toggleFavorites} className={styles.addToListWrapper}>
        <Icon className={styles.icon} />
      </div>
      <div className={styles.addToListText}>Add to list</div>
    </div>
  );
};

export default FavoriteButton;
