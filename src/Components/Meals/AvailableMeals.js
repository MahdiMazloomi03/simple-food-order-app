import React, { useEffect, useState } from 'react';
import useRequest from '../Hooks/use-request';

import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem';
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendRequest } = useRequest();
  useEffect(() => {
    const fetchMeals = (data) => {
      const loadedMeals = [];
      for (const key in data) {
        loadedMeals.push({
          id: data[key].id,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMeals(loadedMeals);
    };
    sendRequest(
      {
        url: 'https://react-test-f4d22-default-rtdb.firebaseio.com/meals.json',
      },
      fetchMeals
    );
  }, [sendRequest]);
  // const DUMMY_MEALS = [
  //   {
  //     id: 'm1',
  //     name: 'Sushi',
  //     description: 'Finest fish and veggies',
  //     price: 22.99,
  //   },
  //   {
  //     id: 'm2',
  //     name: 'Schnitzel',
  //     description: 'A german specialty!',
  //     price: 16.5,
  //   },
  //   {
  //     id: 'm3',
  //     name: 'Barbecue Burger',
  //     description: 'American, raw, meaty',
  //     price: 12.99,
  //   },
  //   {
  //     id: 'm4',
  //     name: 'Green Bowl',
  //     description: 'Healthy...and green...',
  //     price: 18.99,
  //   },
  // ];
  let content;
  if (error) content = error;
  if (isLoading) content = 'Loading...';
  const mealsList = meals.map((meal) => (
    <li key={meal.id}>
      <MealItem item={meal} />
    </li>
  ));
  return (
    <Card className={styles.meals}>
      {content && <p className={styles['http-text']}>{content}</p>}
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
