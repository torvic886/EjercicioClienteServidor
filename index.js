const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const main = async () => {
  let response = await axios.get("https://rickandmortyapi.com/api/character");
  let {
    data: { results },
  } = response;

  let characters = results
    .map((character) => {
      return {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        gender: character.gender
      };
    })
    .map((personaje) => Object.values(personaje).join(", "))
    .join("\n");

    let cabecera = ['ID', 'NOMBRE', 'STATUS', 'ESPECIE','GENERO'].join(',');
    let datos = cabecera.concat('\n').concat(characters);

//    console.log(path.join(__dirname, 'data.csv'));

    await fs.writeFile(path.join(__dirname, 'personajesRickAndMorty.csv'), datos);


//  console.log(path.join(__dirname, "data.csv"));
 // console.log(characters);
};

main();
