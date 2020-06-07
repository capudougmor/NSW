document.querySelector('select[name=city]').disabled = true
function populateUfs() {
  const ufSelect = document.querySelector('select[name=state]')
  
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
.querySelector('select[name=state]')
.addEventListener('change', getCities)

const collectedItems = document.querySelector('input[name=items]')

//itens de coleta
//pegar todos os lis
const itemsToCollect = document.querySelectorAll('.items-grid li')

for(item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  //adicionar ou remover uma classe com javascript
  itemLi.classList.toggle("selected")

  const itemId = event.target.dataset.id

  //verificar se existem etens selecionados, se sim 
  //pegar os itens selecionados  
  
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId
    return itemFound
  })  
  
  //se ja estiver selecionado, 
  if( alreadySelected >= 0 ) {
    //tirar da seleçao
    const filteredItems = selectedItems.filter( item => item != itemId)

    selectedItems = filteredItems
  } else {
    //se nao estiver selecionado, adicionar a seleçao
    selectedItems.push(itemId)
  }  
  
  //atualizar o campo escondido com os itens selecionados
  collectedItems.value = selectedItems
  
  console.log(collectedItems)
}