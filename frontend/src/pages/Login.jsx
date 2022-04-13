import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{
            height: '90vh', width: 'full', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>

            <Box sx={{ padding: '2rem 1rem', boxShadow: '5px 5px 10px gray', width: { xs: 300, md: 400 } }} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="LOGIN" {...a11yProps(0)} />
                        <Tab label="REGISTER" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <Box>
                        <form action="#" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <TextField id="standard-basic" required label="Email" variant="standard" />
                            <TextField id="standard-basic" required label="Password" variant="standard" type="password" />
                            <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                <Button variant="contained" >LOG IN</Button>
                            </Box>
                        </form>
                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Register
                </TabPanel>
            </Box>
        </Box >
    );
}
