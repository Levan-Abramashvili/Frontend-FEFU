import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import structures from "../../data";

const imgData = structures.slice(0, 5);

function Gallery() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ m: '20px auto' }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gridTemplateRows: '200px 200px 200px 200px',
          }}
        >
          {imgData[0] && (
            <Box
              component={Link}
              to={`/building/0`}
              sx={{
                gridColumn: '1 / 2',
                gridRow: '1 / 3',
              }}
            >
              <img
                src={imgData[0].img}
                alt={imgData[0].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}

          {imgData[1] && (
            <Box
              component={Link}
              to={`/building/1`}
              sx={{
                gridColumn: '1 / 2',
                gridRow: '3 / 5',
              }}
            >
              <img
                src={imgData[1].img}
                alt={imgData[1].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}

          {imgData[2] && (
            <Box
              component={Link}
              to={`/building/2`}
              sx={{
                gridColumn: '2 / 3',
                gridRow: '1 / 2',
              }}
            >
              <img
                src={imgData[2].img}
                alt={imgData[2].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}

          {imgData[3] && (
            <Box
              component={Link}
              to={`/building/3`}
              sx={{
                gridColumn: '2 / 3',
                gridRow: '2 / 4',
              }}
            >
              <img
                src={imgData[3].img}
                alt={imgData[3].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}

          {imgData[4] && (
            <Box
              component={Link}
              to={`/building/4`}
              sx={{
                gridColumn: '2 / 3',
                gridRow: '4 / 5',
              }}
            >
              <img
                src={imgData[4].img}
                alt={imgData[4].title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Gallery;