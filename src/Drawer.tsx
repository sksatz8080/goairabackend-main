import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardPage from './pages/Dashboard';
import UserPage from './pages/User';
import AdminPage from './pages/Admin';
import DriverPage from './pages/Driver';
import { Sidebar } from './Sidebar';
import FranchisePage from './pages/Franchise';
import SubscriptionPage from './pages/Payment';
import PaymentPage from './pages/Payment';
import VehiclePage from './pages/Vehicle';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }: any) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop: string) => prop !== 'open',
})<AppBarProps>(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: string): boolean => prop !== 'open' })(
    ({ theme, open }: any) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar style={{backgroundColor: "#fff"}}>
                    <IconButton
                        style={{ color: "#000" }}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box style={{ width: "100%", }}>
                        <List style={{ display: "flex", float: "right" }}>
                            <ListItem style={{ width: "fit-content" }}>
                                <ListItemText primary="Go Aira" style={{color: "#000"}} />
                            </ListItem>
                            <ListItem button style={{ width: "fit-content" }}>
                                <ListItemIcon><NotificationsNoneOutlinedIcon /></ListItemIcon>
                                <ListItemText primary="Notifications" style={{color: "#000"}}  />
                            </ListItem>
                            <ListItem button style={{ width: "fit-content" }}>
                                <ListItemIcon><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Settings" style={{color: "#000"}}  />
                            </ListItem>
                            <ListItem button style={{ width: "fit-content" }}>
                                <ListItemIcon><PowerSettingsNewIcon /></ListItemIcon>
                                <ListItemText primary="Log Out" style={{color: "#000"}}  />
                            </ListItem>
                        </List>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <img src="Logo.png" alt="Logo" width={150} style={{ textAlign: 'left',paddingTop: 30, paddingBottom: 30 }} />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {Sidebar.map((text, index) => (
                        <ListItem button key={index} onClick={() => {
                            window.location.pathname = text.link
                        }}>
                            <ListItemIcon onMouseEnter={handleDrawerOpen}>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.title} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Router>
                    <Switch>
                        <Route path="/" exact component={DashboardPage} />
                        <Route path="/user" component={UserPage} />
                        <Route path="/admin" component={AdminPage} />
                        <Route path="/driver" component={DriverPage} />
                        <Route path="/vehicle" component={VehiclePage} />
                        <Route path="/franchise" component={FranchisePage} />
                        <Route path="/payment" component={PaymentPage} />
                        <Route path="/subscription" component={SubscriptionPage} />
                    </Switch>
                </Router>
            </Box>
        </Box>
    );
}