import { useParams } from 'react-router-dom';
import { Stack, Box, Grid, Link, Typography, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/Circle'; 
import ReviewTile from '../components/ReviewTile';
import 'quill/dist/quill.snow.css'; // Import Quill stylesheet
import { useMediaQuery } from '@mui/material';
import theme from '../styles/theme';

export default function ReviewDetailPage({posts}) {

    const { urlTitle } = useParams();
    const review = posts.find(post => post.urlTitle === urlTitle);
    const postsWithAuthor = posts.filter(post => post.author);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    

    if (!review) {
        return <Typography>Recenze nenalezena</Typography>;
      }
    
      let dateObject;
      if (review.date instanceof Date) {
        dateObject = review.date;
      } else if (review.date && typeof review.date.toDate === 'function') {
        dateObject = review.date.toDate();
      } else if (typeof review.date === 'string') {
        dateObject = new Date(review.date);
      } else {
        dateObject = new Date();
      }
    
      const formattedDate = dateObject.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

    
      return (
            <>
      <Stack spacing={6}>

        <Stack spacing={3} sx={{ border: {xs: 'none', md: '1px solid var(--border-color)'}, px: {xs: 2, md: 10}, py: 4 }}>
          <Typography>{formattedDate}</Typography>
          <Rating
          name="read-only"
          value={review.rating}
          readOnly
          sx={{
            '& .MuiRating-iconFilled': {
              color: 'var(--tertiary-color)', 
            },
            '& .MuiRating-iconHover': {
              color: 'var(--tertiary-color)', 
            },
            my: '1rem'
          }}  
        />
          <Typography variant="h1">{review.title}</Typography>
          <Typography variant="body1">{review.author}</Typography>
          <Typography variant="body1" sx={{fontWeight: 600}}>{review.perex}</Typography>
          <Box className="ql-snow">
             <Box className="ql-content" dangerouslySetInnerHTML={{ __html: review.content }} />
          </Box>
        
          {isMobile ? ( 
            <Stack spacing={2}>
            <Box sx={{border: '1px solid var(--border-color)', p: 3}}>
              <Typography variant='body1' sx={{fontWeight: 600, mb: 1}}>Plusy</Typography>
                  <Box sx={{pl: 1}}>
                    {review.positives.map((positive, i) => (
                      <Typography key={i} sx={{mb: 0.5}}><CircleIcon sx={{fontSize: '0.5rem', mr: 1}}/>{positive}</Typography>
                    ))}
                  </Box>
            </Box>
            <Box sx={{border: '1px solid var(--border-color)', p: 3}}>
              <Typography variant='body1' sx={{fontWeight: 600, mb: 1}}>Mínusy</Typography>
                  <Box sx={{pl: 1}}>
                    {review.negatives.map((negative, i) => (
                      <Typography key={i} sx={{mb: 0.5}}><CircleIcon sx={{fontSize: '0.5rem', mr: 1}}/>{negative}</Typography>
                    ))}
                  </Box>
            </Box>
          </Stack>
           ) : (
          <Grid container spacing={2} sx={{ position: 'relative', right: '1rem' }}>
            <Grid item sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ border: '1px solid var(--border-color)', p: 3, flexGrow: 1 }}>
                <Typography variant='body1' sx={{ fontWeight: 600, mb: 1 }}>Plusy</Typography>
                <Box sx={{ pl: 1 }}>
                  {review.positives.map((positive, i) => (
                    <Typography key={i} sx={{ mb: 0.5 }}><CircleIcon sx={{ fontSize: '0.5rem', mr: 1 }} />{positive}</Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid item sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ border: '1px solid var(--border-color)', p: 3, flexGrow: 1 }}>
                <Typography variant='body1' sx={{ fontWeight: 600, mb: 1 }}>Mínusy</Typography>
                <Box sx={{ pl: 1 }}>
                  {review.negatives.map((negative, i) => (
                    <Typography key={i} sx={{ mb: 0.5 }}><CircleIcon sx={{ fontSize: '0.5rem', mr: 1 }} />{negative}</Typography>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}
        </Stack>

          <Box>
            <Stack direction='row' justifyContent='space-between' alignItems='start' sx={{ mb: 2 }}>
              <Typography variant='sectionTitle'>Další recenze</Typography>
              <Link variant='body1' component={RouterLink} to='/recenze'>Všechny recenze</Link>
            </Stack>

            <Grid container spacing={2} >
            {postsWithAuthor
            .filter(p => p.id !== review.id)
            .slice(0, 3)
            .map((post, index) => (
              <Grid item xs={12} sm={4} key={post.id} sx={{ display: 'flex'}}>
                <ReviewTile
                  key={post.id}
                  id={post.id}
                  urlTitle={post.urlTitle}
                  tags={post.tags}
                  rating={post.rating}
                  title={post.title}  
                  author={post.author}
                  perex={post.perex}
                  sx={{ width: '100%',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                />
              </Grid>
            ))}
          </Grid>
          </Box>

            </Stack>
          </>
      );
}