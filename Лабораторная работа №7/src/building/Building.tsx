import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, Link } from 'react-router-dom';
import structures from "../data";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Building() {
  const { id } = useParams();
  const index = id !== undefined ? parseInt(id, 10) : 0;
  const safeIndex =
    Number.isFinite(index) && index >= 0 && index < structures.length ? index : 0;
  const building = structures[safeIndex];

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link to="/" style={{ color: '#5d8aa8', textDecoration: 'none' }}>
            Главная
          </Link>
          <Typography color="text.primary">{building.title}</Typography>
        </Breadcrumbs>

        <Typography variant="h4" component="h1" align="center" gutterBottom>
          {building.title}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <img
            src={building.img}
            alt={building.title}
            style={{ 
              maxWidth: '100%', 
              height: '600px', 
              borderRadius: '8px',
            }}
          />
        </Box>

        <Grid container spacing={4} sx={{ maxWidth: '1000px', mx: 'auto' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            {building.description[0] && (
              <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                {building.description[0]}
              </Typography>
            )}
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {building.description[1] && (
              <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                {building.description[1]}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Building;