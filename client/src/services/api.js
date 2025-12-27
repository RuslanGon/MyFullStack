import axios from "axios";

export const fetchApiCars = async () => {
    const { data } = await axios.get("https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers");
    return data;  
  };


  export const fetchApiCarById = async (id) => {
    const { data } = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
    return data;
  }; 