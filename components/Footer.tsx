import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 3,
        mt: 5,
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h6" align="center" gutterBottom>
          Самые высокие здания и сооружения
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
