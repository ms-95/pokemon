import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import MoveService from "../../../core/http/move/move.service";
import { Category } from "../../../shared/category.enum";
import { Type } from "../../../shared/type.enum";
import upperFirstCase from "../../../shared/utils/upper-first-case.utils";
import Physical from '../../../assets/images/physical.png';
import Speical from '../../../assets/images/special.png';
import Status from '../../../assets/images/status.png';
import {TypeIcon} from '../../../assets/images/index';
import MoveType from "../../../shared/components/move-type.component";
export default function MoveSummary() {
    const moveService = MoveService();
    const types = Object.keys(Type).filter((x: any) => isNaN(Number(x))).map((t: any) => ({
        name: upperFirstCase(t),
        value: Type[t]
    }));
    const categories = Object.keys(Category).filter((x: any) => isNaN(Number(x))).map((c: any) => ({
        name: upperFirstCase(c),
        value: Category[c]
    }));
    const [moves, setMoves] = useState(new Array());
    useEffect(() => {
        getMoves();
    }, []);

    const getMoves = async () => {
        const result = await moveService.getMoveList();
        console.log(result);
        
        setMoves(result.filter(x => x.learned_by_pokemon?.length));
    }
    return (
        <React.Fragment>

            <Form className="sticky-top bg-light rounded-bottom shadow">
                <Row noGutters className="p-2" >
                    <Col bsPrefix="col-12 col-sm-3 " className="" >
                        <Form.Group controlId="exampleForm.ControlSelect1">
                           
                            <Form.Control as="select" >
                                <option>All types</option>
                                {types.map((t: any, i: number) => <option key={`type${i}`} value={t.value}>{t.name}</option>)}
                            </Form.Control>
                        </Form.Group>

                    </Col>
                    <Col bsPrefix="col-12 col-sm-3" className="offset-sm-1">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select">
                                <option>All categories</option>
                                {categories.map((c: any, i: number) => <option key={`type${i}`} value={c.value}>{c.name}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col className="col-12 col-sm-auto offset-sm-1 text-center">
                        <Button variant="primary">Search</Button>
                    </Col>
                </Row>
            </Form>
            <div className="p-4 d-flex flex-column">
                <Row>
                    <Col bsPrefix="col-12">
                        <Card className="my-2 shadow border-0">

                            <Card.Body>
                                <Row className="border-bottom">
                                    <Col style={{ minWidth: '150px', maxWidth: '150px' }}>Name</Col>
                                    <Col style={{ minWidth: '90px', maxWidth: '90px' }}>Type</Col>
                                    <Col className="d-none d-sm-block" style={{ minWidth: '70px', maxWidth: '70px' }}>
                                        Cat.
                                        </Col>
                                    <Col style={{ minWidth: '60px', maxWidth: '60px' }}>Pow</Col>
                                    <Col className="d-none d-sm-block" style={{ minWidth: '60px', maxWidth: '60px' }}>Acc.</Col>
                                    <Col className="d-none d-sm-block" style={{ minWidth: '60px', maxWidth: '60px' }}>PP</Col>
                                    <Col  className="d-none d-lg-block">Effects</Col>
                                    <Col></Col>
                                </Row>
                               {
                                moves.map((m: any) => 
                                    <Row className="py-2 border-bottom">                                        
                                        <Col style={{minWidth: '150px', maxWidth: '150px'}}>{m.name}</Col>
                                        <Col style={{minWidth: '90px', maxWidth: '90px'}}>
                                         
                                        <MoveType typeName={m?.type.name} typeValue={m?.type.value}></MoveType>
                                          
                                            </Col>
                                        <Col style={{minWidth: '70px', maxWidth: '70px'}} className="d-none d-sm-block">
                                           
                                            <img style={{objectFit: 'scale-down'}} src={m?.damage_class?.value === Category.physical ? Physical : m?.damage_class?.value === Category.special ? Speical : Status}/>
                                        </Col>
                                        <Col style={{minWidth: '60px', maxWidth: '60px'}}>{m.power}</Col>
                                        <Col className="d-none d-sm-block" style={{minWidth: '60px', maxWidth: '60px'}}>{m.accuracy}</Col>
                                        <Col className="d-none d-sm-block" style={{minWidth: '60px', maxWidth: '60px'}}>{m.pp}</Col>
                                        <Col bsPrefix="col-8 col-lg my-1 my-sm-0" className="bg-light shadow-sm">{m?.flavor_text_entries?.[0]?.flavor_text}</Col>
                                        <Col bsPrefix="col-4 col-lg-auto" className="d-flex align-items-center">
                                            <Button variant="primary" className="shadow">View</Button>
                                        </Col>
                                    </Row>
                                )}
                              
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>

    );
}