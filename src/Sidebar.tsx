import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import React from "react";
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

export const Sidebar = [
    {
        title: "Dashboard",
        icon: <DashboardCustomizeIcon />,
        link: "/"
    },
    {
        title: "Admin",
        icon: <AssignmentIndIcon />,
        link: "/admin"
    },
    {
        title: "Driver",
        icon: <AccessibilityNewIcon />,
        link: "/driver"
    },
    {
        title: "Vehicle",
        icon: <DriveEtaIcon />,
        link: "/vehicle"
    },
    {
        title: "User",
        icon: <SupervisorAccountIcon />,
        link: "/user"
    },
    {
        title: "Franchise",
        icon: <StorefrontIcon />,
        link: "/franchise"
    },
    {
        title: "Payment",
        icon: <PaymentIcon />,
        link: "/payment"
    },
    {
        title: "Subscription",
        icon: <ReceiptIcon />,
        link: "/subscription"
    },
]