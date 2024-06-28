import React from "react";
import MealSummary from "./MealSummary";
import AvailabeMeals from "./AvailableMeals";

const Meals = () => {
  return (
    <React.Fragment>
      <MealSummary />
      <AvailabeMeals />
    </React.Fragment>
  );
};

export default Meals;
