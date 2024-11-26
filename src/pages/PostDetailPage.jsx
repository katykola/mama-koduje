import { useParams } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import MainImage from '../components/MainImage';
import PostTile from '../components/PostTile';

export default function PostDetailPage({ posts, handlePostSelect }) {
  const { id } = useParams();
  const post = posts.find(post => post.id === id);

  const postsWithoutAuthor = posts.filter(post => !post.author);


  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  // Check if date is defined and has a toDate method
  const dateObject = post.date && post.date.toDate ? post.date.toDate() : new Date();

  // Format the date to DD.MM.YYYY
  const formattedDate = dateObject.toLocaleDateString('cs-CZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <>
      <Stack spacing={6}>
        <Stack spacing={3} sx={{ border: '1px solid grey', p: 3 }}>
          <Typography>{formattedDate}</Typography>
          <Typography variant="h1">{post.title}</Typography>
          <Typography variant="body1">{post.perex}</Typography>
          <MainImage imgSrc="/littlehand_desktop.jpg" />
          <Typography variant='body1'>{post.content}</Typography>
        </Stack>
        <Stack spacing={2}>
          <Typography variant='sectionTitle'>POSTŘEHY ZE ŽIVOTA</Typography>
            {postsWithoutAuthor.map((post) => (
              <PostTile imgSrc='../littlehand_desktop.jpg' id={post.id} title={post.title} date={post.date} perex={post.perex} onPostSelect={handlePostSelect}/>
            ))}
        </Stack>
      </Stack>

    </>
  );
} 