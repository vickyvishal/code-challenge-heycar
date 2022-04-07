import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import ComputerIcon from '@mui/icons-material/Computer';
import PieChartIcon from '@mui/icons-material/PieChart';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import "./side-menu-bar-left.scss"

const menus = [<CardTravelIcon />, <ContentCut/>, <ComputerIcon/>, <PieChartIcon color={"primary"}/>, <PowerSettingsNewIcon/>]

export const SideMenuBarLeft = () => {
    return (
        <Paper classes={{root: "side-menu-bar-left"}} elevation={0}>
            <MenuList>
                {
                    menus.map((menu, index) => {
                        return <MenuItem key={index}>
                        <ListItemIcon>
                            {menu}
                        </ListItemIcon>
                    </MenuItem>
                    })
                }
                
                
            </MenuList>
        </Paper>
    );
}