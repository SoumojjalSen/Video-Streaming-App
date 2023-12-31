import axios from "axios";
import serverAuth from "./serverAuth";

const getMyList = async (req, res) => {
  try {
    // const response = await fetch("/api/getFavoritedVideos");
     const { currentUser } = await serverAuth(req, res);

     const videoIds = await currentUser.favoriteIds;
    // const videoIds = response.data;

    console.log("Good morning", videoIds);
    console.log("Sourakshi", Array.isArray(videoIds));
    return (
      videoIds?.map((videoId) => {
        return {
          id: videoId,
          imgUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        };
      }) || []
    );
  } catch (error) {
    console.error("Error: ", error);
    throw error; // Rethrow the error to be caught by the calling function or component
  }
};

export default getMyList; 