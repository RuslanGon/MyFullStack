import React, { useEffect, useState } from 'react';
import { fetchApiCars } from '../services/api.js';
import css from './CarsPage.module.css';
import { Link } from 'react-router-dom';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const loadCars = async () => {
      setLoading(true);
      try {
        const data = await fetchApiCars();
        setCars(data.items); 
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadCars();
  }, []);

  const handleSearch = () => setFilter(query);

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(filter.toLowerCase())
  );

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
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={css.button} onClick={handleSearch}>Search car</button>
      </aside>

      <div className={css.content}>
        {loading && <div>...Loading</div>}
        {error && <div>...error</div>}

        {filteredCars.map(car => (
          <div key={car.id}>
            <ul className={css.card}>
              <li>
                {car.gallery?.[0] && <img src={car.gallery[0].thumb} alt={car.name} />}
              </li>
              <li>Name: {car.name}</li>
              <li>Price: {car.price}</li>
              <li>
                <Link to={`/cars/${car.id}`} className={css.button}>
                  View Details
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
