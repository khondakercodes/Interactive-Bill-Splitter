const memberBtn = document.getElementById("member-btn")
const memberName = document.getElementById("member-name")
const memberBtns = document.getElementById("member-buttons")
const itemName = document.getElementById("item-name")
const itemPrice = document.getElementById("item-price")
const totalsDisplay =  document.getElementById("display")
const addItemBtn =  document.getElementById("add-item")
const taxInput = document.getElementById("tax-rate")
const tipInput = document.getElementById("tip-rate")
const itemsDash = document.getElementById("items-dashboard")


class Member {
    constructor() {
        this.name = ''
        this.taxPaid = 0
        this.tipPaid = 0
        this.subtotal = 0
        this.total = 0
        this.taxRate = parseFloat(taxInput.value)/100
        this.tipRate = parseFloat(tipInput.value)/100
        this.split = false
    }
}

class Item { 
    constructor() {
        this.name = ''
        this.price = 0
    }
}

const memberList = []
const itemList = []

const renderButtons = (array) => {
    const buttonsHTML = array.map(
        (member) => {
            return `<button class="member-btns" id="${member.name}" onclick="memberClick('${member.name}', this)">${member.name}</button>`
        }
    ).join("")

    memberBtns.innerHTML = buttonsHTML
}

const addMember = () => {
    
    const newMember = new Member()
    newMember.name = memberName.value 
    memberList.push(newMember)
    

    renderButtons(memberList)
    renderDisplay(memberList)

}

const renderDisplay = (array) => { 
    const displayHTML = array.map(
        (member) => {
            return `
            <div>${member.name} - <span>Subtotal: ${member.subtotal.toFixed(2)}</span> <span>Total: ${member.total.toFixed(2)}</span></div>
            `
        }
    ).join("")

    totalsDisplay.innerHTML = displayHTML
}


const memberClick = (name, buttonElement) => {
    memberList.forEach( 
        (member) => { 
            if (member.name === name) {
                member.split = !member.split
            }
        }
        
    )

    buttonElement.classList.toggle("highlight")

}

const addItem = () => {
    let flagCounter = 0
    memberList.forEach( 
        (member) => {
            if (member.split) { 
                flagCounter++
            }
        })
    
    if (flagCounter === 0) {
            alert("No members selected to split the bill!")
            return
        }      

    const newItem = new Item() 

    newItem.name = itemName.value
    newItem.price = parseFloat(itemPrice.value)

    itemList.push(newItem)

    const currentItemPrice = parseFloat(itemPrice.value)
    
    const splitAmount = currentItemPrice / flagCounter

    memberList.forEach( 
        (member) => {
            if (member.split) { 
                member.subtotal += splitAmount

                member.split = false
            }
        })


    calculateTotals()
    renderDisplay(memberList)
    

    const memberBtns = document.querySelectorAll(".member-btns")
    memberBtns.forEach(
        (btn) => {
            if (btn.classList.contains("highlight")){
                btn.classList.remove("highlight")
            }
            
        } 
    )

    renderItemsDash(itemList)
}

const calculateTotals = () => {
    memberList.forEach(
        (member) => { 
            member.taxPaid = member.subtotal * member.taxRate
            member.tipPaid = member.subtotal * member.tipRate

            const taxTotal = member.subtotal + member.taxPaid

            member.total = member.tipPaid + taxTotal

        }
    )
}


const renderItemsDash = (array) => {
    const itemsHTML = array.map(
        (item) => {
            return `<div><span>Item Name: ${item.name}</span><span>Price: ${item.price}</span></div>`
        }
    ).join("")

    itemsDash.innerHTML = itemsHTML
}





memberBtn.addEventListener("click",addMember)
addItemBtn.addEventListener("click",addItem)

