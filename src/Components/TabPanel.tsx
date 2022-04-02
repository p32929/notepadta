import React from 'react'
import { Box, makeStyles, TextField, Theme } from "@material-ui/core";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const getThemeObj = (theme: Theme) => {
    return {
        root: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            maxWidth: window.innerWidth,
            minWidth: window.innerWidth,
        },
        contents: {
            borderLeft: `1px solid ${theme.palette.divider}`,
            width: '100%',
        },
    }
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const classes = useStyles()

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            className={classes.contents}
            {...other}
        >
            {value === index && (
                <Box p={3} >
                    <TextField
                        className='something'
                        fullWidth
                        rows={Math.ceil(window.innerHeight / 19) - 4}
                        id='tests'
                        placeholder="Search..."
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                alignItems: 'flex-start',
                            }
                        }}
                        multiline={true} />
                </Box>
            )}
        </div>
    );
}