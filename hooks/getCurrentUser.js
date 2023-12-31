import useSwr from "swr"; // Efficient fetching

import fetcher from "../lib/fetcher.js";

const getCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/currentUser", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate, // To update the user data after some action
  };
};

export default getCurrentUser;
