
const Card = ({ pokemon, loading, infoPokemon }) => {
    return (
        <div>
            {
                loading ? <h1>Loading...</h1> :
                    pokemon.map((item) => {
                        return (
                            <div className="card" key={item.id} onClick={()=>infoPokemon(item)}>
                                <h2>{item.id}</h2>
                                <img src={item.sprites.front_default} alt="pokemon image" />
                                <h2>{item.name}</h2>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default Card;