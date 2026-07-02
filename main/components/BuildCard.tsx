import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textAlign: 'justify',
  marginBottom: theme.spacing(1),
}));

interface ComponentProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  index: number;
  variant?: 'left' | 'right' | 'center-large' | 'center-wide';
  imgSize?: 'small' | 'large';
}

function BuildCard({ building, index, variant = 'left', imgSize = 'small' }: ComponentProps) {
  const linkStyle: React.CSSProperties = {
    color: '#5d8aa8',
    textDecoration: 'underline',
    fontSize: '0.9rem',
  };

  const imgWidth = '40%';
  const imgHeight = imgSize === 'large' ? '350px' : '200px';

  if (variant === 'left') {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {building.title}
            </Typography>
            {building.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2" sx={{ fontSize: '0.75rem' }}>
                {item}
              </StyledTypography>
            ))}
          </Box>
          <Box sx={{ flex: { xs: '0 0 auto', md: `0 0 ${imgWidth}` }, minWidth: 0 }}>
            <img
              src={building.img}
              alt={building.title}
              style={{
                width: '100%',
                height: { xs: '250px', md: imgHeight } as any,
                objectFit: 'cover',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Link to={`/building/${index}`} style={linkStyle}>
            Подробнее»
          </Link>
        </Box>
      </Box>
    );
  }

  if (variant === 'right') {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: { xs: 'stretch', md: 'flex-start' },
          }}
        >
          <Box sx={{ flex: { xs: '0 0 auto', md: `0 0 ${imgWidth}` }, minWidth: 0 }}>
            <img
              src={building.img}
              alt={building.title}
              style={{
                width: '100%',
                height: { xs: '250px', md: imgHeight } as any,
                objectFit: 'cover',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
              {building.title}
            </Typography>
            {building.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2" sx={{ fontSize: '0.75rem' }}>
                {item}
              </StyledTypography>
            ))}
          </Box>
        </Box>
        <Box sx={{ textAlign: { xs: 'center', md: 'right' }, mt: 1 }}>
          <Link to={`/building/${index}`} style={linkStyle}>
            Подробнее»
          </Link>
        </Box>
      </Box>
    );
  }

  if (variant === 'center-large') {
    return (
      <Box>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          {building.title}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {building.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2" sx={{ fontSize: '0.8rem' }}>
                {item}
              </StyledTypography>
            ))}
          </Box>
          <Box sx={{ flex: { xs: '0 0 auto', md: '0 0 45%' }, minWidth: 0, alignSelf: 'flex-start' }}>
            <img
              src={building.img}
              alt={building.title}
              style={{
                width: '100%',
                height: { xs: '300px', md: '400px' } as any,
                objectFit: 'cover',
                borderRadius: '4px',
                display: 'block',
              }}
            />
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Link to={`/building/${index}`} style={linkStyle}>
            Подробнее»
          </Link>
        </Box>
      </Box>
    );
  }

  if (variant === 'center-wide') {
    return (
      <Box>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          {building.title}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {building.description.map((item, ind) => (
            <StyledTypography key={ind} variant="body2" sx={{ fontSize: '0.8rem', mb: 1 }}>
              {item}
            </StyledTypography>
          ))}
        </Box>

        <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
          <Link to={`/building/${index}`} style={linkStyle}>
            Подробнее»
          </Link>
        </Box>
      </Box>
    );
  }

  return null;
}

export default BuildCard;