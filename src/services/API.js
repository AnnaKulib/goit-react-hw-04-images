import axios from 'axios';

const KEY = '26815523-fce97669ecba6a5ffa2a6f920';
axios.defaults.baseURL = 'https://pixabay.com/api';

const ServiceApi = async (name, page) => {
  const responce = await axios.get(
    `?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return responce.data;
};

const api = {
  ServiceApi,
};

export default api;
