import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BagIcon from '../../assets/images/bag.webp';
import TmCaseIcon from '../../assets/images/tm_case.webp';
import PokedexIcon from '../../assets/images/pokedex.webp';
import AbilityIcon from '../../assets/images/power_bracer.webp';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const history = useHistory();
  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const navigate = (path: string) => {
    history.push(path);
  }

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>

        <ListItem button onClick={() => navigate('/pokemon')}>
          <ListItemIcon><img style={{width: '32px', objectFit: 'scale-down'}} src={PokedexIcon}/></ListItemIcon>
          <ListItemText primary={'Pokedex'} />
        </ListItem>

        <ListItem button onClick={() => navigate('/move')}>
          <ListItemIcon><img style={{width: '32px', objectFit: 'scale-down'}} src={TmCaseIcon}/></ListItemIcon>
          <ListItemText primary={'Move'} />
        </ListItem>

       
      </List>
      <Divider />      
    </div>
  );

  return (
    
        <React.Fragment >
        <IconButton edge="start"  color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
            <MenuIcon />
         </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
    
  );
}