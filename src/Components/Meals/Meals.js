import React, { Fragment } from 'react';
import AvailableMeals from './AvailableMeals';
import MealsSummery from './MealsSummery';
const Meals = () => {
  return (
    <Fragment>
      <MealsSummery />
      <AvailableMeals />
    </Fragment>
  );
};

export default Meals;
