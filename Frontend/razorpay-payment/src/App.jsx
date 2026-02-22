import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [price, setPrice] = useState(0);
  const handlePrice = (e) => {
    try {
      
      setPrice(e.target.value);
    }
    catch (error) {
      console.log("error");
      console.log(price);
      
      
    }
  }
  
  
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(false);
      document.body.appendChild(script);
    });
  }

  const verifyRazorPayPayment = async (money) => {
    const loaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!loaded) {
      alert("RazorPay SDK failed to load");
      return;
    }

    const { data } = await axios.post("http://localhost:5001/create-order", {
      amount: money,
    });

    console.log("Backend response:", data.order);
    const { amount, id, currency} = data.order
    
    const options = {
      key: "rzp_test_SJ4wRHeHIt4zGq",
      amount: amount,  
      orderId: id,
      currency: currency,
      name: "Nitish",
      description:"RazorPay Testing"
    },
    handler = function () {
      alert(response)
    };
    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
}
  return (
    <>
      <div>RazorPay Payment Integration</div>
      <input type="text" onChange={handlePrice}/>
      <button onClick={() => verifyRazorPayPayment(price)}>Verify & Pay</button>
    </>
  );
}

export default App;
