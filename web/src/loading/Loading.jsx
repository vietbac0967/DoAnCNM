import { Box, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Loading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 150);

        return () => {
            clearInterval(timer);
        };
    }, [])

    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} />
        </Box>
    )

};

export default Loading;