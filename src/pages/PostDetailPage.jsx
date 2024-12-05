import { useParams } from 'react-router-dom';
import { Stack, Grid, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MainImage from '../components/MainImage';
import PostTile from '../components/PostTile';
import 'quill/dist/quill.snow.css'; // Import Quill stylesheet

export default function PostDetailPage({ posts }) {

  const { urlTitle } = useParams();
  const post = posts.find(post => post.urlTitle === urlTitle);
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

  return (
    <>
      <Stack spacing={6}>

        <Stack spacing={3} sx={{ border: '1px solid var(--border-color)', px: 10, py: 4 }}>
          <Typography>{formattedDate}</Typography>
          <Typography variant="h1">{post.title}</Typography>
          <Typography variant="body1" sx={{fontWeight: 500}}>{post.perex}</Typography>
          <MainImage imgSrc={post.image} />
          <Box className="ql-snow">
             <Box className="ql-content" dangerouslySetInnerHTML={{ __html: post.content }} />
          </Box>
        </Stack>

        <Box>
          <Stack direction='row' justifyContent='space-between' alignItems='center'  sx={{ mb: 2 }} >
            <Typography variant='sectionTitle'>Další články o životě</Typography>
            <Link variant='body1' component={RouterLink} to='/ze-zivota'>Všechny články</Link>
          </Stack>
          <Grid container >
              {postsWithoutAuthor.slice(0,2).map((post, index) => (
                <Grid item xs={12} sm={6} md={6} key={post.id} sx={{ display: 'flex', ...(index === 1 && { pl: 2 }) }}>
                  <PostTile imgSrc='../littlehand_desktop.jpg' id={post.id} key={post.id} title={post.title} urlTitle={post.urlTitle} date={post.date} perex={post.perex} />
                </Grid>
              ))}
          </Grid>
        </Box>
        
      </Stack>
    </>
  );
} 