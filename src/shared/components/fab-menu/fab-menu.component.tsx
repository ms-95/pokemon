import { faAngleUp, faArrowDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Action, Fab } from "react-tiny-fab";
import 'react-tiny-fab/dist/styles.css';
import './fab-menu.component.scss';
import BagIcon from '../../../assets/images/bag.webp';
import TmCaseIcon from '../../../assets/images/tm_case.webp';
import PokedexIcon from '../../../assets/images/pokedex.webp';
import AbilityIcon from '../../../assets/images/power_bracer.webp';

export default function FabMenu() {
    const history = useHistory();
    return (
<Fab
          icon={<FontAwesomeIcon icon={faAngleUp}></FontAwesomeIcon>}
          event={'click'}
          alwaysShowTitle={true}
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 9999,
            transform: 'none'
          }}
          mainButtonStyles={{ backgroundColor: '#27ae60' }}
        >
          <Action
            text="Pokedex"
            onClick={(e) => { history.push('/pokemon'); }}
            style={{ backgroundColor: '#27aea3' }}            
          >
            <img src={PokedexIcon} style={{width: '30px'}}/>
          </Action>
          <Action
            text="Item"
            style={{ backgroundColor: '#2775ae' }}

            onClick={(e) => { history.push('/item'); }}
          >
            <img src={BagIcon} style={{ width: '30px'}} />
          </Action>
          <Action
            text="Move"
            style={{ backgroundColor: '#6027ae' }}

            onClick={(e) => { history.push('/move'); }}
          >
            <img src={TmCaseIcon} />
          </Action>
          <Action
            text="Ability"
            style={{ backgroundColor: '#ae2775' }}

            onClick={(e) => { history.push('/ability'); }}
          >
            <img src={AbilityIcon} />

          </Action>
          <Action
            text="Search"
            style={{ backgroundColor: '#ae6027' }}
            onClick={(e) => {  }}
          >__</Action>



        </Fab>
    );
}