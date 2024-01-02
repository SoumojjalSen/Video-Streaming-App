import animatedBackup from "../data/video_data_backup/animated_movies_backup.json";
import bollywoodBackup from "../data/video_data_backup/bollywood_movies_backup.json";
import hollywoodBackup from "../data/video_data_backup/hollywood_movies_backup.json";
import kidsBackup from "../data/video_data_backup/kids_videos_backup.json";
import popularBackup from "../data/video_data_backup/popular_movies_backup.json";

const getReqVidData = (data) => {
  return data?.items.map((item) => {
    const id = item?.id?.videoId || item?.id?.channelId || item?.id;
    return {
      id,
      title: item.snippet.title,
      imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      description: item.snippet.description,
      publishTime: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      statistics: item.statistics ? item.statistics : { viewCount: 0 },
    };
  });
};


const fetchVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;  
  const BASE_URL = "youtube.googleapis.com/youtube/v3";
  return await fetch(
    `https://${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`
    );
  } 
  
  const getVideoDetails = async (url, videoType) => {
    
  const isDev = process.env.DEVELOPMENT;

  console.log("What is the status :: ", isDev);
  console.log("What is the type :: ", typeof isDev);
  console.log("What is the type 2 :: ", typeof Boolean(isDev));
  // const isDev = false;


    
  try {  
    let response;

    if (process.env.NODE_ENV === "development") {
      if (videoType === "videoInfoId") {
        response = await fetchVideos(url);
      } else {
        response = false;
      }
    } else {
      response = await fetchVideos(url);
    }

    if (response && response.ok) {
      const videoData = await response.json();
      
      console.log("video dataataata", videoData);
      
      return getReqVidData(videoData);
    } else {
      // Return imported data based on videoType
      console.log("Retrieved from backup");
      console.log("For development");
      
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
  return getVideoDetails(SEARCH_URL, videoType);
}


export const getPopularVideos = async () => {
  const POPULAR_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=IN`;
  return getVideoDetails(POPULAR_URL, "popular");
}

export const getYoutubeVideoById = async (videoId) => {
  const VIDEO_ID_URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getVideoDetails(VIDEO_ID_URL, "videoInfoId");
}


export default getVideos;
