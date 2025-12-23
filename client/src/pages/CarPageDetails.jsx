import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchApiCarById } from '../services/api.js';
import css from './CarPageDetails.module.css';

const CarPageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCarById = async () => {
      setLoading(true);
      try {
        const data = await fetchApiCarById(id);
        setCar(data);
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadCarById();
  }, [id]);

  if (loading) return <div>...Loading</div>;
  if (error) return <div>...error</div>;
  if (!car) return null;

  const handleBackCar = () => {
    navigate('/cars')
  }

  return (
    <div className={css.wrapper}>
      <button className={css.backButton} onClick={handleBackCar}>
        &larr; Back to Cars
      </button>

      <h2 className={css.title}>Car details</h2>
      <ul className={css.card}>
        {car.gallery?.[0] && (
          <li>
            <img src={car.gallery[0].thumb} alt={car.name} />
          </li>
        )}
        <li>
          <span>Name:</span> {car.name}
        </li>
        <li>
          <span>Price:</span> ${car.price}
        </li>
        <li>
          <span>Location:</span> {car.location}
        </li>
        <li>
          <span>Description:</span> {car.description}
        </li>
      </ul>
    </div>
  );
};

export default CarPageDetails;
