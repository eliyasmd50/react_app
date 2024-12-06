import axios from 'axios';

const fetchData = async (page) => {
    try {
        const result = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${page}`)
        return result;

    } catch (error) {
        console.log(error.message);
    }
  return (
    <div>fetchData</div>
  )
}

export default fetchData