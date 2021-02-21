import {PokemonTypeIcon} from '../../assets/images/index';
import { Type } from '../type.enum';
export default function PokemonType(props: any) {
    const getPokemonTypeIcon = (typeValue: number) => {
        switch(typeValue) {
            case Type.bug:
                return PokemonTypeIcon.Bug;
            case Type.dark:
                return PokemonTypeIcon.Dark;
            case Type.dragon:
                return PokemonTypeIcon.Dragon;
            case Type.electric:
                return PokemonTypeIcon.Electric;
            case Type.fairy:
                return PokemonTypeIcon.Fairy;
            case Type.fighting:
                return PokemonTypeIcon.Fighting;
            case Type.fire:
                return PokemonTypeIcon.Fire;
            case Type.flying:
                return PokemonTypeIcon.Flying;
            case Type.ghost:
                return PokemonTypeIcon.Ghost;
            case Type.grass:
                return PokemonTypeIcon.Grass;
            case Type.ground:
                return PokemonTypeIcon.Ground;
            case Type.ice:
                return PokemonTypeIcon.Ice;
            case Type.normal:
                return PokemonTypeIcon.Normal;
            case Type.poison:
                return PokemonTypeIcon.Poison;
            case Type.psychic:
                return PokemonTypeIcon.Psychic;
            case Type.rock:
                return PokemonTypeIcon.Rock;
            case Type.steel:
                return PokemonTypeIcon.Steel;
            case Type.water:
                return PokemonTypeIcon.Water;
        }
    } 
    
    return (
        <img title={props.typeName} src={getPokemonTypeIcon(props.typeValue)}/>
    );
}