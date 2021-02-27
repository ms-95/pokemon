import {TypeIcon} from '../../assets/images/index';
import { TypeColor } from '../type-color.enum';
import { Type } from '../type.enum';
export default function MoveType(props: any) {
    const getTypeIcon = (typeValue: number) => {
        switch(typeValue) {
            case Type.bug:
                return TypeIcon.Bug;
            case Type.dark:
                return TypeIcon.Dark;
            case Type.dragon:
                return TypeIcon.Dragon;
            case Type.electric:
                return TypeIcon.Electric;
            case Type.fairy:
                return TypeIcon.Fairy;
            case Type.fighting:
                return TypeIcon.Fighting;
            case Type.fire:
                return TypeIcon.Fire;
            case Type.flying:
                return TypeIcon.Flying;
            case Type.ghost:
                return TypeIcon.Ghost;
            case Type.grass:
                return TypeIcon.Grass;
            case Type.ground:
                return TypeIcon.Ground;
            case Type.ice:
                return TypeIcon.Ice;
            case Type.normal:
                return TypeIcon.Normal;
            case Type.poison:
                return TypeIcon.Poison;
            case Type.psychic:
                return TypeIcon.Psychic;
            case Type.rock:
                return TypeIcon.Rock;
            case Type.steel:
                return TypeIcon.Steel;
            case Type.water:
                return TypeIcon.Water;
        }
    } 
    
    return (
        <div className="rounded-circle d-inline-block mr-2" style={{
            backgroundColor: (TypeColor as { [key: string]: string })[props.typeName],
            boxShadow: `0 0 4px ${(TypeColor as { [key: string]: string })[props.typeName]}`,
        }}>

        <img title={props.typeName} className="m-2" style={{width: '16px'}} src={getTypeIcon(props.typeValue)}/>
        </div>
    );
}