import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Snackbar, Tab, Tabs, Theme, Tooltip } from "@material-ui/core";
import { useActions, useAppState } from './Overmind/OvermindHelper';
import TabPanel from './Components/TabPanel';
import TopBar from './Components/TopBar';
import AppBarOffset from './Components/AppBarOffset';
import { AppStorage } from './Others/AppStorage';
import { Constants } from './Others/Constants';
import { AppUtils } from './Others/AppUtils';
import AllTabs from './Components/AllTabs';
import AllPans from './Components/AllPans';

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
    let values = AppStorage.getAllValues()
    console.log(values);

    actions.setTabIndex(values.currentTabIndex)
    actions.setTabs(values.tabs)

    AppUtils.focusInput()

  }, [])

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
      <AllTabs />
      <AllPans />
    </Grid >
  </Grid>

}

export default App;