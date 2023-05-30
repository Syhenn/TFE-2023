import axios from "axios";
import React, {useState, useEffect} from "react";

const Progress = (courseId) => {
    const [courseChapter, setCourseChapter] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const fetchDataChapter = async () => {
            try {
                const response = await axios.get("https://localhost:7227/Chapter", courseId);
                setCourseChapter = response.data;
                console.log(courseChapter);
            }catch(e){
                console.log(e);
            }
        }
    })
}

export default Progress;