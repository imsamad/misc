import { useRef, useState } from "react";
import classes from "./CheckoutForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => value.trim().length === 10;
const isSixChars = (value) => value.trim().length === 6;

const CheckoutForm = (props) => {
  const [formIsValid, setFormIsValid] = useState({
    name: true,
    "phone-number": true,
    street: true,
    pinCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const phoneNumberInputRef = useRef();
  const streetInputRef = useRef();
  const pinCodeInputRef = useRef();
  const cityInputRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPincode = pinCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const phoneNumberIsValid = isTenChars(enteredPhoneNumber);
    const streetIsValid = !isEmpty(enteredStreet);
    const pinCodeIsValid = isSixChars(enteredPincode);
    const cityIsValid = !isEmpty(enteredCity);

    setFormIsValid({
      name: nameIsValid,
      "phone-number": phoneNumberIsValid,
      street: streetIsValid,
      pinCode: pinCodeIsValid,
      city: cityIsValid,
    });

    const formValidity =
      nameIsValid &&
      phoneNumberIsValid &&
      streetIsValid &&
      pinCodeIsValid &&
      cityIsValid;

    if (!formValidity) {
      return;
    }

    props.onConfirm({
        name : enteredName,
        'phone-number' : enteredPhoneNumber,
        street : enteredStreet,
        pincode : enteredPincode,
        city : enteredCity
    })
  };

  const nameControlClasses = formIsValid.name
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const phoneNumControlClasses = formIsValid["phone-number"]
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const streetControlClasses = formIsValid.street
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const pinCodeControlClasses = formIsValid.pinCode
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;
  const cityControlClasses = formIsValid.city
    ? `${classes.control}`
    : `${classes.control} ${classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef}></input>
        {!formIsValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={phoneNumControlClasses}>
        <label htmlFor="phone-no">Phone No</label>
        <input type="number" id="phone-no" ref={phoneNumberInputRef}></input>
        {!formIsValid["phone-number"] && (
          <p>Phone number must contain 10 digits.</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef}></input>
        {!formIsValid.street && <p>Please enter a valid street name.</p>}
      </div>

      <div className={pinCodeControlClasses}>
        <label htmlFor="pin">Pin code</label>
        <input type="text" id="pin" ref={pinCodeInputRef}></input>
        {!formIsValid.pinCode && <p>Pincode must contain 6 digits</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef}></input>
        {!formIsValid.city && <p>Please enter a valid city name.</p>}
      </div>

      <div className={classes.actions}>
        <button type="button" onClick={props.onClick}>
          Cancel
        </button>
        <button> Confirm </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
