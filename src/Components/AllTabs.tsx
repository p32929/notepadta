import React, { useEffect, useState } from 'react'
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
    const [isTooltipShowing, setShowTooltip] = useState(false)

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
            <>
                {
                    states.tabs.map((item, index) => {

                        return <Tooltip
                            open={isTooltipShowing && states.currentTabIndex == index}
                            title="Double click to rename" arrow>
                            <Tab
                                onMouseEnter={() => {
                                    if (states.currentTabIndex == index)
                                        setShowTooltip(true)
                                }}
                                onMouseLeave={() => {
                                    console.log("On mouse leave")
                                    setShowTooltip(false)
                                }}
                                label={item.tabName}
                                style={{
                                    backgroundColor: states.currentTabIndex == index ? '#2196F3' : 'white',
                                    color: states.currentTabIndex == index ? 'white' : 'black',
                                    fontWeight: 'bold'
                                }}
                                onClick={(e) => {
                                    actions.setTabIndex(index)
                                }}
                                onDoubleClick={() => {
                                    if (states.currentTabIndex == index) {
                                        let newName = prompt("New tab name")
                                        if (newName) {
                                            actions.changeTabName(newName)
                                            actions.setSnackbarText("Tab renamed")
                                        }
                                    }
                                }}
                            />
                        </Tooltip>
                    })
                }
            </>
        </Tabs>
    </Grid>

}

export default AllTabs;