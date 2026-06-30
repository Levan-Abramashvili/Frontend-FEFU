import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const galleryImages = [
  { src: 'images/image1.jpeg', size: 'left' },
  { src: 'images/image2.jpeg', size: 'left' },
  { src: 'images/image3.jpeg', size: 'right' },
  { src: 'images/image4.jpeg', size: 'right-center' },
  { src: 'images/image5.jpeg', size: 'right' },
];

function Gallery() {
  const leftImages = galleryImages.filter((img) => img.size === 'left');
  const rightImages = galleryImages.filter((img) => img.size !== 'left');

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          width: '90%',
          height: { xs: 'auto', md: '30vw' },
          overflow: 'hidden',
          mx: 'auto',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Левая колонка 66.66% */}
        <Box
          sx={{
            width: { xs: '100%', md: '66.66%' },
            height: { xs: 'auto', md: '100%' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {leftImages.map((img, index) => (
            <Box
              key={index}
              sx={{
                width: '100%',
                height: { xs: '200px', md: '50%' },
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <Box
                component="img"
                src={img.src}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          ))}
        </Box>

        {/* Правая колонка 33.33% */}
        <Box
          sx={{
            width: { xs: '100%', md: '33.33%' },
            height: { xs: 'auto', md: '100%' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Верхняя маленькая */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '150px', md: '25%' },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={rightImages[0]?.src}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>

          {/* Средняя большая */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '300px', md: '50%' },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={rightImages[1]?.src}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>

          {/* Нижняя маленькая */}
          <Box
            sx={{
              width: '100%',
              height: { xs: '150px', md: '25%' },
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={rightImages[2]?.src}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Gallery;