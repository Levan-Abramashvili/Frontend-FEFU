import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import structures from '../data';
import BuildCard from './BuildCard';

// Порядок как на скриншоте: Красная площадь, Байкал, Эрмитаж, Родина-мать, Долина гейзеров, Софийский собор
const cardData = [structures[0], structures[4], structures[1], structures[3], structures[5], structures[2]];

function Content() {
  // Разбиваем на 3 колонки по 2 элемента
  const leftColumn = [cardData[0], cardData[3]];   // Красная площадь, Родина-мать
  const centerColumn = [cardData[1], cardData[4]];   // Байкал, Долина гейзеров
  const rightColumn = [cardData[2], cardData[5]];   // Эрмитаж, Софийский собор

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Левая колонка */}
        <Box sx={{ flex: 1, px: 2, py: 1 }}>
          {leftColumn.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <BuildCard building={item} />
            </Box>
          ))}
        </Box>

        {/* Разделитель */}
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        {/* Центральная колонка */}
        <Box sx={{ flex: 1, px: 2, py: 1 }}>
          {centerColumn.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <BuildCard building={item} />
            </Box>
          ))}
        </Box>

        {/* Разделитель */}
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

        {/* Правая колонка */}
        <Box sx={{ flex: 1, px: 2, py: 1 }}>
          {rightColumn.map((item, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <BuildCard building={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Content;