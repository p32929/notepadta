import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Tab, Tabs, Theme, Tooltip } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';

interface Props {

}

const getThemeObj = (theme: Theme) => {
    return {}
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

const AllTabs: React.FC<Props> = (props) => {
    const actions = useActions()
    const states = useAppState()

    const classes = useStyles();

    const getTabsMaxHeight = () => {
        var a = document.getElementById('toolbar') ?? { clientHeight: 0 }
        return window.innerHeight - (a?.clientHeight + 16)
    }

    return <Grid item>
        <Tabs
            orientation="vertical"
            variant="scrollable"
            value={states.currentTabIndex}
            style={{
                height: getTabsMaxHeight(),
                maxHeight: getTabsMaxHeight(),
            }}
            TabIndicatorProps={{
                style: {
                    display: "none",
                },
            }}
        >
            {
                states.tabs.map((item, index) => {
                    return <Tooltip title="Double tap to rename" arrow>
                        <Tab
                            label={item.tabName}
                            style={{
                                backgroundColor: states.currentTabIndex == index ? '#4CAF50' : 'white',
                                color: states.currentTabIndex == index ? 'white' : 'black',
                            }}
                            onClick={(e) => {
                                actions.setTabIndex(index)
                            }}
                            onDoubleClick={() => {
                                let newName = prompt("New tab name")
                                if (newName) {
                                    actions.changeTabName(newName)
                                    actions.setSnackbarText("Tab renamed")
                                }
                            }}
                        />
                    </Tooltip>
                })
            }
        </Tabs>
    </Grid>

}

export default AllTabs;