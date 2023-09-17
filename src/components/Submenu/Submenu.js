import React from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import JourneyFirst from "views/Journey/JourneyFirst";
import JourneyTwo from "views/Journey/JourneyTwo";
import JourneyThird from "views/Journey/JourneyThird";
import JourneyFour from "views/Journey/JourneyFour";
import JourneyFifth from "views/Journey/JourneyFifth";
import JourneyFinal from "views/Journey/JourneyFinal";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "auto",
    width: "auto",
    position:"center"
    
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    position: "absolute",
    display: "flex",
    textAlign:"center",
    
  },
  itemTabs: {
    marginTop: -5,
    marginLeft:170,
  },

}));

export default function VerticalTabsJorney() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs Jorney"
        className={classes.tabs}
      >
        <Tab label="Logistica" {...a11yProps(0)} />
        <Tab label="Transporte Casa" {...a11yProps(1)} />
        <Tab label="Ativação do Kit" {...a11yProps(2)} />
        <Tab label="Transporte Lab" {...a11yProps(3)} />
        <Tab label="Laudos" {...a11yProps(4)} />
        <Tab label="Historico" {...a11yProps(5)} />
      </Tabs>
      <nav>
        <TabPanel value={value} index={0} className={classes.itemTabs}>
          <JourneyOne />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.itemTabs}>
          <JourneyYwo />
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.itemTabs}>
          <JourneyThree />
        </TabPanel>
        <TabPanel value={value} index={3} className={classes.itemTabs}>
          <JourneyFor />
        </TabPanel>
        <TabPanel value={value} index={4} className={classes.itemTabs}>
          <JourneyFive />
        </TabPanel>
        <TabPanel value={value} index={5} className={classes.itemTabs}>
          <JourneySix />
        </TabPanel>
      </nav>
      <div>
        <Router>
          <div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/jorneyfirst">
                <JourneyOne />
              </Route>
              <Route path="/jorneysecond">
                <JourneyYwo />
              </Route>
              <Route path="/jorneythird">
                <JourneyThree />
              </Route>
              <Route path="/jorneyfour">
                <JourneyFor />
              </Route>
              <Route path="/jorneyfifth">
                <JourneyFive />
              </Route>
              <Route path="/jorneyfinal">
                <JourneySix />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

function JourneyOne() {
  return <JourneyFirst />;
}
function JourneyYwo() {
  return <JourneyTwo />;
}
function JourneyThree() {
  return <JourneyThird />;
}
function JourneyFor() {
  return <JourneyFour />;
}
function JourneyFive() {
  return <JourneyFifth />;
}
function JourneySix() {
  return <JourneyFinal />;
}

/**import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';



import JourneyFirst from "views/Journey/JourneyFirst";
import JourneyTwo from "views/Journey/JourneyTwo";
import JourneyThird from "views/Journey/JourneyThird";
import JourneyFour from "views/Journey/JourneyFour";
import JourneyFifth from "views/Journey/JourneyFifth";
import JourneyFinal from "views/Journey/JourneyFinal";






export default function App() {
    
  return (
    <Router>
      <div>
        <nav>
          <div>
            <div>
              <Link to="/JorneyFirst">Jorney First</Link>
            </div>
            <div>
              <Link to="/JorneySecond">Jorney Second</Link>
            </div>
            <div>
              <Link to="/JorneyThird">Jorney Third</Link>
            </div>
            <div>
              <Link to="/JorneyFour">Jorney Four</Link>
            </div>
            <div>
              <Link to="/JorneyFifth">Jorney Fifth</Link>
            </div>
            <div>
              <Link to="/JorneyFinal">Jorney Final</Link>
            </div>
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. 
            <Switch>
            <Route path="/jorneyfirst">
              <JourneyOne />
            </Route>
            <Route path="/jorneysecond">
              <JourneyYwo />
            </Route>
            <Route path="/jorneythird">
              <JourneyThree />
            </Route>
            <Route path="/jorneyfour">
              <JourneyFor />
            </Route>
            <Route path="/jorneyfifth">
              <JourneyFive />
            </Route>
            <Route path="/jorneyfinal">
              <JourneySix />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
  
  function JourneyOne() {
    return <JourneyFirst />;
  }
  function JourneyYwo() {
    return <JourneyTwo />;
  }
  function JourneyThree() {
    return <JourneyThird />;
  }
  function JourneyFor() {
    return <JourneyFour />;
  }
  function JourneyFive() {
    return <JourneyFifth />;
  }
  function JourneySix() {
    return <JourneyFinal />;
  }
   */
