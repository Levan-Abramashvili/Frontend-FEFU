import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface ComponentProps {
  active: string;
}

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const menuItems = [
    { label: 'Главная', id: '1' },
    { label: 'Меню 2', id: '2' },
    { label: 'Меню 3', id: '3' },
    { label: 'Меню 4', id: '4' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: 'black',
        borderRadius: 0,
        boxShadow: 0,
      }}
    >
      {/* Desktop menu */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, width: '100%' }}>
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={active === item.id ? 'contained' : 'text'}
            sx={{
              flex: 1,
              color: 'white',
              bgcolor: active === item.id ? 'green' : 'black',
              borderRadius: 0,
              borderRight: '1px solid white',
              py: 1.5,
              fontSize: '1rem',
              '&:hover': {
                bgcolor: active === item.id ? 'darkgreen' : '#333',
              },
              '&:last-child': {
                borderRight: 'none',
              },
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* Mobile menu button */}
      <Toolbar sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
        <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseRoundedIcon />
              </IconButton>
            </Box>
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem
                  key={item.id}
                  sx={
                    active === item.id
                      ? { bgcolor: 'green', color: 'white' }
                      : {}
                  }
                  onClick={toggleDrawer(false)}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;