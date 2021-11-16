import React from 'react';

import clsx from 'clsx';
import { useTheme, Theme } from '@mui/material/styles';
import { makeStyles, createStyles } from '@mui/styles';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Box, Switch }
  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Sidebar } from './Sidebar';
import MainRouter from './Router';

import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import MiniDrawer from './Drawer';
const drawerWidth = 240;

export default function App() {


  return (

    <MiniDrawer />
  )

}