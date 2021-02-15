import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import { PokemonContainer } from './modules/pokemon/pokemon.container';
import { OtherContainer } from './modules/other/other.container';
import { AbilityContainer } from './modules/ability/ability.container';
import { ItemContainer } from './modules/item/item.container';
import { MoveContainer } from './modules/move/move.container';
import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ScrollToTop from './shared/utils/scroll-to-top.utils';
import Spinner from './shared/components/spinner.component';
import SpinnerContext from './shared/contexts/spinner.context';
import FabMenu from './shared/components/fab-menu/fab-menu.component';


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pokemonRef = useRef<any>(null);
  return (
    <Router>
      <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
        {/* <Container fluid  className="h-100" > */}
        <Row className="h-100" noGutters>

          <Col>
            <ScrollToTop />
            <Switch>
              <Redirect exact from='/' to='/pokemon' />
              <Route path="/pokemon">
                <PokemonContainer />
              </Route>
              <Route path="/ablity">
                <AbilityContainer />
              </Route>
              <Route path="/item">
                <ItemContainer />
              </Route>
              <Route path="/move">
                <MoveContainer />
              </Route>
              <Route path="/other">
                <OtherContainer />
              </Route>
            </Switch>

          </Col>

        </Row>
        {/* </Container> */}
        <div className={isLoading ? 'd-block' : 'd-none'}>
          <Spinner ></Spinner>
        </div>
        <FabMenu></FabMenu>
      </SpinnerContext.Provider>
    </Router>
  );
}

export default App;
