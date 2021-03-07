import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
} from "react-router-dom";
import React, { Suspense, lazy, useRef, useState } from 'react';

import { Col, Row } from 'react-bootstrap';
import ScrollToTop from './shared/utils/scroll-to-top.utils';
import Spinner from './shared/components/spinner.component';
import SpinnerContext from './shared/contexts/spinner.context';
import FabMenu from './shared/components/fab-menu/fab-menu.component';

const PokemonContainer = lazy(() => import ('./modules/pokemon/pokemon.container')) ;
const OtherContainer = lazy(() => import ('./modules/other/other.container')) ;
const AbilityContainer = lazy(() => import ('./modules/ability/ability.container')) ;
const ItemContainer = lazy(() => import ('./modules/item/item.container')) ;
const MoveContainer = lazy(() => import ('./modules/move/move.container')) ;

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pokemonRef = useRef<any>(null);
  return (
    <Router>
      <Suspense fallback={<Spinner></Spinner>}>
      <SpinnerContext.Provider value={{ isLoading, setIsLoading }}>
        {/* <Container fluid  className="h-100" > */}
        <div>
          Header
        </div>
        <div>
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

        </div>
        
      
        <div className={isLoading ? 'd-block' : 'd-none'}>
          <Spinner ></Spinner>
        </div>
        <FabMenu></FabMenu>
      </SpinnerContext.Provider>
      </Suspense>
    </Router>
    
  );
}

export default App;
