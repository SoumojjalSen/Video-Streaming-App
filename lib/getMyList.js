import serverAuth from "./serverAuth";

const getMyList = async (req, res) => {
  try {
     const { currentUser } = await serverAuth(req, res);

     const videoIds = await currentUser.favoriteIds;

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
    throw error;
  }
};

export default getMyList; 