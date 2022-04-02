import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Tab, Tabs, Theme } from "@material-ui/core";
import { useActions, useAppState } from './Overmind/OvermindHelper';
import TabPanel from './Components/TabPanel';
import TopBar from './Components/TopBar';
import AppBarOffset from './Components/AppBarOffset';
import { AppStorage } from './Others/AppStorage';

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

  useEffect(() => {
    let tabs = AppStorage.getAllValues()
    if (tabs.length > 0) {
      actions.setTabs(tabs)
    }
  }, [])

  const getTabsMaxHeight = () => {
    var a = document.getElementById('toolbar') ?? { clientHeight: 0 }
    return window.innerHeight - (a?.clientHeight + 16)
  }

  return <Grid container direction='column'>
    <TopBar />
    <AppBarOffset />

    <Grid container direction='row' style={{ marginTop: 8 }}>
      <Grid item>
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
              return <Tab
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
                  }
                }}
              />
            })
          }
        </Tabs>
      </Grid>
      <Grid container item xs>
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
    </Grid >
  </Grid>

}

export default App;