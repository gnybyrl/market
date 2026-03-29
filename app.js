let cardList = document.getElementById('cardList')
let categoryList = document.getElementById('categoryList')
let cartList = document.getElementById('cartList')
let count = document.getElementById('count')
let searcg = document.getElementById('search')
let srchinput = document.getElementById('srchinput')

let data = []

let sebet = []



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
                <p onclick="addCart(${item.id})" class="mt-4 text-green-400 cursor-pointer"><i class="fa-solid fa-cart-shopping text-yellow-400 text-xl"></i>Sebete elave et</p>
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


function openCart() {
    let cart = document.getElementById('cart')
    cart.style.display === 'none' ? cart.style.display = 'block' : cart.style.display = 'none'
    
}



function addCart(id) {
    let mehsul = sebet.find(item => item.id == id)

    if (mehsul) {
        mehsul.count += 1
    } else {
        let product = data.find(item => item.id == id)
        product.count = 1
        sebet.push(product)
    }
    
    showCart()
}

function showCart() {
    total = 0;
    cartList.innerHTML = sebet.map((item, index) => {
        total += item.price * item.count
        return `
        <div class="grid md:grid-cols-4 items-center md:gap-4 gap-6 py-4">
                  <div class="col-span-2 flex items-center gap-6">
                    <div class="w-20 h-20 shrink-0">
                      <img src='${item.image}'
                        class="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 class="text-[15px] font-semibold text-slate-900">${item.title}</h3>
                      <h6 class="text-sm text-slate-500 mt-1">Category: <span class="ml-2 font-semibold">${item.category}</span>
                      </h6>
                    </div>
                  </div>
                  <div class="flex items-center gap-4">
                    <button onclick="artim(${index}, 'minus')" type="button"
                      class="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-2 fill-black" viewBox="0 0 124 124">
                        <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"></path>
                      </svg>
                    </button>
                    <span>${item.count}</span>
                    <button onclick="artim(${index}, 'plus')" type="button"
                      class="flex items-center justify-center w-5 h-5 bg-gray-200 outline-none rounded-sm cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-2 fill-black" viewBox="0 0 42 42">
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"></path>
                      </svg>
                    </button>
                  </div>
                  <div class="flex items-center">
                    <h4 class="text-[15px] font-semibold text-slate-900">${item.price * item.count} $</h4>
                    <svg onclick="removeItem(${index})" xmlns="http://www.w3.org/2000/svg" class="w-3 cursor-pointer shrink-0 fill-red-500 ml-auto"
                      viewBox="0 0 320.591 320.591">
                      <path
                        d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                        data-original="#000000"></path>
                      <path
                        d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                        data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
        
        
        `
    }).join('')
    count.innerHTML = sebet.length
}

function removeItem(index) {
    let cart = document.getElementById('cart')
    sebet.splice(index, 1)
    showCart()
    count.innerHTML = sebet.length
    sebet.length == 0 ? cart.style.display = 'none' : cart.style.display = 'block'

}

function artim(index, action) {
    if(action === 'plus') {
        sebet[index].count += 1
    } else if(action === 'minus') {
        if(sebet[index].count > 1) {
            sebet[index].count -= 1
        } else {
            sebet.splice(index, 1)
        }
    }
    showCart()
}

srchinput.addEventListener('input', (e) => {
    searchData(e.target.value)
})

function searchData(srchinput) {
    const key = srchinput.toLowerCase();
    const filtr = data.filter(item => item.title.toLowerCase().includes(key))
    getDataRender(filtr)
}