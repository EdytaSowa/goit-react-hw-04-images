import axios from 'axios';

const MY_KEY = '30898532-07677536b584d5a486c7433f6';
axios.defaults.baseURL = 'https://pixabay.com/api';

// 'https://${basicURL}/?q=${query}=${MY_KEY}&image_type=photo&orientation=horizontal&per_page=12'

export const getFetchData = async (query,page) => {
  const response = await axios.get(
    `/?key=${MY_KEY}&q=${query}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
console.log(response.data.total)
  return response.data.hits;
};



