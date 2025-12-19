import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Avatar,
  Chip,
} from '@mui/material';

import {
  appBarStyles,
  toolbarStyles,
  titleStyles,
  chipStyles,
  avatarStyles,
} from '../styles/style';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';

function Navbar() {
  return (
    <AppBar sx={appBarStyles}>
      <Container maxWidth={false}>
        <Toolbar disableGutters sx={toolbarStyles}>
          <Box display="flex" alignItems="center">
            <StarPurple500Icon
              fontSize="large"
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
            />
            <Typography variant="h5" sx={titleStyles}>
              Admission Analytics
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Chip
            label="Test User"
            avatar={<Avatar sx={avatarStyles} />}
            sx={chipStyles}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
