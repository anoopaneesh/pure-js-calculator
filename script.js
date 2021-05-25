document.addEventListener('DOMContentLoaded', () => {
  main()
})
class Calculator {
  constructor(previous, current) {
    this.operator = ''
    this.prevOperator = ''
    this.current = current
    this.previous = previous
    this.currentOperand = ''
    this.previousOperand = ''
  }
  clear() {
    this.operator = ''
    this.prevOperator = ''
    this.currentOperand = ''
    this.previousOperand = ''
  }
  doOperation(op) {
    if (this.currentOperand === '') return
    this.operator = op
    if (this.previousOperand !== '' && this.currentOperand !== '') {
      this.compute()
    } else {
      this.previousOperand = this.currentOperand
    }
    this.prevOperator = this.operator
    this.operator = null
    this.currentOperand = ''
  }
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  updateUI() {
    this.current.innerHTML = this.currentOperand === '' ? '0':this.currentOperand
    this.previous.innerHTML = this.previousOperand + this.prevOperator
  }
  compute() {
    let result = 0
    let prev = parseFloat(this.previousOperand)
    let curr = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(curr)) return
    switch (this.prevOperator) {
      case '+':
        result = prev + curr
        break
      case '-':
        result = prev - curr
        break
      case 'X':
        result = prev * curr
        break
      case '/':
        if(curr === 0){
            result = 'Invalid'
            break;
        }
        result = prev / curr
        break
      default:
        result = 0
        return
    }
    this.previousOperand = result.toString()
    this.currentOperand = ''
  }
  equals() {
    if(this.prevOperator==='')return
    this.compute()
    this.currentOperand = this.previousOperand
    this.previousOperand = ''
    this.prevOperator = ''
    this.operator = ''
  }
  delete(){
      if(this.currentOperand === '') return
      this.currentOperand = this.currentOperand.slice(0,-1)
  }
}
function main() {
  let previous = document.querySelector('.previousText')
  let current = document.querySelector('.currentText')
  const calculator = new Calculator(previous, current)
  let AC = document.querySelector('#all-clear')
  let DEL = document.querySelector('#delete')
  let equals = document.querySelector('#equals')
  let numbers = document.querySelectorAll('.number')
  let operations = document.querySelectorAll('.operation')

  AC.addEventListener('click', () => {
    calculator.clear()
    calculator.updateUI()
  })
  DEL.addEventListener('click', () => {
    calculator.delete()
    calculator.updateUI()
  })
  equals.addEventListener('click', () => {
    calculator.equals()
    calculator.updateUI()
  })
  numbers.forEach((number) => {
    number.addEventListener('click', () => {
      calculator.appendNumber(number.innerHTML)
      calculator.updateUI()
    })
  })
  operations.forEach((operation) => {
    operation.addEventListener('click', () => {
      calculator.doOperation(operation.innerHTML)
      calculator.updateUI()
    })
  })
}
