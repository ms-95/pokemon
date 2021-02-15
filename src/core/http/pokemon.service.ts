import axios from "axios";
import { IdExtractor } from "../../shared/utils/id-extractor.utils";
import PokemonRepository from "./pokemon.repository";

export default function PokemonService() {
    const pokemonRepository = PokemonRepository(); 

    const getPokemonList = async() => {
        const list = await pokemonRepository.getPokemons().then(res => {
            const data = res.data.results.map((r: any, i: number) => ({
                index: i + 1,
                name: r.name,
                url: r.url,
            }));
            const sortedList = [
                data.slice(0, 151),
                data.slice(151, 251),
                data.slice(251, 386),
                data.slice(386, 493),
                data.slice(493, 649),
                data.slice(649, 721),
                data.slice(721, 809),
                data.slice(809)
            ];            
            return sortedList;
        });
        return list;

    }
    const getPokemon = async (index: number) => {
        const pokemon = await pokemonRepository.getPokemon(index).then(res => res.data);
        const species = await pokemonRepository.getSpecies(index).then(res => res.data);
        const evolution = await pokemonRepository.getEvolution(IdExtractor(species?.evolution_chain.url)).then(res => res.data);
        const moves = await Promise.all<any>(pokemon.moves.map((m: any) => {
            return pokemonRepository.getMove(IdExtractor(m.move.url)).then((res) => res.data);
        }));
        
        const formattedMoveset = formatMoveset(pokemon.moves, moves);
        const formattedEvolution = formatEvolutionChain(evolution.chain);
        console.log({
            ...pokemon,
            base_happiness: species.base_happiness,
            capture_rate: species.capture_rate,
            gender_rate: species.gender_rate,
            egg_groups: species.egg_groups,
            hatch_counter: species.hatch_counter,
            moves: formattedMoveset,
            chain: formattedEvolution
        });

        return {
            ...pokemon,
            base_happiness: species.base_happiness,
            capture_rate: species.capture_rate,
            gender_rate: species.gender_rate,
            egg_groups: species.egg_groups,
            hatch_counter: species.hatch_counter,
            moves: formattedMoveset,
            evolution: formattedEvolution
        }
    
        
    }
    const getPreviousNextPokemon = async (index: number) => {       
        return Promise.all([
            pokemonRepository.getPokemon(index-1).catch(ex => {return {data: null}}), 
            pokemonRepository.getPokemon(index+1).catch(ex => {return {data: null}})
        ])
            .then(res => res.map(m => m.data));
    }
    const formatMoveset = (movesetSummary: any[], movesetDetail: any[]) => {
        let moveset = movesetSummary.map((m: any, i :number) => ({
            id: movesetDetail[i].id,
            name: m?.move.name,
            levelLearnedAt: m?.version_group_details[m?.version_group_details.length - 1]?.level_learned_at,
            method: m?.version_group_details[m?.version_group_details.length - 1]?.move_learn_method.name,
            type: movesetDetail[i].type.name,
            power: movesetDetail[i].power,
            pp: movesetDetail[i].pp,
            priority: movesetDetail[i].priority,
            damageClass: movesetDetail[i].damage_class.name,
            accuracy: movesetDetail[i].accuracy,
        }));;
        moveset.sort((a: any, b: any) => a.method.localeCompare(b.method));
        moveset.sort((a: any, b: any) => a.levelLearnedAt - b.levelLearnedAt);
        const levelMoveIndex = moveset.findIndex((a: any) => a.levelLearnedAt > 0);
        moveset = [...moveset.slice(levelMoveIndex), ...moveset.slice(0, levelMoveIndex)];
        return moveset;
    }

    const formatEvolutionChain = (chain: any) => {
        
            let curr = chain;
            const result = {
                rootName: chain.species.name,
                rootId: chain.species.url.match(/https:\/\/pokeapi\.co\/api\/v2\/.*\/(\d+)\//)?.[1],
                chain: new Array()
            };
            let treeIndex = 1;
            while (!!(curr?.evolves_to)) {
                for (let c of curr?.evolves_to) {
                    result.chain.push({
                        name: c.species.name,
                        id: c.species.url.match(/https:\/\/pokeapi\.co\/api\/v2\/.*\/(\d+)\//)?.[1],
                        evolutionDetail: c.evolution_details.length ? [c.evolution_details[c.evolution_details.length - 1]] : [],
                        evolutionOtherMethods: c.evolution_details.slice(0, -1),
                        treeIndex: c.evolution_to ? treeIndex + 1 : treeIndex
                    });
                }
                treeIndex++;
    
                curr = curr.evolves_to[0];
    
            }
            result.chain = result.chain.reduce((save, curr) => {
                const temp = result.chain.filter((x: any) => x.treeIndex === curr.treeIndex);
                if (save.length < curr.treeIndex) {
                    save.push(temp);
                }
                return save;
            }, []);
    
            return result;
    }
    
    return {getPokemonList, getPokemon, getPreviousNextPokemon};
}
