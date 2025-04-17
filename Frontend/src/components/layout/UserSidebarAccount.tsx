import React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Typography, MenuList, MenuItem, ListItemIcon, Avatar, ListItemText, Divider } from '@mui/material';
import { Account, AccountPreview, AccountPopoverFooter, SignOutButton } from '@toolpad/core/Account';
import { AccountPreviewProps } from '@toolpad/core/Account';
import { RootState } from '../../redux/store';
import { SidebarFooterProps } from '@toolpad/core/DashboardLayout';

function AccountSidebarPreview(props: AccountPreviewProps & { mini: boolean }) {
    const { handleClick, open, mini } = props;
    return (
        <Stack direction="column" p={0}>
            <Divider />
            <AccountPreview
                variant={mini ? 'condensed' : 'expanded'}
                handleClick={handleClick}
                open={open}
            />
        </Stack>
    );
}

function SidebarFooterAccountPopover() {
    const user = useSelector((state: RootState) => state.auth.user);
console.log(user)
    if (!user) return null;

    return (
        <Stack direction="column">
            <Typography variant="body2" mx={2} mt={1}>
                Conta
            </Typography>
            <MenuList>
                <MenuItem
                    component="button"
                    sx={{
                        justifyContent: 'flex-start',
                        width: '100%',
                        columnGap: 2,
                    }}
                >
                    <ListItemIcon>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                fontSize: '0.95rem',
                                bgcolor: 'primary.main',
                                color: 'white',
                            }}
                        >
                            {user?.name.slice(0, 2).toUpperCase()}
                        </Avatar>
                    </ListItemIcon>
                    <ListItemText
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            width: '100%',
                        }}
                        primary={
                            <Typography variant="body2">
                                {user.name}
                            </Typography>
                        }
                        secondary={
                            <Typography variant="caption">
                                {user.email}
                            </Typography>
                        }
                    />
                </MenuItem>
            </MenuList>
            <Divider />
            <AccountPopoverFooter>
                <SignOutButton />
            </AccountPopoverFooter>
        </Stack>
    );
}

const createPreviewComponent = (mini: boolean) => {
    function PreviewComponent(props: AccountPreviewProps) {
        return <AccountSidebarPreview {...props} mini={mini} />;
    }
    return PreviewComponent;
};

export default function UserSidebarAccount({ mini }: SidebarFooterProps) {
    const PreviewComponent = React.useMemo(() => createPreviewComponent(mini), [mini]);
    return (
      <Account
        slots={{
          preview: PreviewComponent,
          popoverContent: SidebarFooterAccountPopover,
        }}
        slotProps={{
          popover: {
            transformOrigin: { horizontal: 'left', vertical: 'bottom' },
            anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
            disableAutoFocus: true,
            slotProps: {
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: (theme) =>
                    `drop-shadow(0px 2px 8px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.32)'})`,
                  mt: 1,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    bottom: 10,
                    left: 0,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            },
          },
        }}
      />
    );
  }
  
