function getRate(num){
  let change=num/2;
  if(change-parseInt(change)>0.5){
    change=parseInt(change)+0.5
  }else {
    change=parseInt(change)-0.5
  }
  return change
}

export default getRate