import {menuArray} from './data.js'

const pizzaitemcard = document.getElementById('itemcard')
const receipt = document.getElementById('receipt')
const totalprice = document.getElementById('totalprice')

const formmodal = document.getElementById('formmodal')




document.addEventListener('click', function(e){
  if(e.target.dataset.additem){
    handleclickadditem(e.target.dataset.additem)
  }
  
 if (e.target.matches('#remove-btn')) {
    removefood(e.target.dataset.removeitem)
    
    
  }
  
 if(e.target.matches('#completeorder')){
   formmodal.classList.remove('hidden')
 } 

  
})

const orderarr = []


function removefood(indextoremove){
  
  orderarr.splice(Number(indextoremove), 1)

  orders()
}



function handleclickadditem(foodid){
  const targetfoodobj =  menuArray.filter(function(food){
  
    return food.id === Number(foodid)
    
  })[0]
   const getOrder = {
           name: targetfoodobj.name,
           price: targetfoodobj.price
  
           };
        
       orderarr.push(getOrder)
      
  orders()
}


function orders(){
        const completeOrderBtn = document.getElementById('completeorder');
          if (orderarr.length > 0) {
    completeOrderBtn.style.display = 'flex';
  } else {
    completeOrderBtn.style.display = 'none';
  }
      
        
       const total = orderarr.reduce((sum, item) => sum + item.price, 0)
       totalprice.innerHTML = `
       <div id="totalprice-container">
       <p id="textotal">Total Price</p>
       <p id="totprice">$${total}<p>
       </div>`
       const html = orderarr.map((data, index) => {return `
           
           <div id="totalcard">
                    <p class="item-name">${data.name}</p>
                    <button id="remove-btn" data-removeitem="${index}">Remove</button>
                   <p class="item-price">$${data.price}</p>
                  
                   
           </div>
       `}).join('')
    receipt.innerHTML = html
    

    }




function renderitems(){
    
  const html = menuArray.map((data, index) => {return `  
           <section class="card">                                
             <div class="card-left">
                <div class="menu-img">${data.emoji}</div>
                 <div class="card-mid">
                     <h4 class="card-name">${data.name}</h4>
                     <p class="card-ingredients">${data.ingredients}</p>
                     <p class="card-price">$${data.price}</p>
                 </div>
             </div>
            <div class="card-end">              
               <button class="add-btn" data-additem="${data.id}"> + </button>        
             </div>
       </section>
                              
            `}).join('')
        
 pizzaitemcard.innerHTML = html       
}

renderitems()