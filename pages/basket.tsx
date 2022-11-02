import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import Header from "../components/Header";
import { basketState } from "../atoms/basketState";
import {useRecoilState} from "recoil";
const stripePromise = loadStripe(
  "pk_test_51LzTgXIIU11N476OZW81xmtNzTNzNGWdT9G7K23GAw4C2UAZDDQnbpnWDXFlfZQ534JCsJg9mbNUXuHNxz8rjXPD008Rpe3331"
);


function Basket() {
  const [basket,setBasket] = useRecoilState(basketState)
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // call the backend checkout-session
    const checkoutSession = await axios.post("/api/checkout-session", {
       items : basket,
    });
    //Redirect to the stripe checkout
    const result = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (

    <div>
      <Header />

      <button onClick={() => createCheckoutSession()} type="submit" role="link">
        Create Checkout Session
      </button>
    </div>
  );
}

export default Basket;
