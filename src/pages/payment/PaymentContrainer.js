import React from 'react';
import { Outlet } from 'react-router-dom';

const PaymentContrainer = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default PaymentContrainer;