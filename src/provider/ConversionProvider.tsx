import { Conversion } from "@/data/conversion";
import { Event } from "@/data/event";
import { Media } from "@/data/media";
import { ReactElement, useState } from "react";
import { createContext } from "react";

type Props = {
    children :ReactElement
};


type AllConversion = {
    allConversion: Conversion[],
    pushToAllConversion: (elem: MemoryConversion) => void,
    removeInAllConversion: (elem: Conversion) => void,
    setAllConversion: (conversions: Conversion[]) => void,
}

export type MemoryConversion = {
    media: Media | null,
    event: Event | null,
}

type MakingConversion = {
    makingConversion: MemoryConversion,
    setMedia: (elem: Media) => void,
    setEvent: (elem: Event) => void,
    isAllSet: () => boolean,
}

export const MakingConversionContext =  createContext<MakingConversion>({
    makingConversion: {
        media: null,
        event: null,
    },
    setMedia: (elem: Media) => {},
    setEvent: (elem: Event) => {},
    isAllSet: () => { return false; }
});

export const AllConversionContext =  createContext<AllConversion>({
    allConversion: [],
    pushToAllConversion: (elem: MemoryConversion) => {},
    removeInAllConversion: (elem: Conversion) => {},
    setAllConversion: (conversions: Conversion[]) => {},
});

const ConversionProvider = ({ children }: Props) => {
    const [makingConversion, setMakingConversion] = useState<MemoryConversion>({
        media: null,
        event: null,
    });
    const [allConversion, setAllConversion] = useState<Conversion[]>([]);


    return (
        <MakingConversionContext.Provider value={{
            makingConversion,
            setMedia: (elem: Media) => {setMakingConversion({...makingConversion, media: elem, event: null})},
            setEvent: (elem: Event) => {setMakingConversion({...makingConversion, event: elem}); },
            isAllSet: () => {
                if (makingConversion.media && makingConversion.event) {
                    return true;
                }
                return false;
            }
        }}>
            <AllConversionContext.Provider value={{
                allConversion,
                pushToAllConversion: async (elem) => {
                    const response = await fetch('/api/conversion', {
                        method: 'POST',
                        body: JSON.stringify(elem)
                    });
                    const newConversion = await response.json();
                    setAllConversion(allConversion.concat(newConversion));
                },
                removeInAllConversion: (elem) => setAllConversion(
                    allConversion.filter(elem2 => JSON.stringify(elem2) != JSON.stringify(elem))
                ),
                setAllConversion
            }}>
                {children}
            </AllConversionContext.Provider>
        </MakingConversionContext.Provider>    
    );
};

 
export default ConversionProvider;