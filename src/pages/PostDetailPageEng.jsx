import { useParams } from 'react-router-dom';
import { Stack, Grid, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainImage from '../components/MainImage';
import PostTile from '../components/PostTile';
import DOMPurify from 'dompurify';
import '../styles/quill-custom.css';

export default function PostDetailPage({ posts }) {

  const { urlTitle } = useParams();
  const post = posts.find(post => post.urlTitle_eng === urlTitle);
  const postsWithoutAuthor = posts.filter(post => !post.author);

  if (!post) {
    return <Typography>Článek nenalezen</Typography>;
  }

  let dateObject;
  if (post.date instanceof Date) {
    dateObject = post.date;
  } else if (post.date && typeof post.date.toDate === 'function') {
    dateObject = post.date.toDate();
  } else if (typeof post.date === 'string') {
    dateObject = new Date(post.date);
  } else {
    dateObject = new Date();
  }

  const formattedDate = dateObject.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const sanitizedContent = DOMPurify.sanitize(post.content_eng);

  return (
    <>
      <Stack spacing={6}>

        <Stack spacing={3} sx={{ border: {xs: 'none', md: '1px solid var(--border-color)'}, px: {xs: 2, md: 10}, py: {xs: 0, md: 4} }}>
          <Typography>{formattedDate}</Typography>
          <Typography variant="h1">{post.title_eng}</Typography>
          <Typography variant="body1" sx={{fontWeight: 500}}>{post.perex_eng}</Typography>
          <MainImage imgSrc={post.image} />
          <Box className="ql-snow">
             <Box className="ql-content" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          </Box>
        </Stack>

        <Box>
          <Stack direction='row' justifyContent='space-between' alignItems='center'  sx={{ mb: 2 }} >
            <Typography variant='sectionTitle'>Next posts about life</Typography>
            <Link variant='body1' component={RouterLink} to='/ze-zivota'>More posts</Link>
          </Stack>

          <Grid container spacing={2}>
            {postsWithoutAuthor
              .filter(p => p.id !== post.id) // Exclude the current post
              .slice(0, 3)
              .map((post, index) => (
                <Grid item xs={12} sm={4} key={post.id} sx={{ display: 'flex' }}>
                  <PostTile
                    key={post.id}
                    id={post.id}
                    urlTitle={post.urlTitle_eng}
                    tags={post.tags}
                    rating={post.rating}
                    title={post.title_eng}
                    author={post.author}
                    perex={post.perex_eng}
                    imgSrc={post.image}
                    sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
        
      </Stack>
    </>
  );
} 