let cardList = document.getElementById('cardList')
let categoryList = document.getElementById('categoryList')
let data = []


function getCategory() {
    fetch('https://69b3c331e224ec066bdd03a6.mockapi.io/api/v1/Category')
        .then(res => res.json())
        .then(categ => {
            categ.map(categ => categoryList.innerHTML += `<li onclick="sortData('${categ.name}')" class=" p-2 border border-green-400 rounded-xl cursor-pointer text-green-400 text-md">${categ.name}</li>`)
        }
    )
}

getCategory()

fetch('https://69b3c331e224ec066bdd03a6.mockapi.io/api/v1/Product')
    .then(res => res.json())
    .then(getData => {
        data = getData
        getDataRender(data)
    }
)


function getDataRender(data) {
    cardList.innerHTML = data.map(item =>
        ` <div class="border border-green-400 p-3 h-fit rounded-lg">
            <img src="${item.image}" class="w-full h-full object-cover rounded">
                <h4 class="mt-2 font-bold">${item.title}</h4>
                <h5 class="mt-2 text-yellow-400 italic">${item.category}</h5>
                <p class="text-green-400">${item.price} AZN</p>
        </div>`
    ).join('')
}


function sortData(name) {
    const result = (name === 'all') ? data : data.filter(filt => filt.category === name)
    getDataRender(result)

    if (result.length === 0) {
        cardList.innerHTML = `<p class= "col-span-full text-center text-2xl text-green-400 mt-10 ">Bu kateqoriyada mehsul movcud deyil. Xahis olunur basqa kateqoriyalara goz atasiniz. </p>`
    } else {
        getDataRender(result)
    }

}

