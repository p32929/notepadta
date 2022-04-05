import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar, Tab, Tabs, Theme, Tooltip } from "@material-ui/core";
import { useActions, useAppState } from './Overmind/OvermindHelper';
import TabPanel from './Components/TabPanel';
import TopBar from './Components/TopBar';
import AppBarOffset from './Components/AppBarOffset';
import { AppStorage } from './Others/AppStorage';
import { Constants } from './Others/Constants';

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
    else {
      actions.setTabs([
        Constants.startingTab
      ])
    }

  }, [])

  const getTabsMaxHeight = () => {
    var a = document.getElementById('toolbar') ?? { clientHeight: 0 }
    return window.innerHeight - (a?.clientHeight + 16)
    // return `calc(100% - ${a?.clientHeight + 16})`
  }

  return <Grid container direction='column'>
    <TopBar />
    <AppBarOffset />

    <Snackbar
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      open={states.snackbarText != ""}
      message={states.snackbarText}
      autoHideDuration={1500}
      onClose={() => {
        actions.setSnackbarText("")
      }}
    />

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
              return <Tooltip title="Double tap to rename" arrow>
                <Tab
                  label={item.tabName}
                  style={{
                    backgroundColor: states.currentTabIndex == index ? '#757575' : 'white',
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