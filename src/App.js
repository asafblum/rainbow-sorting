import React, {useCallback, useEffect, useState} from 'react';

import Square from './Square.js'
import './App.css';

// import { selectors, actions } from './features/counter';
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const orderedColors = [
    {
        id: 1,
        color:'#9400D3',
    },
    {
        id: 2,
        color: '#4B0082',
    },
    {
        id: 3,
        color: '#0000FF',
    },
    {
        id: 4,
        color: '#00FF00',
    },
    {
        id: 5,
        color: '#FFFF00'
    },
    {
        id: 6,
        color: '#FF7F00',
    },
    {
        id: 7,
        color: '#FF0000',
    },
]

function isSorted(arr){
    let sum = 0;
    arr.slice(1).forEach((item, index) => {sum+= item- arr[index]})
 return Math.abs(sum) === (arr.length - 1)


}

function App() {
    const [colors, setColors] = useState(shuffle(orderedColors))
    const [didWin, setDidWin] = useState(false)


    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            const dragCard = colors[dragIndex]
            setColors(
                update(colors, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, dragCard],
                    ],
                }),
            )

        },
        [colors],
    )

    useEffect(() => {

        const arr = colors.map((item) => item.id)
        if (isSorted(arr)){
            setDidWin(true);
        }

    },[colors])

    const renderSquare = (square, index) => {
        return (
            <Square
                key={square.id}
                index={index}
                id={square.id}
                color={square.color}
                moveCard={moveCard}
            />
        )
    }



  return (
    <div className="App">

        {didWin && <h1>WOWOWOWOWOWOWOOWWO!!!!</h1>}

        {/*<button onClick={()=> setColors(shuffle(orderedColors))}></button>*/}


        <DndProvider backend={Backend}>


      <div className="Colors">


          <>
              {colors.map((color, i) => renderSquare(color, i))}
          </>


      </div>
        </DndProvider>
    </div>
  );
}

export default App;
