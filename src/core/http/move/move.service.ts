import { Category } from "../../../shared/category.enum";
import { Type } from "../../../shared/type.enum";
import { extractId } from "../../../shared/utils/extract-id.utils";
import upperFirstCase from "../../../shared/utils/upper-first-case.utils";
import MoveRepository from "./move.repository";

export default function MoveService() {
    const moveRepository = MoveRepository();
    const getMoveList = async () => {
        const moveTempList: any[] =  await moveRepository.getMoves().then(d => d.data.results);
        const moveList = await Promise.all(
            moveTempList.map((m: any, i: number) => moveRepository.getMove(extractId(m?.url)).catch(e => null)))
                .then((res: any[]) => res.filter(d => d).map((d: any) => 
                    {

                    if(d.data.damage_class === null) {
                        console.log(d.data);
                        
                    }
                    return ({
                        ...d.data,
                        name: upperFirstCase(d.data.name),
                        type: {...d.data.type,  name: upperFirstCase(d.data.type.name), value: Type[d.data.type.name]},
                        damage_class: {
                            ...d.data.damage_class,  
                            name: upperFirstCase(d.data.damage_class?.name || ''), 
                            value: Category[d.data.damage_class?.name]
                        },
                        flavor_text_entries: d.data.flavor_text_entries.filter((f: any) => f.language.name === 'en')
                    })
                }
                ));
        return moveList;
    }
    return {getMoveList};
}