import React, { useEffect, useState } from 'react';
import { fetchApiCars } from '../services/api.js';
import css from './CarsPage.module.css';
import { Link } from 'react-router-dom';
import SearchForm from '../components/SearchForm.jsx';
import SearchFormByName from '../components/SearchFormByName.jsx';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');


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
  console.log();

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(filter.toLowerCase()) &&
    car.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className={css.wrapper}>
      < SearchForm onSearch={setLocationFilter}/>
      <SearchFormByName onSearch={setFilter} />
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
