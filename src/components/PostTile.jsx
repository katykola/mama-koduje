import React, { useState, useEffect, useRef } from 'react';
import { Stack, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ResponsivePostTile = ({ imgSrc, formattedDate, urlTitle, title, perex }) => {
    const stackRef = useRef(null); // Reference to the Stack component
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        // Function to check the width of the Stack
        const updateWidth = () => {
            if (stackRef.current) {
                setIsNarrow(stackRef.current.offsetWidth < 400);
            }
        };

        // Update on mount and resize
        updateWidth();
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return (
        <Stack
            ref={stackRef}
            direction={isNarrow ? 'column' : 'row'} // Conditional direction based on width
            sx={{
                width: '100%',
                border: '1px solid var(--border-color)',
                backgroundColor: '#FFEDED',
            }}
        >
            <Box
                sx={{
                    width: isNarrow ? '100%' : '200px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    sx={{
                        width: '100%',
                        height: '100%',
                        aspectRatio: '16 / 9',
                        objectFit: 'cover',
                        objectPosition: 'top',
                    }}
                    alt="placeholder"
                    src={imgSrc}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isNarrow ? 'center' : 'flex-start',
                    justifyContent: 'center',
                    padding: '2rem',
                    width: isNarrow ? '100%' : 'calc(100% - 200px)',
                }}
            >
                <Typography variant="tileTextSm" sx={{ marginBottom: '0.5rem' }}>
                    {formattedDate}
                </Typography>
                <Link component={RouterLink} to={`/clanky/${urlTitle}`}>
                    <Typography variant="tileTitle">{title}</Typography>
                </Link>
                <Typography variant="tileText" sx={{ overflow: 'hidden' }}>
                    {perex}
                </Typography>
            </Box>
        </Stack>
    );
};

export default ResponsivePostTile;
