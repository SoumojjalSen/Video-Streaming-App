import axios from "axios";

// from docs swr
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default fetcher;