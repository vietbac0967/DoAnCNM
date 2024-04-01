import { Box, InputAdornment, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HeaderInfo from '../HeaderInfo/HeaderInfo';
import Input from '@mui/material/Input';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
function FriendListComponent() {
    return (
        <Box>
            <Stack flexDirection={'column'} >
                <HeaderInfo icon={<PersonOutlineIcon />} title={'Friend Lists'} />
                <Stack >
                    <Typography>Contact (94)</Typography>
                    <Stack
                        flexDirection={'row'}

                        justifyContent={'space-around'}>
                        <Input placeholder="Search friends" />
                        <Stack >
                            <Select

                                notched="true"
                                input={<Input startAdornment={<ImportExportIcon />} />}
                                defaultValue="sortatoz"
                                displayEmpty>
                                <MenuItem value={'sortatoz'}>Name A-Z</MenuItem>
                                <MenuItem value={'sortztoa'}>Name A-Z</MenuItem>
                            </Select>
                        </Stack>
                        <Stack>

                            <Select
                                notched="true"
                                input={<Input startAdornment={<FilterAltIcon />} />}
                                defaultValue="all"
                                displayEmpty>
                                <MenuItem value={'all'}>All</MenuItem>
                                <MenuItem value={'option2'}>Name A-Z</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default FriendListComponent