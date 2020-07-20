function init () {

    wait(1000).then(() => {
      clearText()
      typeText('Erick Leandro, ').then(typeLoop)
    })
    
    function typeLoop() {
      typeText('CodePen!')
        .then(() => wait(2000))
        .then(() => removeText('CodePen!'))
        .then(() => typeText('World!'))
        .then(() => wait(2000))
        .then(() => removeText('World!'))
        .then(typeLoop)
    }
    
  }
  
  
  // Source code 🚩
  
  const elementNode = document.getElementById('type-text')
  let text = ''
  
  function updateNode () {
    elementNode.innerText = text
  }
  
  function pushCharacter (character) {
    text += character
    updateNode()
  }
  
  function popCharacter () {
    text = text.slice(0, text.length -1)
    updateNode()
  }
  
  function clearText () {
    text = ''
    updateNode()
  }
  
  
  function wait (time) {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
  
  function typeCharacter (character) {
    return new Promise(resolve => {
      const randomMsInterval = 100 * Math.random()
      const msInterval = randomMsInterval < 50 ? 10 : randomMsInterval
      
      pushCharacter(character)
      wait(msInterval).then(resolve)
    })
  }
  
  function removeCharacter () {
    return new Promise(resolve => {
      const randomMsInterval = 100 * Math.random()
      const msInterval = randomMsInterval < 50 ? 10 : randomMsInterval
      
      popCharacter()
      wait(msInterval).then(resolve)
    })
  }
  
  function typeText (text) {
    return new Promise(resolve => {
      (function _type (index) {
        typeCharacter(text[index]).then(() => {
          if (index + 1 < text.length) _type(index + 1)
          else resolve()
        })
      })(0)
    })
  }
  
  function removeText ({ length:amount }) {
    return new Promise(resolve => {
      (function _remove (index) {
        removeCharacter().then(() => {
          if (index + 1 < amount) _remove(index + 1)
          else resolve()
        })
      })(0)
    })
  }
  
  
  init()
  