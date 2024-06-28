import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {

  const [isAmountValid, setIsAmountValid] = useState(true)  //to output error in the ui
  const amountInputRef = useRef()


  const submitHandler = event => {
    event.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    // console.log(amountInputRef.current.value)
    const enteredAmountNumber = +enteredAmount
    // console.log(enteredAmountNumber)

    if(enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5){
      setIsAmountValid(false)
      return
    }
    props.onAddToCart(enteredAmountNumber)
  }


  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amount_" + props.id,
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isAmountValid && <p className={classes.invalid}>Please enter a valid amount (1-5). </p>}
    </form>
  );
};

export default MealItemForm;
