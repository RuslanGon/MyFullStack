import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CarsPage = () => {

const [cars, setCars] = useState(null) 
const [loding, setLoding] = useState(false) 
const [error, setError] = useState(false) 

useEffect(() => {
  setLoding(true)
  
  try {
    async function fetchCars () {
      const {data} = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers')
      console.log(data.items);
      setCars(data.items)
    }
    fetchCars()
  } catch (error) {
    console.log(error);
    setError(true)
  }finally {
    setLoding(false)
  }
}, 
[loding])

  return (
    <div>
      <h2>Car market</h2>
      {loding && <div>...Loading</div>}
      {error && <div>...error</div>}
      {Array.isArray(cars) && cars.map(car => 
        <ul key={car.id}>
          <li><img src={car.gallery[0].thumb} alt={car.name} /></li>
          <li>Name: {car.name}</li>
          <li>price: {car.price}</li>
        </ul>
      )}
    </div>
  )
}

export default CarsPage