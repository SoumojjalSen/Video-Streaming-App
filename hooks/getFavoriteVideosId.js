import useSwr from "swr";
import fetcher from "../lib/fetcher.js";

const getFavoriteVideosId = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/getFavoritedVideos", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default getFavoriteVideosId;
