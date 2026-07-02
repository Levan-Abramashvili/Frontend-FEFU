import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import structures from "../../data";
import BuildCard from './BuildCard';

function Content() {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 2fr 1fr',
          },
          gap: 4,
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            borderRight: { xs: 'none', md: '1px solid #ccc' },
            pr: { xs: 0, md: 2 },
          }}
        >
          <BuildCard building={structures[3]} index={3} variant="left" imgSize="small" />
          <BuildCard building={structures[0]} index={6} variant="left" imgSize="large" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <BuildCard building={structures[1]} index={9} variant="center-large" />
          <BuildCard building={structures[5]} index={7} variant="center-wide" />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            borderLeft: { xs: 'none', md: '1px solid #ccc' },
            pl: { xs: 0, md: 2 },
          }}
        >
          <BuildCard building={structures[2]} index={2} variant="right" imgSize="large" />
          <BuildCard building={structures[4]} index={4} variant="right" imgSize="small" />
        </Box>
      </Box>
    </Container>
  );
}

export default Content;