import animatedBackup from "../data/video_data_backup/animated_movies_backup.json";
import bollywoodBackup from "../data/video_data_backup/bollywood_movies_backup.json";
import hollywoodBackup from "../data/video_data_backup/hollywood_movies_backup.json";
import kidsBackup from "../data/video_data_backup/kids_videos_backup.json";
import popularBackup from "../data/video_data_backup/popular_movies_backup.json";

const getReqVidData = (data) => {
  return data?.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId || item?.id?.channelId || item?.id,
    };
  });
};


const fetchVideos = async (url, videoType) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  try {
    
    const response = await fetch(
      `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
    );

    if (response.ok) {
      const videoData = await response.json();

      console.log("video dataataata", videoData);

      return getReqVidData(videoData);
    } else {
      // Return imported data based on videoType
      console.log("Retrieved from backup");

      switch (videoType) {
        case "animated":
          return getReqVidData(animatedBackup);
        case "bollywood":
          return getReqVidData(bollywoodBackup);
        case "hollywood":
          return getReqVidData(hollywoodBackup);
        case "popular":
          return getReqVidData(popularBackup);
        case "kids":
          return getReqVidData(kidsBackup);
        default:
          return [];
      }
    }
  } catch (error) {
    console.log("Something went wrong with video library", error.message);
    return [];
  }
};

const getVideos = async (searchQuery, videoType) => {
  const SEARCH_URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
  return fetchVideos(SEARCH_URL, videoType);
}

export const getPopularVideos = async () => {
  const POPULAR_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=IN`;
  // `https://${BASE_URL}/${POPULAR_URL}&key=${YOUTUBE_API_KEY}`;
  return fetchVideos(POPULAR_URL, "popular");
}

export default getVideos;
