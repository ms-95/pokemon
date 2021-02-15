import axios from "axios";

export default function PokemonRepository() {

    const getPokemons = (limit = Number(process.env.REACT_APP_POKEMON_MAX), offset?: number) => axios(`/pokemon-species?limit=${limit}&offset=${offset}`);
    const getPokemon = (index: number) => axios(`/pokemon/${index}`);
    const getSpecies = (index: number) =>axios(`/pokemon-species/${index}`);
    const getMove = (index: number) =>axios(`/move/${index}`);
    const getEvolution = (groupIndex: number) => axios(`/evolution-chain/${groupIndex}`);
    return {getPokemons, getPokemon, getSpecies, getEvolution, getMove};
}
