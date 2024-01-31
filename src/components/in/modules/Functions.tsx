import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faShare, faUpLong } from '@fortawesome/free-solid-svg-icons'

type Props = {
    selected: number[] | null,
    setSelected: React.Dispatch<React.SetStateAction<number[] | null>>
    notation: string[][]
}

const Functions: React.FC<Props> = ({selected, setSelected, notation}) => {
    
    const whichIcon = (direction: string) => {
        switch (direction) {
            case "left":
                return faReply
            case "right":
                return faShare
            case "forward":
                return faUpLong
            default:
                return faReply
        }
    }
    const renderNotionButtons = (layer: number,numTests: number) => {
        const buttons = [];
        for (let i = 0; i < numTests; i++) {
            const isLastButton = i === numTests - 1;
            const buttonClassName = `${(selected && selected[0] === i) && (selected && selected[1] === layer) && 'bg-slate-100 dark:bg-slate-800'}
             dark:border-slate-800 border-r border-y flex items-center justify-center text-sm ${isLastButton ? 'rounded-r-md' : 'rounded-y-md'}`;
            buttons.push(
                
                <button
                    key={i}
                    className={buttonClassName}
                    onClick={() =>
                        (selected && selected[1] === layer && selected[0] === i) ?
                            setSelected(null) :
                            setSelected([i, layer])
                    }
                >
                    {/* Showing icon/color/function number */}
                    
                    
                    {/* left/right/forward */}
                    {notation[layer - 1] && notation[layer - 1][i] && (notation[layer -1][i] === "left" || notation[layer - 1][i] === "right" || notation[layer - 1][i] === "forward") ? (
                        <FontAwesomeIcon icon={whichIcon(notation[layer - 1][i])} />    

                    // red/purple/blue 
                    ) : (notation[layer - 1] && notation[layer - 1][i] && (notation[layer - 1][i] === "red" || notation[layer - 1][i] === "purple" || notation[layer - 1][i] === "blue")) ? (
                        <div className={`bg-${notation[layer - 1][i]}-500 p-3 rounded-md`} />

                    // mixed color(condution + color/functionNumber)
                    ) : (notation[layer -1] && notation[layer - 1][i] && (notation[layer - 1][i].includes("-"))) ? (
                        <div className={`bg-${notation[layer - 1][i].split("-")[0]}-500 w-6 h-6 rounded-md text-center`}>
                            {notation[layer - 1][i].split("-")[1].includes("f") && !notation[layer - 1][i].split("-")[1].includes("for") && !notation[layer - 1][i].split("-")[1].includes("left") ? (
                                <p className='mt-0.5 dark:text-slate-300 text-slate-900'>{notation[layer - 1][i].split("-")[1]}</p>
                            ) : (
                                <FontAwesomeIcon icon={whichIcon(notation[layer - 1][i].split("-")[1])} className='p-1'/>
                            )}
                        </div>
                    // function number
                    ) : (<p className='text-slate-900 dark:text-slate-300'>{notation[layer - 1] && notation[layer - 1][i]}</p>)}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div>
            <h1 className='font-semibold text-slate-900 dark:text-slate-300'>Functions</h1>
            <div className='flex flex-col text-slate-900 dark:text-slate-300'>
                <div className='grid grid-cols-12 p-2'>
                    <h2 className='p-1 px-2 font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300
                     border-slate-300 dark:border-slate-900 border-l border-y rounded-l-md'>F0</h2>
                    {renderNotionButtons(1,10)}                 
                </div>
                <div className='grid grid-cols-12 p-2'>
                    <h2 className='px-2 p-1 font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300
                     border-slate-300 dark:border-slate-900 border-l border-y rounded-l-md'>F1</h2>
                    {renderNotionButtons(2,10)}                    
                </div>
            </div>
        </div>
    )
}

export default Functions