export function fontReducer(fontOptions, action) {
  const {type, value} = action;
  console.log(
    'wresuijafiod'
  )
  console.log(action)
  switch(type){
    case "fontStyle":
      console.log(
        "afsdoijdsiofjoifs"
      )
      console.log({...fontOptions, fontStyle: action.value});
      return {...fontOptions, fontStyle: action.value==fontOptions.fontStyle?action.value + "_false":action.value}
      break;
    case "fontSize": 
      console.log({...fontOptions, fontStyle: action.value});
      return{...fontOptions, fontSize: action.value}
    case "fontName":
      console.log('yes')
      return{...fontOptions, fontName: action.value}
       default:
      console.log('def')
  }
}