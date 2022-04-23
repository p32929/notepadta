import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Theme } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';
import TabPanel from './TabPanel';

interface Props {

}

const getThemeObj = (theme: Theme) => {
    return {}
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

const AllPans: React.FC<Props> = (props) => {
    const actions = useActions()
    const states = useAppState()

    const classes = useStyles();

    return <Grid container item xs>
        {
            states.tabs.map((item, index) => {
                return <TabPanel
                    index={index}
                >
                    {
                        item.tabContent
                    }
                </TabPanel>
            })
        }
    </Grid>

}

export default AllPans;