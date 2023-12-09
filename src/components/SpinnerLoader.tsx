import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';

// const SpinerLoader = React.forwardRef((ref) => {
//     const [isLoader, setIsLoader] = React.useState(true);
//     React.useImperativeHandle(ref, () => ({
//         visible(state: any) {
//             setIsLoader(state);
//         },
//     }));
const SpinerLoader = ( isLoader:boolean) => {
    const [visible, setIsVisible] = React.useState(isLoader);

    useEffect(()=>{
        setIsVisible(isLoader)
    },[isLoader])

    return (
        <Box sx={{position: 'relative', height: 'calc(100vh - 20vh)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Oval
          width={50}
          height={50}
          color="#fff4d0"
          visible={visible}
          ariaLabel='oval-loading'
          secondaryColor="#FFC60B"
          strokeWidth={5}
          strokeWidthSecondary={5}
          wrapperStyle={{
            position: 'absolute',
            top: '50%', // Adjust as needed
            left: '50%', // Adjust as needed
            transform: 'translate(-50%, -50%)', // Center the element
          }}
        /></Box>
    );}
// });

export default SpinerLoader;
