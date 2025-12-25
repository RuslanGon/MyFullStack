import React, { useEffect, useState } from 'react';
import { fetchApiCars } from '../services/api.js';
import css from './CarsPage.module.css';
import SearchForm from '../components/SearchForm.jsx';
import SearchFormByName from '../components/SearchFormByName.jsx';
import CarsList from '../components/CarsList.jsx';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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

  const filteredCars = cars.filter(car =>
    car.name.toLowerCase().includes(filter.toLowerCase()) &&
    car.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <div className={css.sidebarWrapper}>
      <SearchFormByName onSearch={setFilter} />
        <SearchForm onSearch={setLocationFilter} />
      </div>
      <div className={css.content}>
        {loading && <div>...Loading</div>}
        {error && <div>...error</div>}
        <div className={css.grid}>
          {filteredCars.map(car => (
          < CarsList car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
