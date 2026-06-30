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
  variant?: 'default' | 'big';
  imagePosition?: 'left' | 'right';
}

function BuildCard({ building, variant = 'default', imagePosition = 'right' }: ComponentProps) {
  const isBig = variant === 'big';
  const isLeft = imagePosition === 'left';

  return (
    <Card
      sx={{
        display: 'flex',
        height: '100%',
        flexDirection: isLeft ? { xs: 'column', sm: 'row-reverse' } : { xs: 'column', sm: 'row' },
      }}
    >
      <CardMedia
        component="img"
        alt={building.title}
        image={building.img}
        sx={{
          width: { xs: '100%', sm: 140 },
          minWidth: { xs: 'unset', sm: 140 },
          height: { xs: 180, sm: isBig ? 220 : 160 },
          objectFit: 'cover',
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardContent sx={{ textAlign: { xs: 'center', sm: isLeft ? 'left' : 'right' }, py: 1.5 }}>
          <Typography gutterBottom variant="h6" sx={{ fontSize: '0.9rem', mb: 0.5 }}>
            {building.title}
          </Typography>
          {building.description.map((item, ind) => (
            <StyledTypography
              key={ind}
              variant="body2"
              sx={{ 
                textAlign: { xs: 'center', sm: 'justify' },
                fontSize: '0.85rem',
                lineHeight: 1.4,
              }}
            >
              {item}
            </StyledTypography>
          ))}
        </CardContent>
        <CardActions 
          sx={{ 
            justifyContent: { xs: 'center', sm: isLeft ? 'flex-start' : 'flex-end' }, 
            mt: 'auto',
            py: 1,
          }}
        >
          <Button size="small" sx={{ color: 'brown' }}>Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default BuildCard;