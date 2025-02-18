export const API_KEY = process.env.REACT_APP_API_KEY;
export const YOUTUBE_VIDEO_API = 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=60&regionCode=IN&key=';
export const YOUTUBE_SEARCH_API =   'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=14&type=video&key=' + API_KEY + '&q=';
export const YOUTUBE_COMMENTS = 'https://www.googleapis.com/youtube/v3/comments?part=snippet'