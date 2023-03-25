
const numberWithCommas=(price)=> price.replace(/\B(?=(\d{3})+(?!\d))/g,',')

export default numberWithCommas