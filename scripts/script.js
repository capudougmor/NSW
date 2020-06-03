document.querySelector('select[name=city]').disabled = true
function populateUfs() {
  const ufSelect = document.querySelector('select[name=uf]')
  
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(res => res.json())
  .then((states) => {
    for(state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUfs()

function getCities(event) {
  const citySelect = document.querySelector('select[name=city]')
  const stateInput = document.querySelector('input[name=state]')

  const ufValue = event.target.value

  const indexOfSelectedUf = event.target.selectedIndex 
  stateInput.value = event.target.options[indexOfSelectedUf].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  
  citySelect.innerHTML = "<option>Selecione a cidade</option>"
  
  citySelect.disabled = true
  
  fetch(url)
    .then(res => res.json())
    .then((cities) => {
      for(city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      
    citySelect.disabled = false

    })
}


document
.querySelector('select[name=uf]')
.addEventListener('change', getCities)