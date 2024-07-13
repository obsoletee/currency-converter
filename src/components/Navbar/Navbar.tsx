'use client';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface NavbarProps {
  linkList: {
    title: string;
    path: string;
  }[];
  title: string;
}

export const Navbar = ({ linkList, title }: NavbarProps) => {
  const router = useRouter();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {linkList.map((link, index) => (
            <Button
              onClick={() => {
                router.push(`/${link.path}`);
              }}
              key={index}
              color="inherit"
            >
              {link.title}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
