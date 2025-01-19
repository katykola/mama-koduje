import { Stack, Box } from '@mui/material';
import katyVeSlunci from '../assets/images/katy-ve-slunci300.jpg'; 
import miminkoSHrazdickou from '../assets/images/miminko-s-hrazdickou.jpg'; 
import nositko from '../assets/images/nositko.jpg';
import diteAPonozky from '../assets/images/dite-a-ponozky.jpg';
import batolatko from '../assets/images/batolatko.jpg';
import notebook from '../assets/images/notebook.jpg';
import katerinaKolarova from '../assets/images/katerina_kolarova.jpg';
import medvidek from '../assets/images/medvidek.jpg';
import naHristi from '../assets/images/na-hristi.jpg';
import KaterinaKolarova2 from '../assets/images/katerina-kolarova.jpg';


export default function AboutMePhotos() {
    return (
        <Stack spacing={4} sx={{display: { xs: 'none', sm: 'flex' }}}>
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={katyVeSlunci}
            />
            <Box
                 component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={medvidek}
            />          
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={miminkoSHrazdickou}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={nositko}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={diteAPonozky}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={batolatko}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={notebook}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={katerinaKolarova}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={naHristi}
            />
            <Box
                component="img"
                sx={{
                    width: '300px',
                    objectFit: 'cover', // Maintain aspect ratio and cover the area
                    objectPosition: 'top', // Align the top part of the image with the top of the container
                }}
                alt="placeholder"
                src={KaterinaKolarova2}
            />
        </Stack>
    )
}