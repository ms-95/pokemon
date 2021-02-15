import { useEffect, useState } from "react";

export default function useStatCalculator(
    baseStat: number, 
    statCategory: 'hp' | 'attack' | 'defense' | 'special-attack' | 'special-defense' | 'speed', 
    statType: -1 | 0 | 1 ) {
    const [stat,setStat] = useState(0);

    useEffect(() => {
        if (!baseStat) {
            return;
        }
        switch(statCategory) {
            case 'hp':            
                setStat(Math.floor( 0.01 * (2 * baseStat + (statType === 1 ? 31 : 0) + Math.floor(0.25 * (statType === 1 ? 252 : 0))) * 100) + 100 + 10)
                break;
            default:   
                
                setStat(Math.floor((Math.floor( 0.01 * (2 * baseStat + (statType === 1 ? 31 : 0) + Math.floor(0.25 * (statType === 1 ? 252 : 0))) * 100) + 5) * (1 + statType / 10)) )       
                break;

        }
        
      }, [baseStat]);
    
    return stat;
} 