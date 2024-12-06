import axios from 'axios';

const fetchData = async () => {
    try {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/users`)
        return result;

    } catch (error) {
        console.log(error.message);
    }
  return;
}

export default fetchData