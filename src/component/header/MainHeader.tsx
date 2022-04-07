import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import "./main-header.scss"
import { Typography } from '@mui/material';
import { GET_USERS_URL } from '../../helpers/constants/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserInfoModel } from '../../models/mockUpModels';

import Menu from '@mui/material/Menu';

import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

export const MainHeader = () => {
    const [users, setUsers] = useState<UserInfoModel[]>([])
    const [selectedUser, setSelectedUser] = useState<UserInfoModel>({} as UserInfoModel)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    useEffect(() => {
        axios.get(GET_USERS_URL).then((res: any) => {
            setUsers(res.data.data)
        })
    }, [])

    useEffect(() => {
        setSelectedUser(users[0])
    }, [users])

      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };

    return (
        <AppBar classes={{ root: "main-header" }} position="static">
            <Toolbar disableGutters>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Show Users">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar>{selectedUser?.firstName && selectedUser.firstName[0]}</Avatar>
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
                        {users.map((user:UserInfoModel) => (
                            <MenuItem key={user.userId} onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{user.firstName}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};