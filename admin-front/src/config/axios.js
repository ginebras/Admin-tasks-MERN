import axios from 'axios';

const axiosClient=axios.create({
	baseUrl:process.env.REACT_APP_BACKEND_URL
});

export default axiosClient;