const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImg = document.querySelector(".pokemon__img");

const form = document.querySelector(".form");
const input = document.querySelector(".input__search");

const buttonPrev = document.querySelector(".btn__prev");
const buttonNext = document.querySelector(".btn__next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNumber.innerHTML = "";
  pokemonName.innerHTML = "Carregando";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImg.style.display = "block";
    pokemonImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    pokemonNumber.innerHTML = data.id;
    pokemonName.innerHTML = data.name;

    input.value = "";

    searchPokemon = data.id;
  } else {
    pokemonImg.style.display = "none";
    pokemonNumber.innerHTML = "";
    pokemonName.innerHTML = "Não encontrado...";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
