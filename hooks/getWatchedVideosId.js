import useSwr from "swr";
import fetcher from "../lib/fetcher.js";

const getWatchAgainVideosId = () => {
  const { data, error, isLoading, mutate } = useSwr(
    "/api/getWatchAgainVideos",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default getWatchAgainVideosId;
