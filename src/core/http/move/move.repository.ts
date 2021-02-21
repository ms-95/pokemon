import axios from "axios";

export default function MoveRepository() {

    const getMoves = () => axios(`/move?limit=-1`);
    const getMove = (id: number) => axios(`/move/${id}`);
    return {getMoves, getMove};
}
