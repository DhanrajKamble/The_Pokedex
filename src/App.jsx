import { useState } from "react";
import Card from "./components/Card";
import PokeInfo from "./components/PokeInfo";
import axios from "axios";
import { useEffect } from "react";


const App = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");

  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    // console.log(res.data);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous)
    getPokemon(res.data.results);
    setLoading(false);
  }

  const getPokemon = async (res) => {
    const pokemonDetails = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );

    setPokeData(prevState => [...prevState, ...pokemonDetails]);
  };

  useEffect(() => {
    pokeFun();
  }, [url])

  return (
    <main className="container">

      <div className="left-content">
        <Card pokemon={pokeData} loading={loading} infoPokemon={poke => setPokeDex(poke)} />

        <div className="btn-group">
          {prevUrl && <button onClick={() => {
            setPokeData([])
            setUrl(prevUrl)
          }}>Previous</button>}

          {nextUrl && <button onClick={() => {
            setPokeData([])
            setUrl(nextUrl)
          }}>Next</button>}
        </div>

      </div>

      <div className="right-content">
        <PokeInfo data={pokeDex} />
      </div>

    </main>
  )
}

export default App;