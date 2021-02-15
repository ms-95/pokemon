export function IdExtractor(value: string) {   
    
    const regex = new RegExp(`${process.env.REACT_APP_API_DOMAIN || ''}\/[a-z]+-?[a-z]*\/([0-9]+)\/`, 'gm')
    return Number(regex.exec(value)?.[1] || 0);
}