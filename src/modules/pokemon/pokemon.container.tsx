import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import PokemonDetail from "./pages/pokemon-summary/pokemon-detail.component";

import { PokemonSummary } from "./pages/pokemon-summary/pokemon-summary.component";
export default function PokemonContainer() {
    return (
        <Switch>
            <Redirect exact from='/pokemon' to='/pokemon/s' />
            <Route path="/pokemon/s" exact>
                <PokemonSummary></PokemonSummary>
            </Route>
            <Route path="/pokemon/:index" exact>
                <PokemonDetail></PokemonDetail>
            </Route>
        </Switch>

    );
}