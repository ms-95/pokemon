import { TypeColor } from "../type-color.enum";

export default function TypePill(props: {type: string}) {
    return (
        <div style={{ width: '80px', backgroundColor: (TypeColor as { [key: string]: string })[props.type] }} className="mx-1 px-2 rounded-pill shadow">
            <div className="text-white text-capitalize text-center ">{props.type}</div>
        </div>
    )
} 