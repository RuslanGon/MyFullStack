import React, { useEffect, useState } from 'react'
import { fetchApiCars } from '../services/api.js'
import css from './CarsPage.module.css'

const CarsPage = () => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [query, setQuery] = useState('')  
  const [filter, setFilter] = useState('') 

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true)
      try {
        const data = await fetchApiCars()
        setCars(data.items)
      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    loadCars()
  }, [])

  const handleSearch = () => {
    setFilter(query)
  }

  const onChangeFilter = (e) => {
    setQuery(e.target.value)
  }

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div className={css.wrapper}>
      
      <aside className={css.sidebar}>
        <h2 className={css.title}>Car market</h2>
        <h3 className={css.subtitle}>Search car by name</h3>
        <input
          className={css.searchInput}
          type="text"
          placeholder="search"
          value={query}
          onChange={onChangeFilter}
        />

        <button
          type="button"
          className={css.button}
          onClick={handleSearch}
        >
          Search car
        </button>
      </aside>

      <div className={css.content}>
        {loading && <div>...Loading</div>}
        {error && <div>...error</div>}

        {filteredCars.map(car => (
          <ul className={css.card} key={car.id}>
            <li>
              <img src={car.gallery[0].thumb} alt={car.name} />
            </li>
            <li>Name: {car.name}</li>
            <li>Price: {car.price}</li>
          </ul>
        ))}
      </div>

    </div>
  )
}

export default CarsPage
