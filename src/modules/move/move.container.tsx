import React from "react";
import { Redirect, Route, Switch } from "react-router";
import MoveSummary from "./pages/move-summary.component";

export default function MoveContainer() {
    return (
        <Switch>
            <Redirect path="/move/" exact to="/move/s" ></Redirect>
            <Route path="/move/s" exact>
                <MoveSummary></MoveSummary>
            </Route>
        </Switch>
    );
}