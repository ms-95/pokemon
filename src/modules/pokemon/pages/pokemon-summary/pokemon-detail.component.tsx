import { faChevronLeft, faChevronRight, faHeart, faMars, faMoon, faRibbon, faSun, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Card, Col, ProgressBar, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import PokemonService from "../../../../core/http/pokemon.service";
import { TypeColor } from "../../../../shared/type-color.enum";
import NumberFormat from 'react-number-format';
import useStatCalculator from "../../../../shared/utils/use-stat-calculator.utils";
import useTextSentence from "../../../../shared/utils/use-text-sentence.utils";
import Status from'../../../../assets/images/status.png';
import Physical from'../../../../assets/images/physical.png';
import Special from'../../../../assets/images/special.png';
import SpinnerContext from "../../../../shared/contexts/spinner.context";
import TypePill from "../../../../shared/components/type-pill.component";

export default function PokemonDetail() {
    const {setIsLoading} = useContext(SpinnerContext);
    let { index } = useParams<{ index: string }>();
    const pokemonService = PokemonService();
    const [pokemon, setPokemon] = useState<any>();
    const [previousNextPokemon, setPreviousNextPokemon] = useState<any[]>([]);
    const history = useHistory();
    useEffect(() => {
        getPokemon();       
    }, [index]);

    const getPokemon = async () => {
        setIsLoading(true);
        const [pkm, list] = await Promise.all([
            pokemonService.getPokemon(Number(index)), 
            pokemonService.getPreviousNextPokemon(Number(index))
        ]).finally(() => {
           setIsLoading(false);
        });
       
        setPokemon(pkm);
        setPreviousNextPokemon(list);

    };
   
    const getBarColorClass = (value: number) => {
        const ratio = value / 200;
        if (ratio > 0.8) {
            return 'info';
        }
        else if (ratio > 0.4) {
            return 'success';
        }
        else if (ratio > 0.2) {
            return 'warning';
        }
        else {
            return 'danger';
        }
    }
    const viewPokemon = (index: number) => {
        history.push(`/pokemon/${index}`);
    }

    

   
    return (
        <div>
              

            <div>
                <Row noGutters className="shadow d-flex align-items-center px-2" style={{ height: '50px' }}>

                    <Col className="d-block">
                        {previousNextPokemon[0] ? <div className="btn" onClick={() => viewPokemon(previousNextPokemon[0]?.id)}>
                            <FontAwesomeIcon  icon={faChevronLeft} />
                            <span className="pl-2 d-none d-md-inline-block" >#{String(previousNextPokemon[0]?.id).padStart(3, '0')}</span>
                            <div className="pl-2 d-inline-block text-capitalize">{previousNextPokemon[0]?.name}</div>
                        </div> : ''
                        }
                    </Col>
                    <Col bsPrefix="col-auto">
                        <div className="text-center">
                            <span className="px-2 d-none d-md-inline-block">#{String(pokemon?.id).padStart(3, '0')}</span>
                            <div className="d-inline-block text-capitalize">{pokemon?.name}</div>
                        </div>
                    </Col>

                    <Col className="d-block text-right">
                        {previousNextPokemon[1] ? <div className="btn" onClick={() => viewPokemon(previousNextPokemon[1]?.id)}>
                            <span className="d-none d-md-inline-block">#{String(previousNextPokemon[1]?.id).padStart(3, '0')}</span>
                            <div className="px-2 d-inline-block text-capitalize">{previousNextPokemon[1]?.name}</div>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </div> : ''
                        }
                    </Col>

                </Row>
            </div>
            <div className="p-4 d-flex flex-column" style={{ gap: '10px' }}>
                <Row>
                    <Col bsPrefix="col-12">
                        <Card className="shadow border-0">

                            <Card.Body>

                                <Row>
                                    <Col bsPrefix="col-12 col-md-6">
                                        <img className="w-100" alt={`${pokemon?.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`} />
                                    </Col>
                                    <Col bsPrefix="col-12 col-md-6 d-flex flex-column" style={{ gap: '10px' }}>
                                        <Row>
                                            <Col>
                                                <div className="text-capitalize h3">{pokemon?.name}</div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col> National No.</Col>
                                            <Col >
                                                <div className="mr-2">{String(pokemon?.id).padStart(3, '0')}</div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Type</Col>
                                            <Col>                                                
                                                <div className="d-flex flex-wrap" style={{ gap: '5px' }}>
                                                    {pokemon?.types?.map((t: any, i: number) => 
                                                        <div className="mb-1 mb-md-0">
                                                            <TypePill type={t.type.name} key={`pokemonType${i}`}></TypePill>
                                                        </div>
                                                    )}
                                                </div>

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Abilities</Col>
                                            <Col>
                                                {pokemon?.abilities.map((a: any, i: number) => {
                                                    return <div className="text-capitalize" key={`ability${i}`}>{a.ability?.name}</div>
                                                })}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Held items</Col>
                                            <Col>
                                                {pokemon?.held_items.map((r: any, i: number) => {
                                                    return <div className="text-capitalize" key={`item${i}`}>{r.item.name}</div>
                                                })}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Height</Col>
                                            <Col>
                                                <NumberFormat value={pokemon?.height / 10} displayType={'text'} thousandSeparator={true} suffix="m" decimalScale={2} />

                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>Weight</Col>
                                            <Col>
                                                <NumberFormat value={pokemon?.weight / 10} displayType={'text'} thousandSeparator={true} suffix="kg" decimalScale={2} />

                                            </Col>
                                        </Row>
                                        <div></div>
                                        <div></div>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>


                    </Col>
                </Row>
                <Row>
                    <Col bsPrefix="col-12">
                        <Card className="w-100 shadow border-0">
                            <Card.Body>
                                <div className="h3">Base stats</div>
                                <div className="d-flex flex-column" style={{ gap: '20px' }}>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>HP</div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div style={{ width: '35px' }}>
                                                {pokemon?.stats?.[0]?.base_stat}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                            <ProgressBar className="w-100" variant={getBarColorClass(pokemon?.stats?.[0]?.base_stat)} now={pokemon?.stats?.[0]?.base_stat / 200 * 100} /></Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[0]?.base_stat, pokemon?.stats?.[0]?.stat?.name, -1)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[0]?.base_stat, pokemon?.stats?.[0]?.stat?.name, 1)}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>ATTACK</div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div style={{ width: '35px' }}>
                                                {pokemon?.stats?.[1]?.base_stat}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                            <ProgressBar className="w-100" variant={getBarColorClass(pokemon?.stats?.[1]?.base_stat)} now={pokemon?.stats?.[1]?.base_stat / 200 * 100} /></Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[1]?.base_stat, pokemon?.stats?.[1]?.stat?.name, -1)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[1]?.base_stat, pokemon?.stats?.[1]?.stat?.name, 1)}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>DEFENSE</div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div style={{ width: '35px' }}>
                                                {pokemon?.stats?.[2]?.base_stat}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                            <ProgressBar className="w-100" variant={getBarColorClass(pokemon?.stats?.[2]?.base_stat)} now={pokemon?.stats?.[2]?.base_stat / 200 * 100} /></Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[2]?.base_stat, pokemon?.stats?.[2]?.stat?.name, -1)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[2]?.base_stat, pokemon?.stats?.[2]?.stat?.name, 1)}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>SP. ATK</div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div style={{ width: '35px' }}>
                                                {pokemon?.stats?.[3]?.base_stat}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                            <ProgressBar className="w-100" variant={getBarColorClass(pokemon?.stats?.[3]?.base_stat)} now={pokemon?.stats?.[3]?.base_stat / 200 * 100} /></Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[3]?.base_stat, pokemon?.stats?.[3]?.stat?.name, -1)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[3]?.base_stat, pokemon?.stats?.[3]?.stat?.name, 1)}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>SP. DEF</div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div style={{ width: '35px' }}>
                                                {pokemon?.stats?.[4]?.base_stat}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                            <ProgressBar className="w-100" variant={getBarColorClass(pokemon?.stats?.[4]?.base_stat)} now={pokemon?.stats?.[4]?.base_stat / 200 * 100} /></Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[4]?.base_stat, pokemon?.stats?.[4]?.stat?.name, -1)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[4]?.base_stat, pokemon?.stats?.[4]?.stat?.name, 1)}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>SPEED</div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div style={{ width: '35px' }}>
                                                {pokemon?.stats?.[5]?.base_stat}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                            <ProgressBar className="w-100" variant={getBarColorClass(pokemon?.stats?.[5]?.base_stat)} now={pokemon?.stats?.[5]?.base_stat / 200 * 100} /></Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[5]?.base_stat, pokemon?.stats?.[5]?.stat?.name, -1)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                            <div style={{ width: '35px' }}>
                                                {useStatCalculator(pokemon?.stats?.[5]?.base_stat, pokemon?.stats?.[5]?.stat?.name, 1)}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col bsPrefix="col-auto" className="order-1">
                                            <div style={{ width: '110px', maxWidth: '110px' }}>
                                                TOTAL
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col-auto" className="order-12 order-md-2">
                                            <div className="font-weight-bolder" style={{ width: '35px' }}>
                                                {pokemon?.stats?.reduce((save: number, curr: any) => save + curr?.base_stat, 0)}
                                            </div>
                                        </Col>
                                        <Col bsPrefix="col" className="d-flex align-items-center order-3">
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-4">
                                                MIN
                                        </Col>
                                        <Col bsPrefix="col-auto" className="d-none d-md-block order-5">
                                                MAX
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col bsPrefix="col-12">
                        <Card className="w-100 shadow border-0">
                            <Card.Body>
                                <div className="h3">Training</div>
                                <div className="d-flex flex-column" style={{ gap: '20px' }}>
                                    <Row>
                                        <Col>EV yield</Col>
                                        <Col>
                                            <div className="d-flex flex-wrap" style={{ gap: '10px' }}>
                                                {pokemon?.stats?.[0].effort ? <span className="mr-1 mr-md-0">{pokemon?.stats?.[0].effort} HP</span> : ''}
                                                {pokemon?.stats?.[1].effort ? <span className="mr-1 mr-md-0">{pokemon?.stats?.[1].effort} ATTACK</span> : ''}
                                                {pokemon?.stats?.[2].effort ? <span className="mr-1 mr-md-0">{pokemon?.stats?.[2].effort} DEFENSE</span> : ''}
                                                {pokemon?.stats?.[3].effort ? <span className="mr-1 mr-md-0">{pokemon?.stats?.[3].effort} SP. ATK</span> : ''}
                                                {pokemon?.stats?.[4].effort ? <span className="mr-1 mr-md-0">{pokemon?.stats?.[4].effort} SP. DEF</span> : ''}
                                                {pokemon?.stats?.[5].effort ? <span className="mr-1 mr-md-0">{pokemon?.stats?.[5].effort} SPEED</span> : ''}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>Catch rate</Col>
                                        <Col>{pokemon?.capture_rate}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Gender</Col>
                                        <Col className="d-flex" style={{ gap: '10px' }}>
                                            <div>
                                                <FontAwesomeIcon className="text-info" icon={faMars} />
                                                {`${(8 - pokemon?.gender_rate) / 8 * 100}%`}
                                            </div>

                                            <div>
                                                <FontAwesomeIcon className="text-danger" icon={faVenus} />
                                                {`${(pokemon?.gender_rate) / 8 * 100}%`}
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>Egg group</Col>
                                        <Col>{pokemon?.egg_groups.map((e: any, i: number) => <div className="text-capitalize" key={`egg${i}`}>{e.name}</div>)}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Egg Steps</Col>
                                        <Col>~{pokemon?.hatch_counter * 256}</Col>
                                    </Row>
                                    <Row>
                                        <Col>Base happiness</Col>
                                        <Col>{pokemon?.base_happiness}</Col>
                                    </Row>

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>

                <Row noGutters>
                    <Col bsPrefix="col-12">
                        <Card className="w-100 shadow border-0">
                            <Card.Body>
                                <div className="h3">Moveset</div>
                                <Row noGutters className="h6" >
                                    <Col bsPrefix="col-auto" style={{width: '100px'}}></Col>
                                    <Col bsPrefix="col-4">Move</Col>
                                    <Col style={{width: '80px'}}>Type</Col>
                                    
                                    <Col style={{width: '50px'}} className="d-none d-md-block">Power</Col>
                                    <Col style={{width: '70px'}} className="d-none d-lg-block">Accuracy</Col>
                                    <Col style={{width: '70px'}} className="d-none d-xl-block">Category</Col>
                                    <Col style={{width: '20px'}} className="d-none d-lg-block">PP</Col>
                                   
                                    
                                </Row>
                                <div className="d-flex flex-column" style={{ gap: '20px' }}>
                                    {pokemon?.moves.map((m: any, i: number) => <Row noGutters key={`move${i}`} >
                                        <Col bsPrefix="col-auto" style={{width: '100px'}} className="text-capitalize">{m.levelLearnedAt > 0 ? m.levelLearnedAt : m.method}</Col>
                                        <Col bsPrefix="col-4" className="text-capitalize" >{m?.name.replaceAll('-', ' ')}</Col>
                                        <Col style={{width: '80px'}}>
                                            <div className="mb-1 mb-md-0">
                                                <TypePill type={m.type}></TypePill>
                                            </div>
                                            
                                        </Col>
                                       
                                      
                                      
                                        <Col style={{width: '50px'}} className="d-none d-md-block">{m.power || '---'}</Col>
                                    <Col style={{width: '70px'}} className="d-none d-lg-block">{m.accuracy || '---'}</Col>
                                    <Col style={{width: '70px'}} className="d-none d-xl-block"><img style={{width: '70px', objectFit: 'scale-down'}} src={m.damageClass === 'status' ? Status : m.damageClass === 'physical' ? Physical : Special}/></Col>
                                    <Col style={{width: '20px'}} className="d-none d-lg-block">{m.pp}</Col>
                                    </Row>
                                    )}

                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>

                <Row noGutters>
                    <Col bsPrefix="col-12">
                        <Card className="w-100 shadow border-0">
                            <Card.Body>
                                <div className="h3">Evolution</div>
                                <Row noGutters  >
                                    <Col bsPrefix="col-12 col-md" className="d-flex align-items-center justify-content-center" >
                                        {pokemon?.evolution ?
                                            <div>
                                                <img style={{ width: '100px' }} alt={`${pokemon?.evolution?.rootName}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.evolution?.rootId}.png`} />
                                                <div className="text-capitalize text-center">{pokemon?.evolution?.rootName}</div>
                                            </div> : ''
                                        }


                                    </Col>

                                    {pokemon?.evolution?.chain.map((col: any, i: number) =>
                                        <Col bsPrefix="col-12 col-md" className="d-flex flex-column justify-content-center align-items-center" key={`evolutionChain${i}`}>
                                            {col.map((c: any, i: number) =>
                                                <React.Fragment key={`evolution${i}`}>
                                                    <Row noGutters >
                                                        <Col bsPrefix="col-auto" className="position-relative d-flex flex-column flex-wrap">
                                                            <div className="position-absolute d-flex flex-wrap align-items-center justify-content-center h-100 w-100" style={{ height: '60px', left: '-30px' }}>
                                                                {c.evolutionDetail.map((d: any, i: number) =>

                                                                    <div key={`evolutionDetail${i}`} >
                                                                        {
                                                                            d?.min_level ?
                                                                                <div className="text-center">
                                                                                    {d?.held_item ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${d.held_item.name}.png`} /> : <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" />}

                                                                                    <div>
                                                                                        Lv.{d?.min_level}
                                                                                        {d.gender !== null ?
                                                                                            d.gender === 1 ? <FontAwesomeIcon className="text-danger" icon={faVenus} /> :
                                                                                                <FontAwesomeIcon className="text-info" icon={faMars} /> :
                                                                                            ''
                                                                                        }

                                                                                    </div>
                                                                                </div> : ''
                                                                        }

                                                                        {d.item ?
                                                                            <div className="text-center">
                                                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${d?.item.name}.png`} />
                                                                            </div> : ''
                                                                        }

                                                                        {d.trigger.name === 'trade' ?
                                                                            <div className="text-center">
                                                                                {d?.held_item ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${d?.held_item.name}.png`} /> : ''}
                                                                                <div>Trade</div>
                                                                            </div> : ''
                                                                        }
                                                                        {d.known_move_type ?
                                                                            <div className="text-center">
                                                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${d?.known_move_type.name}.png`} />

                                                                            </div> : ''
                                                                        }

                                                                        {d.time_of_day ?
                                                                            <div className="text-center text-capitalize">
                                                                                {d?.held_item ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${d?.held_item.name}.png`} /> : ''}
                                                                                <div>{
                                                                                    d.time_of_day === 'day' ?
                                                                                        <FontAwesomeIcon className="text-warning" icon={faSun} ></FontAwesomeIcon> :
                                                                                        <FontAwesomeIcon icon={faMoon} ></FontAwesomeIcon>
                                                                                }
                                                                                    <div>&nbsp;</div>
                                                                                </div>
                                                                            </div> : ''
                                                                        }
                                                                        {d.min_happiness ?
                                                                            <div className="text-center">
                                                                                <div> <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/soothe-bell.png`} /></div>
                                                                                <div>{d.min_happiness}</div>
                                                                            </div> : ''
                                                                        }


                                                                        {d.min_beauty ?
                                                                            <div className="text-center">
                                                                                <div> <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-scarf.png`} /></div>
                                                                                <div>{d.min_beauty}</div>
                                                                            </div> : ''
                                                                        }

                                                                        {d.known_move ?
                                                                            <div className="text-center">

                                                                                <div className="">Learn {d.known_move.name.replaceAll('-', ' ')}</div>
                                                                            </div> : ''
                                                                        }
                                                                        {d.relative_physical_stats !== null ?
                                                                            <div className="text-center">

                                                                                <div className="">
                                                                                    ATK{
                                                                                        d.relative_physical_stats !== 0 ?
                                                                                            d.relative_physical_stats > 0 ? '>' :
                                                                                                '<' :
                                                                                            '='}DEF</div>
                                                                            </div> : ''
                                                                        }




                                                                    </div>
                                                                )}
                                                                {c.evolutionOtherMethods.map((m: any, i: number) => {
                                                                    return <React.Fragment key={`evolutionOther${i}`}>


                                                                        {m.item ?
                                                                            <div className="text-center">
                                                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${m?.item.name}.png`} />
                                                                            </div> : ''
                                                                        }

                                                                        {m.trigger.name === 'trade' ?
                                                                            <div className="text-center">
                                                                                {m?.held_item ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${m?.held_item.name}.png`} /> : ''}
                                                                                <div>Trade</div>
                                                                            </div> : ''
                                                                        }
                                                                        {m.known_move_type ?
                                                                            <div className="text-center">
                                                                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-${m?.known_move_type.name}.png`} />

                                                                            </div> : ''
                                                                        }

                                                                        {m.time_of_day ?
                                                                            <div className="text-center text-capitalize">
                                                                                {m?.held_item ? <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${m?.held_item.name}.png`} /> : ''}
                                                                                <div>{
                                                                                    m.time_of_day === 'day' ?
                                                                                        <FontAwesomeIcon className="text-warning" icon={faSun} ></FontAwesomeIcon> :
                                                                                        <FontAwesomeIcon icon={faMoon} ></FontAwesomeIcon>
                                                                                }
                                                                                    <div>&nbsp;</div>
                                                                                </div>
                                                                            </div> : ''
                                                                        }

                                                                        {m.known_move ?
                                                                            <div className="text-center">

                                                                                <div className="">Learn {m.known_move.name.replaceAll('-', ' ')}</div>
                                                                            </div> : ''
                                                                        }

                                                                    </React.Fragment>
                                                                })}
                                                            </div>

                                                        </Col>
                                                        <Col key={`ev${i}`}>
                                                            <div className="text-center">

                                                                <img style={{ width: '100px' }} alt={`${c?.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${c?.id}.png`} />
                                                                <div className="text-capitalize">{c?.name}</div>

                                                            </div>

                                                        </Col>
                                                    </Row>

                                                </React.Fragment>

                                            )}

                                        </Col>
                                    )}

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>




            </div>
        </div>

    );
}