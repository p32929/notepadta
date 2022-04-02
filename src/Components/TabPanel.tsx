import React from 'react'
import { Box, Divider, Grid, makeStyles, TextField, Theme } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
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
    const { children, index, ...other } = props;
    const classes = useStyles()
    const actions = useActions()
    const states = useAppState()

    const onChange = (e) => {
        actions.setTabContent(e.target.value);
    }

    return (
        <div
            role="tabpanel"
            hidden={states.currentTabIndex !== index}
            className={classes.contents}
            {...other}
        >
            {states.currentTabIndex === index && (
                <Box p={3} >
                    <TextField
                        fullWidth
                        minRows={Math.ceil(window.innerHeight / 19) - 8}
                        placeholder="Write your story..."
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                alignItems: 'flex-start',
                            }
                        }}
                        multiline={true}
                        defaultValue={states.tabs[states.currentTabIndex].tabContent}
                        onChange={onChange}
                    />
                </Box>
            )}
        </div>
    );
}