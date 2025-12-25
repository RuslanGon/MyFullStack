import React from 'react'
import { Link } from 'react-router-dom'
import css from './CarsList.module.css'

const CarsList = ({ car }) => {
  return (
    <ul key={car.id} className={css.card}>
      <li>
        {car.gallery?.[0] && <img src={car.gallery[0].thumb} alt={car.name} />}
      </li>
      <li>Name: {car.name}</li>
      <li>Price: ${car.price}</li>
      <li>
        <Link to={`/cars/${car.id}`} className={css.button}>
          View Details
        </Link>
      </li>
    </ul>
  )
}

export default CarsList
