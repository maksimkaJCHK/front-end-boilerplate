const splitPrice = (numb) => {
  return String(numb).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

export default splitPrice;