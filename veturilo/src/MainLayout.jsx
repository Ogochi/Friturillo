import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import List from 'material-ui/List';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import MenuIcon from 'material-ui-icons/Menu';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import Utils from './Utils.js';

const drawerWidth = 200;
const logoMargin = 20;
const logoStyle = {
  width: drawerWidth - logoMargin,
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "1em",
  marginBottom: "1em",
};
const buttonStyle = {
  width: drawerWidth,
};
const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    cursor: "pointer",
    ...theme.mixins.toolbar,
  },
});

class MainLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerOpen: !Utils.isMobile(),
      mobile: false,
    }
  }

  toggleMenu = () => {
    this.setState(prev => ({
      drawerOpen: !prev.drawerOpen,
    }));
  }

  render() {
    const { classes } = this.props;
    const year = new Date().getFullYear();
    const trasa = props => <Link to="/" {...props} />;
    const opis = props => <Link to="/opis" {...props} />;
    const kontakt = props => <Link to="/kontakt" {...props} />;
    const stacje = props => <Link to="/stacje" {...props} />;
    const appMargin = this.state.drawerOpen && !Utils.isMobile() ? drawerWidth : 0;
    const drawerVariant = Utils.isMobile() ? "temporary" : "persistent";
    const drawerOnClose = Utils.isMobile() ? {onClose: this.toggleMenu} : {};
    const menuOnClick = Utils.isMobile() ? {onClick: this.toggleMenu} : {};

    return (
      <div style={{margin: "0 0 0 0", height: "100%", width: "100%", position: "absolute"}}>
        <Drawer variant={drawerVariant} anchor="left" open={this.state.drawerOpen} {...drawerOnClose}>
          <div onClick={this.toggleMenu} className={classes.drawerHeader}>
            <ChevronLeftIcon />
          </div>
          <Divider />
          <div style={{width: drawerWidth, height: "100%", display: "block"}}>
            <Link to="/">
              <img style={logoStyle} src="logo.png" alt="Friturillo Logo" />
            </Link>
            <Divider />
            <List style={{paddingTop: 0, paddingBottom: 0}} {...menuOnClick}>
              <Button style={buttonStyle} component={trasa}>Wyszukaj Trase</Button>
              <Divider />
              <Button style={buttonStyle} component={stacje}>Lista Stacji</Button>
              <Divider />
              <Button style={buttonStyle} component={opis}>Opis Projektu</Button>
              <Divider />
              <Button style={buttonStyle} component={kontakt}>Kontakt</Button>
              <Divider />
            </List>
          </div>
          <div style={{display: "inline-block", verticalAlign: "bottom", textAlign: "center"}}>
            <span style={{addingBottom: "20px", color: "gray"}}>Copyright ©{year} Friturillo</span>
          </div>
        </Drawer>

        <AppBar position="sticky" color="default" id="appBar">
          <Toolbar style={{marginLeft: appMargin, display: "flex", justifyContent: "space-between"}}>
            { !this.state.drawerOpen &&
              <IconButton color="inherit" aria-label="Menu" style={{marginRight: "1em"}}>
                <MenuIcon onClick={this.toggleMenu} />
              </IconButton>
            }
            <Typography variant="title" color="inherit">
              Friturillo
            </Typography>
            <div>{/* Required to display title in proper place */}</div>
          </Toolbar>
        </AppBar>

        <div style={{marginLeft: appMargin}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainLayout);
