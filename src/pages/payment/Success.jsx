import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);  // 요청 여부 추적하는 상태
  
  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("http://localhost:8000/payment/toss", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    // 요청이 이미 전송되었다면 실행하지 않음
    if (!isRequestSent) {
      confirm()
        .then((data) => {
          setResponseData(data);
          setIsRequestSent(true);  // 요청이 성공적으로 완료되었으므로 플래그 설정
        })
        .catch((error) => {
          navigate(`/fail?code=${error.code}&message=${error.message}`);
        });
    }
  }, [searchParams, isRequestSent, navigate]);  // isRequestSent도 의존성 배열에 추가

  return (
    <div>
      <h1>결제가 성공적으로 완료되었습니다!😄</h1>
      <h2>주문번호 : {searchParams.get("orderId")}</h2>
      <h2>주문가격 : {searchParams.get("amount")}</h2>
      <Link to={'/payment'}>다른상품 보러가기</Link>
    </div>
  );
};

export default Success;
