import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchApiCarById } from '../services/api.js';

const CarPageDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCar = async () => {
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
    loadCar();
  }, [id]);

  if (loading) return <div>...Loading</div>;
  if (error) return <div>...error</div>;
  if (!car) return null;

  return (
    <div>
      <h2>Car details</h2>
      <ul>
        {car.gallery?.[0] && (
          <li>
            <img src={car.gallery[0].thumb} alt={car.name} width={300} />
          </li>
        )}
        <li>Name: {car.name}</li>
        <li>Price: {car.price}</li>
        <li>Location: {car.location}</li>
        <li>Description: {car.description}</li>
      </ul>
    </div>
  );
};

export default CarPageDetails;
