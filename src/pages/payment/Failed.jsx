import React from 'react';
import { Link } from 'react-router-dom';

const Failed = () => {
    return (
        <div>
            결제가 실패했습니다.🥲
            카드를 확인 후 다시 시도해주세요.
            <Link to={"/payment"} />
        </div>
    );
};

export default Failed;