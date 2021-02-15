import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import PokemonRepository from "../../../../core/http/pokemon.repository";
import PokemonService from "../../../../core/http/pokemon.service";
import SpinnerContext from "../../../../shared/contexts/spinner.context";
import useOnScreen from "../../../../shared/utils/use-on-screen.utils";
export function PokemonSummary() {
    const [pokemons, setPokemons] = useState<any []>([]);
    const pokemonService = PokemonService();
    const pokemonGens = useRef(new Array<HTMLElement>());
    const genNav = useRef(null);
    const history = useHistory();
    const isShown = useOnScreen(genNav);
    const {setIsLoading} = useContext(SpinnerContext);
    useEffect(() => {
        const getPokemon = async () => {
            setIsLoading(true);
            const list = await pokemonService.getPokemonList().finally(() => setIsLoading(false));
            setPokemons(list);
        }
        
        getPokemon();
        
    }, []);

    useEffect(() => {
      
        if(pokemonGens.current.length) {
            scrollToGen(Number(history.location.hash.replace('#', '')));
        }
    },[pokemons])

  
    



    const getColor = (groupIndex: number): any => {
        const bg = [
            {
                backgroundColor: 'rgb(220, 53, 69, 0.8)',
                border: '1px solid rgb(220, 53, 69, 0.5)'
            },
            {
                backgroundColor: 'rgb(251, 195, 5, 0.8)',
                border: '1px solid rgb(251, 195, 5, 0.5)'
            },
            {
                backgroundColor: 'rgb(21, 154, 192, 0.8)',
                border: '1px solid rgb(21, 154, 192, 0.5)'
            },
            {
                backgroundColor: 'rgb(96, 87, 86, 0.8)',
                border: '1px solid rgb(96, 87, 86, 0.5)'
            },
            {
                backgroundColor: 'rgb(36, 65, 114, 0.8)',
                border: '1px solid rgb(36, 65, 114, 0.5)'
            },
            {
                backgroundColor: 'rgb(170, 117, 188, 0.8)',
                border: '1px solid rgb(170, 117, 188, 0.5)'
            },
            {
                backgroundColor: 'rgb(36, 49, 74, 0.8)',
                border: '1px solid rgb(36, 49, 74, 0.5)'
            },
            {
                backgroundColor: 'rgb(23, 143, 98, 0.8)',
                border: '1px solid rgb(23, 143, 98, 0.5)'
            },
        ];
        return bg[groupIndex];
    }

    const scrollToGen = (gen: number) => {
        pokemonGens.current[gen]?.scrollIntoView();
        if(isShown) {    
            window.scrollTo({ top: window.scrollY - 40 });    
        }
        history.push(`/pokemon/s#${gen}`);
    };

    const viewPokemon = (index: number) => {
        history.push(`/pokemon/${index}`);
        
    }
    return (
        <React.Fragment>
                <Row noGutters className="sticky-top bg-light rounded-bottom shadow">
                    <Col bsPrefix="col" className=" d-none d-md-block py-2" ref={genNav}>
                        <Row noGutters className="text-center">
                            {Array.from({length: 8}, (x, i) => 
                                <Col key={'g'+i} className="btn" onClick={() => scrollToGen(i)}>
                                    Gen {i+1}
                                </Col>
                            )}                            
                        </Row>
                    </Col>
                </Row>
                <div>
                    
               
                {pokemons.map((r, i) =>
                    <Row noGutters className="" key={'r'+i} ref={(element: any) => pokemonGens.current.push(element)}>
                        {r.map((p: any, y: number) => 
                            <Col bsPrefix="col-12 col-sm-4 col-lg-2  shadow-lg" style={{...getColor(i)}} key={'p'+y} >
                                <div className="btn w-100 text-center text-white" onClick={() => viewPokemon(p?.index) }>
                                    <div style={{height: '56px'}}>                                   
                                        <img alt={`${p?.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/${p?.index}.png`} onError={(e: any)=>{e.target.style.display = 'none'}}></img>
                                    </div>
                                    <div>#{String(p?.index).padStart(3, '0')}</div>
                                    <div className="text-capitalize">{p?.name}</div>
                                </div>
                            </Col>
                        )}
                    </Row>
                )}
             </div>
        </React.Fragment>


    );
}