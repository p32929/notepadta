import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, Tab, Tabs, Theme } from "@material-ui/core";
import { useActions, useAppState } from './Overmind/OvermindHelper';
import TabPanel from './Components/TabPanel';

interface Props {

}

const getThemeObj = (theme: Theme) => {
  return {}
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

const App: React.FC<Props> = (props) => {
  const actions = useActions()
  const states = useAppState()

  const classes = useStyles();

  return <Grid container direction='row'>
    <Grid item>
      <Tabs
        orientation="vertical"
        variant="scrollable"
      >
        {
          states.tabs.map((item, index) => {
            return <Tab label={item.tabName} style={{
              backgroundColor: states.currentTabIndex == index ? 'red' : 'white',
              color: states.currentTabIndex == index ? 'white' : 'black',
            }} onClick={(e) => {
              actions.setTabIndex(index)
            }} />
          })
        }
      </Tabs>
    </Grid>
    <Grid container item xs style={{ height: window.innerHeight }}>
      {
        states.tabs.map((item, index) => {
          return <TabPanel
            value={0}
            index={index}
          >
            {
              item.tabContent
            }
          </TabPanel>
        })
      }
    </Grid>
  </Grid >

}

export default App;