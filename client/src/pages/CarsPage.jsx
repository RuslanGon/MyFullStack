import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import css from './CarsPage.module.css';
import SearchForm from '../components/SearchForm.jsx';
import SearchFormByName from '../components/SearchFormByName.jsx';
import CarsList from '../components/CarsList.jsx';
import { selectCarsCars, selectCarsFilter, selectCarsIsError, selectCarsIsLoading } from '../redux/cars/selectors.js';
import { apiGetCars } from '../redux/cars/operations.js';
import { setFilter } from "../redux/cars/carsSlice";


const CarsPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCarsCars) || [];
  const loading = useSelector(selectCarsIsLoading)
  const error = useSelector(selectCarsIsError)
  const filter = useSelector(selectCarsFilter)
  // const [filter, setFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');


  // useEffect(() => {
  //   const loadCars = async () => {
  //     setLoading(true);
  //     try {
  //       const data = await fetchApiCars();
  //       console.log(data.items);
  //       setCars(data.items); 
       
  //     } catch (error) {
  //       console.error(error);
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadCars();
  // }, []);

  useEffect(() => {
    dispatch(apiGetCars())
  }, [dispatch])

  const filteredCars = (cars || []).filter(car =>
    car.name.toLowerCase().includes(filter.toLowerCase()) &&
    car.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className={css.wrapper}>
      <div className={css.sidebarWrapper}>
      <SearchFormByName onSearch={(value) => dispatch(setFilter(value))} />
        <SearchForm onSearch={setLocationFilter} />
      </div>
      <div className={css.content}>
        {loading && <div>...Loading</div>}
        {error && <div>...error</div>}
        <div className={css.grid}>
          {filteredCars.map(car => (
          < CarsList key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
