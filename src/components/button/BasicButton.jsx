import React from 'react';
import Button from './style';

const BasicButton = ({ref, children, ...rest}) => {
    
    return (
        // size={size} shape={shape} variant={variant}
        <Button ref={ref} {...rest}>
            {children}
        </Button>
    );
};

export default BasicButton;