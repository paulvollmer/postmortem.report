import React from 'react';
import { AppBar, Button, Toolbar, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

type NavigationProps = {
    onExportJSON: () => void;
    onExportMarkdown: () => void;
    // onExportPDF: () => void;
    onClearReport: () => void;
    colorMode: string;
    toggleColorMode: () => void;
}

const Navigation = (props: NavigationProps) => {
    // menu export

    const [anchorElMenuExport, setAnchorElMenuExport] = React.useState<null | HTMLElement>(null);
    const openMenuExport = Boolean(anchorElMenuExport);

    const handleClickMenuExport = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMenuExport(event.currentTarget);
    };

    const handleCloseMenuExport = () => {
        setAnchorElMenuExport(null);
    };

    const handleExportJSON = () => {
        props.onExportJSON()
        setAnchorElMenuExport(null);
    };

    const handleExportMarkdown = () => {
        props.onExportMarkdown()
        setAnchorElMenuExport(null);
    };

    // const handleExportPDF = () => {
    //     props.onExportPDF()
    //     setAnchorEl(null);
    // };

    // menu settings 

    const [anchorElMenuSettings, setAnchorElMenuSettings] = React.useState<null | HTMLElement>(null);
    const openMenuSettings = Boolean(anchorElMenuSettings);

    const handleClickMenuSettings = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElMenuSettings(event.currentTarget);
    };

    const handleCloseMenuSettings = () => {
        setAnchorElMenuSettings(null);
    };

    const handleClearReport = () => {
        props.onClearReport()
        setAnchorElMenuSettings(null);
    }

    return (
        <AppBar position="absolute" color="default" sx={{ position: 'relative' }}>
            <Toolbar>
                <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                    Postmortem Report
                </Typography>
                <Button
                    id="menu-export-button"
                    aria-controls="menu-export"
                    aria-haspopup="true"
                    aria-expanded={openMenuExport ? 'true' : undefined}
                    color="inherit"
                    onClick={handleClickMenuExport}>
                    Export
                </Button>
                <Menu
                    id="menu-export"
                    anchorEl={anchorElMenuExport}
                    open={openMenuExport}
                    onClose={handleCloseMenuExport}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                >
                    <MenuItem onClick={handleExportJSON}>Export JSON</MenuItem>
                    <MenuItem onClick={handleExportMarkdown}>Export Markdown</MenuItem>
                    {/* <MenuItem onClick={handleExportPDF}>Export PDF</MenuItem> */}
                </Menu>

                <Button
                    id="menu-settings-button"
                    aria-controls="menu-settings"
                    aria-haspopup="true"
                    aria-expanded={openMenuSettings ? 'true' : undefined}
                    color="inherit"
                    onClick={handleClickMenuSettings}>
                    Settings
                </Button>
                <Menu
                    id="menu-settings"
                    anchorEl={anchorElMenuSettings}
                    open={openMenuSettings}
                    onClose={handleCloseMenuSettings}
                    MenuListProps={{ 'aria-labelledby': 'basic-button' }}
                >
                    <MenuItem onClick={handleClearReport}>Clear Report</MenuItem>
                </Menu>

                <IconButton sx={{ ml: 1 }} onClick={props.toggleColorMode} color="inherit">
                    {props.colorMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation
