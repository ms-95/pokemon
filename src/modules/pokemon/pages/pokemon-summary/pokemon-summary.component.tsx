import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PokemonRepository from "../../../../core/http/pokemon.repository";
import PokemonService from "../../../../core/http/pokemon.service";
import MoveType from "../../../../shared/components/move-type.component";
import PokemonType from "../../../../shared/components/pokemon-type.component";
import SpinnerContext from "../../../../shared/contexts/spinner.context";
import useOnScreen from "../../../../shared/utils/use-on-screen.utils";
import { TableContainer, Paper, Card,  TableHead, TableRow, TableCell, TableBody, Tabs,  Table } from "@material-ui/core";
import Tab from '@material-ui/core/Tab';
import { Link } from "react-router-dom";

export function PokemonSummary() {
    const [pokemons, setPokemons] = useState<any[]>([]);
    const [value, setValue] = React.useState(0);
    const pokemonService = PokemonService();
    const history = useHistory();
    const { setIsLoading } = useContext(SpinnerContext);
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const getPokemon = async (start: number, end: number) => {
        setIsLoading(true);
        const list = await pokemonService.getPokemonList(start, end).finally(() => setIsLoading(false));
        setPokemons(list);
        console.log(list);
    }
    

    useEffect(() => {       
        switch(value) {
            case 0:
                getPokemon(1, 151);
                break;
            case 1:
                getPokemon(152, 251);
                break;
            case 2:
                getPokemon(252, 386 );
                break;
            case 3:
                getPokemon(387, 493 );
                break;
            case 4:
                getPokemon(494, 649 );
                break;
            case 5:
                getPokemon(650, 721 );
                break;
            case 6:
                getPokemon(722,  809);
                break;
            case 7:
                getPokemon(810, 898 );
                break;
        }
        

    }, [value]);

    
    const viewPokemon = (index: number) => {
        history.push(`/pokemon/${index}`);

    }

   

     

    return (
        <React.Fragment>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="on"
                variant="scrollable"
                onChange={handleChange}               
            >
                <Tab label="1-151" />
                <Tab label="152-251" />
                <Tab label="252-386" />
                <Tab label="387-493" />
                <Tab label="494-649" />
                <Tab label="650-721" />
                <Tab label="722-809" />
                <Tab label="810-898" />
               
            </Tabs>
            <div className="px-4">
            
             <TableContainer>
            
                <Table >
                    <TableHead>
                    <TableRow>
                        <TableCell width="100px" >No.</TableCell>
                        <TableCell >Name</TableCell>
                        <TableCell width="160px">Types</TableCell>
                        <TableCell width="80px">HP</TableCell>
                        <TableCell width="80px">ATK</TableCell>
                        <TableCell width="80px">DEF</TableCell>
                        <TableCell width="80px">S.ATK</TableCell>
                        <TableCell width="80px">S.DEF</TableCell>
                        <TableCell width="80px">SPD</TableCell>
                        <TableCell width="80px">TOTAL</TableCell>
                       
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {pokemons?.map((row, i) => (
                            <TableRow key={i}>
                            <TableCell component="th" scope="row">
                                {row?.id}
                            </TableCell>
                            <TableCell >
                                <Link to={`/pokemon/${row?.id}`}> {row?.name}</Link>   
                            </TableCell>
                            <TableCell >
                                {row?.types?.map((t: any, i: number) =>
                                        <div className="d-inline-block m-2">

                                        <MoveType  key={`pokemonType${i}`} typeName={t?.type.name} typeValue={t?.type.value}></MoveType>
                                        </div>
                                   
                                    )}
                            </TableCell>
                            <TableCell >{row?.stats[0].base_stat}</TableCell>
                            <TableCell >{row?.stats[1].base_stat}</TableCell>
                            <TableCell >{row?.stats[2].base_stat}</TableCell>
                            <TableCell >{row?.stats[3].base_stat}</TableCell>
                            <TableCell >{row?.stats[4].base_stat}</TableCell>
                            <TableCell >{row?.stats[5].base_stat}</TableCell>
                            <TableCell >{row?.stats.reduce((sum: number, curr: {base_stat: number}) => sum + curr.base_stat, 0)}</TableCell>
                        
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
            </div>


        </React.Fragment>


    );
}