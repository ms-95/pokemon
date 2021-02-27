import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Fragment, useContext, useRef } from "react";
import { useEffect, useState } from "react";
import { Button, Col, OverlayTrigger, Row, Tooltip, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import PokemonRepository from "../../../../core/http/pokemon.repository";
import PokemonService from "../../../../core/http/pokemon.service";
import MoveType from "../../../../shared/components/move-type.component";
import PokemonType from "../../../../shared/components/pokemon-type.component";
import SpinnerContext from "../../../../shared/contexts/spinner.context";
import useOnScreen from "../../../../shared/utils/use-on-screen.utils";
export function PokemonSummary() {
    const [pokemons, setPokemons] = useState<any[]>([]);
    const pokemonService = PokemonService();
    const pokemonGens = useRef(new Array<HTMLElement>());
    const genNav = useRef(null);
    const history = useHistory();
    const isShown = useOnScreen(genNav);
    const { setIsLoading } = useContext(SpinnerContext);
  
    useEffect(() => {
        const getPokemon = async () => {
            setIsLoading(true);
            const list = await pokemonService.getPokemonList().finally(() => setIsLoading(false));
            setPokemons(list);
        }

        getPokemon();

    }, []);

    useEffect(() => {

        if (pokemonGens.current.length) {
            scrollToGen(Number(history.location.hash.replace('#', '')));
        }
    }, [pokemons])






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
        if (isShown) {
            window.scrollTo({ top: window.scrollY - 89 });
        }
        history.push(`/pokemon/s#${gen}`);
    };

    const viewPokemon = (index: number) => {
        history.push(`/pokemon/${index}`);

    }

    return (
        <React.Fragment>
            <Row noGutters className="sticky-top rounded-bottom shadow" style={{ background: 'rgba(255,255,255)' }}>
                <Col bsPrefix="col" className="py-2" ref={genNav}>
                    <Row noGutters className="text-center">
                        <Col className="btn" onClick={() => scrollToGen(0)}>1-151</Col>
                        <Col className="btn" onClick={() => scrollToGen(1)}>152-151</Col>
                        <Col className="btn" onClick={() => scrollToGen(2)}>252-386</Col>
                        <Col className="btn" onClick={() => scrollToGen(3)}>387-493</Col>
                        <Col className="btn" onClick={() => scrollToGen(4)}>494-649</Col>
                        <Col className="btn" onClick={() => scrollToGen(5)}>650-721</Col>
                        <Col className="btn" onClick={() => scrollToGen(6)}>722-809</Col>
                        <Col className="btn" onClick={() => scrollToGen(7)}>810-898</Col>
                    </Row>
                </Col>
            </Row>
            <div>

                <Row className=" d-flex align-items-center btn text-left position-sticky border-0" style={{ zIndex: 8000, top: '53px', backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)' }}>
                    <Col bsPrefix="col col-lg-1" >
                        No.
                                            </Col>
                    <Col bsPrefix="col col-lg-2">Name</Col>
                    <Col bsPrefix="col col-lg-2" className="text-left">
                        Types
                                        </Col>
                    <Col className="d-none d-lg-block">
                        HP
                                        </Col>
                    <Col className="d-none d-lg-block">
                        ATK
                                        </Col>
                    <Col className="d-none d-lg-block">
                        DEF
                                        </Col>
                    <Col className="d-none d-lg-block">
                        S.ATK
                                        </Col>
                    <Col className="d-none d-lg-block">
                        S.DEF
                                        </Col>
                    <Col className="d-none d-lg-block">
                        SPD
                                        </Col>
                    <Col bsPrefix="col-2"></Col>
                </Row>
                {pokemons.map((r, i) =>

                    <div className="" key={'r' + i} ref={(element: any) => pokemonGens.current.push(element)}>
                        {r.map((p: any, y: number) =>
                            p ?
                           
                                    <div key={'p' + y} className="w-100 text-left my-2" >
                            
                            
     
         
                                        <Row className=" d-flex align-items-center"  >
                                            <Col bsPrefix="col col-lg-1" >
                                                <div className="font-weight-bold border-right pr-4">

                                                    {String(p?.id).padStart(3, '0')}
                                                </div>
                                            </Col>
                                            <Col bsPrefix="col col-lg-2" >
                                                <span >
                                                    {p?.name}
                                                </span>
                                            </Col>
                                            <Col  bsPrefix="col col-lg-2" className="text-left">
                                                {p?.types?.map((t: any, i: number) =>
                                                    <MoveType key={`pokemonType${i}`} typeName={t?.type.name} typeValue={t?.type.value}></MoveType>
                                                )}
                                            </Col>
                                            {p?.stats.map((s: any, i: number) => <Col key={`stat${i}`}className="d-none d-lg-block">
                                                {s.base_stat}
                                            </Col>)}

                                            <Col bsPrefix="col-2">
                                                
                                                 
                                            <Button variant="dark" onClick={() => viewPokemon(1)} style={{height: '32px', width: '32px'}} className="rounded-circle m-0 p-0 " >

                                            <FontAwesomeIcon style={{height: '16px', width: '16px', margin: 'auto'}} icon={faSearch} />
                                            </Button>
                                                  
                                            </Col>
                                        </Row>      
                                    </div>                               
                             
                                : ''
                        )}
                   </div>
                        
                )}
               
           </div>
        </React.Fragment>


    );
}