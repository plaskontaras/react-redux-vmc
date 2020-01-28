import axios from 'axios';

export default axios.create({
    baseURL: 'https://reat-quiz-745bb.firebaseio.com'
})