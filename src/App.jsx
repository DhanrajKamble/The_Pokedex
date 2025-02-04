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

  const pokeFun = async () =>{
    setLoading(true);
    const res = await axios.get(url);
    // console.log(res.data);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous)
    getPokemon(res.data.results);
    setLoading(false);
  }

  const getPokemon = async (res) =>{
    res.map((item) =>{
      console.log(item.url);
    })
  }

  useEffect(()=>{
    pokeFun();
  }, [url])

  return (
    <main className="container">

      <div className="left-content">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
         <div className="btn-group">
          <button>Previous</button>
          <button>Next</button>
         </div>

      </div>

      <div className="right-content">
        <PokeInfo />
      </div>

    </main>
  )
}

export default App;