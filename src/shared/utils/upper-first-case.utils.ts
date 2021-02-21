export default function upperFirstCase(value: string) {
    const noHyphenParts = value.split('-');     
    const formattedText = noHyphenParts.map((v: string) => {
        return v[0]?.toUpperCase() + v.slice(1);
    }).join(' ');                              
    return formattedText;
    
}