import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Loading from '../components/loading'
const Rounds = () => {
    const dispatch = useDispatch()
    const totalRounds = 10
    const [currentRound, setCurrentRound] = useState(1)
    const [pokemonData, setPockemonData] = useState([])
    const [isvalid, setIsValid] = useState(false)
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)
    const [score, setScore] = useState(0)
    const [isOver, setIsOver] = useState(false)
    function getRandomPokemonIds(count = 4) {
        const ids = new Set();

        while (ids.size < count) {
            const id = Math.floor(Math.random() * 10) + 1;
            ids.add(id);
        }

        return [...ids];
    }

    const setAns = (pokemon, index) => {
        if (pokemon.id === pokemonData[0].id) {
            setIsValid(true)
        }
        else {
            setIsValid(false)
        }
        setSelected(index)
    }

    const handleNext = async () => {
        if (isvalid) {
         setScore(prev => prev + 1);
        }
        setCurrentRound(prev => prev + 1);        
        localStorage.setItem('round', currentRound)
        localStorage.setItem('score', score)
        // localStorage.setItem('round', currentRound)
        fetchData()
    };

    const resetGame = () => {
        setScore(0)
        setCurrentRound(1)
        localStorage.setItem('score', 0)
        localStorage.setItem('round', 0)
        fetchData()
    }
    const fetchData = async () => {
        setSelected(null)
        setLoading(true)
        const ids = getRandomPokemonIds()
        try {
            const requests = ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(r => {
                if (!r.ok) throw new Error('Network response was not ok')
                return r.json()
            }))
            const results = await Promise.all(requests)
            const pokemons = results.map(p => ({
                id: p.id,
                name: p.name,
                sprite: p.sprites?.front_default || null,
            }))
            setPockemonData(pokemons)

        }
        catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchData();
        const score = Number(localStorage.getItem('score')) || 0
        const round = Number(localStorage.getItem('round')) || 1

        setCurrentRound(round)
        setScore(score)
    }, [])
    useEffect(() => {
        if (currentRound > 10) {
            setIsOver(true)
        }
        else {
            setIsOver(false)
        }
        if(currentRound >= 1 && score > 0){
            localStorage.setItem('round', currentRound)
            localStorage.setItem('score', score)
        }
    }, [currentRound , score ])
    return (
        <div className=" p-10 m-10 bg-white ">
            {
                loading ? (
                    <div className='flex justify-center'>
                        <Loading />
                    </div>
                )
                    :
                    isOver ?
                        (
                            <>
                                <h1 className='text-5xl font-semibold'>
                                    Your Score is {score} / 10
                                </h1>
                                <button className='mt-5 bg-black text-white p-2 rounded-md' onClick={() => resetGame()}>
                                    Play Again
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="flex items-center gap-5 justify-center">
                                    <h1 className="text-5xl font-semibold">Round :  {currentRound} </h1>
                                    <h1 className="text-5xl font-semibold">Score : {score} </h1>
                                </div>
                                <div className='flex items-center justify-center'>
                                    <img src={pokemonData[0]?.sprite} width={200} alt="" />
                                </div>

                                <div className='grid grid-cols-2 gap-3'>
                                    {
                                        pokemonData.map((pokemon, index) => {
                                            const isChosen = index === selected
                                            const isCorrect = Math.floor(Math.random() * pokemonData.length)
                                            return (
                                                <button key={pokemon.id} className={`${(isChosen && pokemon.id === pokemonData[0]?.id) ? 'bg-green-400' : (isChosen && !(pokemon.id === pokemonData[0]?.id)) ? 'bg-red-400' : (selected && pokemon.id === pokemonData[0]?.id) ? 'bg-green-400' : 'bg-black'} cursor-pointer text-white p-2 rounded w-full`} onClick={() => setAns(pokemon, index)}>{pokemon.name}</button>
                                            )
                                        })
                                    }
                                </div>

                                {
                                    selected !== null ? (<button className='bg-black p-2 text-white mt-5  rounded-md ' onClick={() => handleNext()}>
                                        Next
                                    </button>) : ''
                                }
                            </>
                        )
            }

        </div>
    )
}

export default Rounds;