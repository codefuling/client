import React from 'react';
import Input from './style';

const BasicInput = ({ref, children, ...rest}) => {
    
    return (
        // size={size} shape={shape} variant={variant}
        <Input ref={ref} {...rest}>
            {children}
        </Input>
    );
};

export default BasicInput;