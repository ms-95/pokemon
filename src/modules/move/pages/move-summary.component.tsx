import React, { useContext, useEffect, useState } from "react";
import MoveService from "../../../core/http/move/move.service";
import { Category } from "../../../shared/category.enum";
import { Type } from "../../../shared/type.enum";
import upperFirstCase from "../../../shared/utils/upper-first-case.utils";
import Physical from '../../../assets/images/physical.svg';
import Speical from '../../../assets/images/special.svg';
import Status from '../../../assets/images/status.svg';
import {TypeIcon} from '../../../assets/images/index';
import MoveType from "../../../shared/components/move-type.component";
import SpinnerContext from "../../../shared/contexts/spinner.context";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MoveContext from "../../../shared/contexts/move.context";
import { Button, Card, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";


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
    const { setIsLoading } = useContext(SpinnerContext);
    const { moveCache, setMoveCache } = useContext(MoveContext);
    const [moves, setMoves] = useState(new Array());
    const [type, setType] = useState(0);
    const [category, setCategory] = useState(0);
    useEffect(() => {
        getMoves();
    }, []);
    useEffect(() => {
        if(moves.length > 0) {
            setIsLoading(false);
        }
    }, [moves]);
    const getMoves = async () => {
        setIsLoading(true);
        console.log(moveCache);
        
        if (moveCache.length < 1) {

            const result = await moveService.getMoveList().finally(() => {setIsLoading(false);});
            console.log(result);
            setMoves(result.filter(x => x.learned_by_pokemon?.length));
            setMoveCache(result.filter(x => x.learned_by_pokemon?.length))
        } else {
            setMoves(moveCache);            
        }
    }

    const onTypeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as number);
    };
    const onCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCategory(event.target.value as number);
    };
    
    return (
        <React.Fragment>
            <div className="p-4 " style={{position: 'sticky', top: '42px', left: '0px', right: '0px'}}>
            <Card style={{background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(2px)'}}>
                <CardContent>
                    <div className="d-flex align-items-end ">
                        <div className="w-75">
                        
                        <FormControl className="w-25">
                            <InputLabel >Type</InputLabel>
                            <Select                            
                            value={type}
                            onChange={onTypeChange}
                            >
                                {types.map((type: any) => 
                                    <MenuItem value={type.value}>{type.name}</MenuItem>                            
                                )}
                            
                            </Select>
                        </FormControl>

                        <FormControl className="w-25 mx-4">
                            <InputLabel >Category</InputLabel>
                            <Select                            
                            value={category}
                            onChange={onCategoryChange}
                            >
                                {categories.map((cat: any) => 
                                    <MenuItem value={cat.value}>{cat.name}</MenuItem>                            
                                )}
                            
                            </Select>
                        </FormControl>
                        </div>
                        <div>
                            <Button variant="contained" color="primary" size="small">
                                Search
                            </Button>
                        </div>
                    </div>
                </CardContent>
             
            </Card>
           
            </div>
            <div className="p-4 ">
                <Card>
                    <CardContent>
                    <TableContainer>
            
            <Table >
                <TableHead>
                <TableRow>
                    <TableCell width="100px" >Name</TableCell>           
                    <TableCell width="160px">Type</TableCell>
                    <TableCell width="160px">Pow</TableCell>
                    <TableCell width="80px">Cat.</TableCell>
                    <TableCell width="80px">Acc.</TableCell>
                    <TableCell width="80px">PP</TableCell>
                    <TableCell>Effects</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {moves?.map((row) => (
                        <TableRow key={row?.id}>
                        
                            <TableCell >
                                <Link to={`/move/${row?.id}`}> {row?.name}</Link>   
                            </TableCell>
                            <TableCell >
                                <MoveType typeName={row?.type.name} typeValue={row?.type.value}></MoveType>
                            </TableCell>
                            <TableCell >{row?.power}</TableCell>
                            <TableCell >
                                <img title={row?.damage_class.name} 
                                    style={{objectFit: 'scale-down'}} 
                                    src={row?.damage_class?.value === Category.physical ? Physical : 
                                        row?.damage_class?.value === Category.special ? Speical : 
                                        Status}/>
                            </TableCell>
                            <TableCell >{row?.accuracy}</TableCell>
                            <TableCell >{row?.pp}</TableCell>
                            <TableCell >{row?.flavor_text_entries?.[0]?.flavor_text}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
                    </CardContent>

                </Card>
            </div>
          
        </React.Fragment>

    );
}