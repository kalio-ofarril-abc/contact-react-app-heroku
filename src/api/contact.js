import axios from "axios"

export default axios.create({
    baseURL: "https://storytelling-db.herokuapp.com",
})