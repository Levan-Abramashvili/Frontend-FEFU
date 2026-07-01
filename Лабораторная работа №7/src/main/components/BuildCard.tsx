import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
}

function BuildCard({ building, index }: ComponentProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { 
          xs: 'column',
          sm: 'column',
          md: 'column'
        },
        height: '100%',
      }}
    >
      <CardMedia
        component="img"
        alt={building.title}
        image={building.img}
        sx={{
          width: { 
            xs: '100%', 
            md: '100%'
          },
          minWidth: { xs: 'unset', md: 140 },
          height: { 
            xs: 'auto',
            sm: 'auto',
            md: 'auto'
          },
          objectFit: 'cover',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ textAlign: { xs: 'left', md: 'left' } }}>
          <Typography gutterBottom variant="h6">
            {building.title}
          </Typography>
          {building.description.map((item, ind) => (
            <StyledTypography
              key={ind}
              variant="body2"
              sx={{ 
                textAlign: { xs: 'justify', md: 'justify' },
                fontSize: { xs: '0.875rem', md: '0.75rem' }
              }}
            >
              {item}
            </StyledTypography>
          ))}
        </CardContent>
        <CardActions
          sx={{
            justifyContent: { xs: 'center', md: 'flex-end' },
          }}
        >
          <Button size="small">Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default BuildCard;