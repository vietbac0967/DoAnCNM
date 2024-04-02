import { Box, Input, MenuItem, Select, Stack, Typography } from '@mui/material'
import React from 'react'
import HeaderInfo from '../HeaderInfo/HeaderInfo'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
function JoinedGroupComponent() {
    return (
        <Stack flexDirection={'column'}>
            <HeaderInfo icon={<PeopleOutlineIcon />} title={'Joined Groups'} />
            <Box>
                <Typography>Group (36)</Typography>
                <Stack
                    flexDirection={'row'}
                    justifyContent={'space-around'}>
                    <Input placeholder="Search friends" />
                    <Stack >
                        <Select
                            sx={{ width: 200 }}
                            notched="true"
                            input={<Input startAdornment={<ImportExportIcon />} />}
                            defaultValue="sortatoz"
                            displayEmpty>
                            <MenuItem value={'sortatoz'}>Name (A-Z)</MenuItem>
                            <MenuItem value={'sortatoz'}>Name (Z-A)</MenuItem>
                            <MenuItem value={'sortatoz'}>Last updated (newest → oldest)</MenuItem>
                            <MenuItem value={'sortztoa'}>Last updated (oldest→ newest)</MenuItem>
                        </Select>
                    </Stack>
                    <Stack >
                        <Select

                            notched="true"
                            input={<Input startAdornment={<FilterAltIcon />} />}
                            defaultValue="sortatoz"
                            displayEmpty>
                            <MenuItem value={'sortatoz'}>All</MenuItem>
                            <Select>
                                <MenuItem value={'sortztoa'}>My admin groups</MenuItem>
                            </Select>
                            <MenuItem value={'sortztoa'}>My admin groups</MenuItem>
                        </Select>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}

export default JoinedGroupComponent