import React from 'react';
import PaymentButton from './PaymentButton';
import { useSelector } from 'react-redux';

const Detail = () => {
  const { email, name } = useSelector((state) => state.user.curruentUser);
  const productName = "고구마 맛탕"
  const productPrice = 20000;
  console.log(email, name)
  return (
    <>
      <div>
        결제 상품 : {productName}
        결제 가격 : {productPrice}
      </div>
      <PaymentButton 
        productPrice={productPrice} 
        orderName={productName}
        customerName={email}
        customerEmail={name}
      />
    </>
  );
};

export default Detail;