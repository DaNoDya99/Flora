import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LogoImage from '../assets/images/logo-only-image.png';
import AccountIcon from '../assets/svgs/account.svg';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import {styled} from "@mui/material/styles";

const pages = ["Categories", "About", "Contact"];

const DrawerStyled = styled(Drawer)(() => ({
    height: 90,
    width: '10em'
}))
function ResponsiveAppBar() {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const settings = loggedIn ? [{'name' : 'Profile','link' : '/auth/login'},
        {'name' : 'Logout', 'link' : '/auth/logout'}] : [{'name' : 'Login', 'link' : '/auth/login'},
        {'name' : 'Register', 'link' : '/auth/register'}];

    let profile_image =  <img src={AccountIcon} className={"w-8 h-8"} alt="Account"/>

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };


    if (loggedIn) {
        profile_image = <img src={AccountIcon} className={"w-8 h-8"} alt="Account"/>
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" color={"primary"} className={'nunito-sans-light'}>
            <Container maxWidth="xl" className={"p-2"}>
                <Toolbar disableGutters>
                    <Box>
                        <img src={LogoImage} className="w-16 h-16 rounded-full shadow-lg max-[900px]:hidden" alt="logo"/>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.2rem',
                            textDecoration: 'none',
                            fontSize: '2rem',
                            paddingLeft: '1em',
                        }}
                        className={"text-black nunito-sans-light"}
                    >
                        <Link to={'/'}>FLOWER HUB</Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" >{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <img src={LogoImage} className="w-16 h-16 rounded-full shadow-lg min-[900px]:hidden" alt="logo"/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            paddingLeft: '0.5em',
                        }}
                        className={"text-black nunito-sans-light"}
                    >
                        FLOWER HUB
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block', marginX: 1}}
                            >
                                {page === 'Categories' ? <Typography textAlign="center" sx={{fontSize : 20}} onClick={toggleDrawer(true)}>{page}</Typography>
                                    : <Typography textAlign="center" sx={{fontSize : 20}}>{page}</Typography>}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {profile_image}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {Object.keys(settings).map((key, index) => (
                                <MenuItem key={index} onClick={handleCloseUserMenu}>
                                    <Link to={settings[key].link}>
                                        <Typography textAlign="center" className={'nunito-sans-light'}>{settings[key].name}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
            <DrawerStyled anchor={'left'} open={open} onClose={toggleDrawer(false)} hideBackdrop={false}>
                <div className={'m-5 flex flex-col justify-center'}>
                    <div className={'w-full text-center'}>
                        <h1 className={'text-4xl font-semibold'}>Our Collections</h1>
                    </div>
                    <div className={"my-10 space-y-5 mx-5"}>
                        <div>
                            <div className={'text-2xl'}>
                                🎉 Occasional Delights
                            </div>
                            <div className={'ms-14 my-4 space-y-4'}>
                                <h2 className={'hover:font-semibold'}>- <Link to={'products/birthday'} onClick={toggleDrawer(false)}>Birthday</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Love & Romance</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Anniversary</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Wedding</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Congratulations</Link></h2>
                            </div>
                        </div>
                        <div>
                            <div className={'text-2xl'}>
                                🌷 Flower Type Elegance
                            </div>
                            <div className={'ms-14 my-4 space-y-4'}>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Lilies</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Roses</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Chrysanthemums</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Gerbera</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Mix</Link></h2>
                            </div>
                        </div>
                        <div>
                            <div className={'text-2xl'}>
                                🌈 Colorful Blossoms
                            </div>
                            <div className={'ms-14 my-4 space-y-4'}>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Pink</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Red</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>White</Link></h2>
                                <h2 className={'hover:font-semibold'}>- <Link to={'#'}>Yellow</Link></h2>
                            </div>
                        </div>
                    </div>

                </div>
            </DrawerStyled>
        </AppBar>
    );
}

export default ResponsiveAppBar;
