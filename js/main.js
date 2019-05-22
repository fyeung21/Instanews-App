const myLongVarName=23;
console.log("Hello World", 28);

$('select').on('click', 'option', function(event){
  console.log(event.currentTarget.parentNode.className);
})