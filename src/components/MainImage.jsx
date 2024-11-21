import { Box } from '@mui/material';

export default function MainImage({ imgSrc }) {
    return(
        <Box
        sx={{
          width: '100%', // Set width to 100% to make it responsive
          maxWidth: 940, // Set the maximum width to 940 pixels
          aspectRatio: '2 / 1', // Maintain an aspect ratio of 2:1
          p: 0, // Remove padding
          mb: 4,
          overflow: 'hidden', // Ensure the image does not overflow the container
        }}
      >
        <Box
          component="img"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Maintain aspect ratio and cover the area
            objectPosition: 'top', // Align the top part of the image with the top of the container
          }}
          alt="placeholder"
          src={imgSrc}
        />
      </Box>
    )
}