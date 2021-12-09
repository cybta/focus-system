let vertical_nav = []
let vertical_focus = 'carousel'
let horizontal_focus_index = 0
let lastcurrentActive 
let currentIndex = null
let currentActive

const mainContainer = document.getElementById('container')
const vNavEl = mainContainer.children
for(let i = 0; i < vNavEl.length; i++){
  vertical_nav.push(vNavEl[i].id)
}

function getcurrentActive() {
    active = document.activeElement.id;
    return active;
}

// Assign Default Active
currentActive = vertical_focus

// check if Vertical element have children focus a child
const focusElmChildren = (elmID) =>{
  const myElement = document.getElementById(elmID);
  lastcurrentActive = myElement
  for (let i = 0; i < myElement.children.length; i++) {

    // Pick the right Child Element to focus 
    if(myElement.children.length > 0 && i === 0){
      const getElmID = myElement.children[horizontal_focus_index].id

      document.getElementById(getElmID).classList.add('focus')
      document.getElementById(getElmID).parentElement.classList.remove('focus')
      document.getElementById(getElmID).focus()
      document.getElementById(getElmID).activeElement
      currentActive = document.getElementById(getElmID).id
    }
  }
}

document.getElementById(vertical_focus).activeElement
document.getElementById(vertical_focus).classList.add('focus')
focusElmChildren(vertical_focus)

document.onkeydown = function (evt) {
    switch (evt.keyCode) {
      case 37:
        handleLeft(); 
        break;

      case 38:
        handleUp(); 
        break;

      case 39:
        handleRight(); 
        break;

      case 40:
        handleDown();
        break;
      case 13:
        detectActive(currentActive);
        break;
    }
};

const handleUp = () => {
  // call the Vertical focus functionality
  upDownFocus('up')
}

const handleDown = () => {
  // call the Vertical focus functionality
  upDownFocus('down')
}

const handleRight = () => {
  // call the Vertical focus functionality
  leftRightFocus('right')
}

const handleLeft = () => {
  // call the Horizontal focus functionality
  leftRightFocus('left')
}

// Vertical Navigation Functionalities for focus
const upDownFocus = (navDirection) => {

  // get the latest focused Dom Element
  currentActive = getcurrentActive();

  // if no element is focused fall back on initial Element
  if (currentActive === "") currentActive = vertical_focus

  // get the index in the array of the focused element
  if(currentIndex === null){
    currentIndex = vertical_nav.findIndex(el => el === currentActive)
  }

  // getting te focus and assigning the last focued
  const getFocused = () => {
    lastcurrentActive =
      lastcurrentActive === undefined ?
      lastcurrentActive = document.getElementById(vertical_nav[currentIndex]) :
      lastcurrentActive = currentActive

    const getAllActive = document.querySelectorAll('.focus')
    if(getAllActive.length > 0){
      getAllActive.forEach(el => {
        el.classList.remove('focus')
      })
    }

    document.getElementById(currentActive).classList.add('focus')
    document.getElementById(currentActive).focus()

    focusElmChildren(currentActive)
  }

  // Run the logic on Up
  if(navDirection === 'up'){
    if(currentIndex > 0 ){
      currentIndex--
      currentActive = vertical_nav[currentIndex]
      getFocused()
    }
  }

  // Run the logic on Down
  if(navDirection === 'down'){
    if(currentIndex < vertical_nav.length - 1){
      currentIndex++
      currentActive = vertical_nav[currentIndex]
      getFocused()
    } else{
      currentActive = vertical_nav[vertical_nav.length - 1]
      getFocused()
    }
  }

}

// get Siblings of an Elment
let getSiblings = function (e) {
  // for collecting siblings
  let siblings = []; 
  // if no parent, return no sibling
  if(!e.parentNode) {
      return siblings;
  }
  // first child of the parent node
  let sibling  = e.parentNode.firstChild;
  
  // collecting siblings
  while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
          siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
  }
  return siblings;
};

const activateFocusChild = (el) => {
  el.classList.add('focus')
  el.focus()
  el.activeElement
  currentActive = el.id

  // remove Focus class from Siblings
  const elSiblings = getSiblings(el)
  elSiblings.forEach(elem => {
    elem.classList.remove('focus')
  })
}

const getNextHorizontal = (elDir) => {
  // Irritate through the Parent Element Children
  const activeChildParent = document.getElementById(currentActive).parentElement
  const activeParentChildren = activeChildParent.querySelectorAll('div')

  if(activeChildParent.children.length){
    const activeChild = document.getElementById(currentActive)
    activeParentChildren.forEach(child => {
      if(child == activeChild){

        var nodes = Array.prototype.slice.call( child.parentElement.children )
        const childIndex = nodes.indexOf( child )

        switch(elDir){
          case 'prev':
            if(childIndex > 0){
              const prevChild = activeChild.previousSibling.previousElementSibling
              activateFocusChild(prevChild)
            }
            break;
          case 'next':
            if(childIndex < activeParentChildren.length - 1){
              const nextChild = activeChild.nextSibling.nextElementSibling
              activateFocusChild(nextChild)
            }
        }
      }
    })
  }
}

const leftRightFocus = (direction) => {
  if(direction === 'left'){
    getNextHorizontal('prev')
  }
  if(direction === 'right'){
    getNextHorizontal('next')
  }
}

const detectActive = (activateEl) => {
  // Get all Elements with active class and remove the class
  const allActiveElement = document.querySelectorAll('.active')
  if(allActiveElement.length > 0){
    allActiveElement.forEach(activeEL => {
      activeEL.classList.remove('active')
    })
  }
  // add Class to current Element
  document.getElementById(activateEl).classList.add('active')
}