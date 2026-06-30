import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 2,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body1">
          Б9123-09.03.04 (3 пг)
        </Typography>
        <Typography variant="body1">
          Абрамашвили Леван
        </Typography>
        <Typography variant="body1">
          2025
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;