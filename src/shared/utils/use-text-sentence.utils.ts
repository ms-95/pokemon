import { useEffect, useState } from "react";

export default function useTextSentence(value: string) {
    const [text, setText] = useState('');

    useEffect(() => {
        const noHyphenText = value.replaceAll('-', ' ');
        const formattedText = noHyphenText.split('')
                                .map((s: string, i: number) => i === 0 ? s.toUpperCase() : s.toLowerCase()).join('')
        setText(formattedText);
    }, [value]);

    return text;
    
}