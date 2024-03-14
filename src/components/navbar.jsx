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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';

const pages = ["Categories", "About", "Contact"];

const DrawerStyled = styled(Drawer)(() => ({
    height: 90,
    width: '10em'
}))

const style = {
    position: 'fixed',
    top: '16em',
    left: '75%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function ResponsiveAppBar(props) {
    const loggedIn = useSelector(state => state.customer.data.loggedIn);
    const settings = loggedIn ? [{ 'name': 'Profile', 'link': '/auth/login' },
    { 'name': 'Logout', 'link': '/auth/logout' }] : [{ 'name': 'Login', 'link': '/auth/login' },
    { 'name': 'Register', 'link': '/auth/register' }];

    let profile_image = <img src={AccountIcon} className={"w-6 h-6"} alt="Account" />
    const sticky = props.sticky;

    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);

    console.log(openModal);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    if (loggedIn) {
        profile_image = <img src={AccountIcon} className={"w-6 h-6"} alt="Account" />
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
        <AppBar position={sticky ? 'sticky' : 'fixed'} color={"primary"} className={'nunito-sans-light'}>
            <Container maxWidth="xl" className={"p-1 max-2xl:p-0"}>
                <Toolbar disableGutters>
                    <Box>
                        <img src={LogoImage} className="w-16 h-16 rounded-full shadow-lg max-[900px]:hidden max-2xl:w-12 max-2xl:h-12" alt="logo" />
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
                            fontSize: '1.5rem',
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
                    <img src={LogoImage} className="w-16 h-16 rounded-full shadow-lg min-[900px]:hidden" alt="logo" />
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
                                sx={{ my: 2, color: 'black', display: 'block', marginX: 1 }}
                            >
                                {page === 'Categories' ? <Typography textAlign="center" sx={{ fontSize: 16 }} onClick={toggleDrawer(true)}>{page}</Typography>
                                    : <Typography textAlign="center" sx={{ fontSize: 16 }}>{page}</Typography>}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu}>
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
                    <div className={'ms-5'}>
                        <div>
                            <IconButton>
                                <ShoppingCartOutlinedIcon onClick={() => setOpenModal(true)} />
                            </IconButton>
                            <div className='rounded-full bg-secondary2/60 absolute top-3 right-0 h-5 w-5 flex justify-center items-center'>0</div>
                        </div>
                        
                        <div>
                            <Modal
                                open={openModal}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <div className={'flex justify-between items-center'}>
                                        <Typography id="modal-modal-title" variant="h6" component="h3">
                                            Your Bag
                                        </Typography>
                                        <div className='flex text-gray-500 items-center gap-2'>
                                            <div>{0} item(s)</div>
                                            <CloseIcon onClick={() => setOpenModal(false)} className={'text-red-600'} />
                                        </div>
                                    </div>
                                    <Divider variant="middle" className='!my-2' />
                                    <div className='w-full flex flex-col items-center py-8'>
                                        <ProductionQuantityLimitsOutlinedIcon className={'!text-6xl text-gray-400'} />
                                        <p className={'text-gray-400'}>No items in the cart</p>
                                    </div>
                                    <div className={'flex justify-between'}>
                                        <Typography className={'!font-semibold !text-gray-600'}>SUB TOTAL</Typography>
                                        <Typography className={'!font-semibold !text-gray-600'}>Rs. 00.00</Typography>
                                    </div>
                                    <div className={'text-[.7em]'}>Taxes and shipping calculated at the checkout</div>
                                    <div className={'flex justify-center mt-5'}>
                                        <Button variant="contained" color="secondary3" className={'w-[60%] !h-9'}>
                                            <Typography className={'!text-sm font-semibold'}>Continue Shopping</Typography>
                                        </Button>
                                    </div>
                                </Box>
                            </Modal>
                        </div>
                    </div>
                </Toolbar>
            </Container>
            <DrawerStyled anchor={'left'} open={open} onClose={toggleDrawer(false)} hideBackdrop={false}>
                <div className={'m-5 flex flex-col justify-center max-2xl:my-0'}>
                    <div className={'w-full text-center'}>
                        <h1 className={'text-4xl font-bold max-2xl:text-3xl max-2xl:mt-5'}>Our Collections</h1>
                    </div>
                    <div className={"my-10 space-y-5 mx-5 max-2xl:my-5 max-2xl:mx-2"}>
                        <div>
                            <div className={'text-2xl max-2xl:text-xl max-2xl:font-semibold'}>
                                🎉 Occasional Delights
                            </div>
                            <div className={'ms-14 my-4 max-2xl:my-2 space-y-4 max-2xl:space-y-2'}>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'/products/birthday'} onClick={toggleDrawer(false)}>Birthday</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Love & Romance</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Anniversary</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Wedding</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Congratulations</Link></h2>
                            </div>
                        </div>
                        <div>
                            <div className={'text-2xl max-2xl:text-xl max-2xl:font-semibold'}>
                                🌷 Flower Type Elegance
                            </div>
                            <div className={'ms-14 my-4 max-2xl:my-2 space-y-4 max-2xl:space-y-2'}>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Lilies</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Roses</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Chrysanthemums</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Gerbera</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Mix</Link></h2>
                            </div>
                        </div>
                        <div>
                            <div className={'text-2xl max-2xl:text-xl max-2xl:font-semibold'}>
                                🌈 Colorful Blossoms
                            </div>
                            <div className={'ms-14 my-4 max-2xl:my-2 space-y-4 max-2xl:space-y-2'}>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Pink</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Red</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>White</Link></h2>
                                <h2 className={'hover:font-semibold max-2xl:text-sm max-2xl:font-semibold'}>- <Link to={'#'}>Yellow</Link></h2>
                            </div>
                        </div>
                    </div>

                </div>
            </DrawerStyled>
        </AppBar>
    );
}

ResponsiveAppBar.propTypes = {
    sticky: PropTypes.bool.isRequired,
}

export default ResponsiveAppBar;
