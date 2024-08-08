// freelancer has name and occupation and starting prices
// new listings update every few seconds
// adverage starting price updates
// no hard coded name,occupation,or price data in html
// document.querySelector used
// array of names and occupations initialized
// starts with two freelancers
// func that calcs av price
// func that gens person
// stretch goal for me: Filter by occupation, sort by prices, filter by name, stock markert avg price
const workersDom = document.getElementById("workers");
const avgDom = document.querySelector('#average');
const firstNames = [
  "Stacey",
  "Trudy",
  "Abdul",
  "Ren",
  "Roo",
  "Josh",
  "Olga",
  "Joe",
  "Yang",
  "Katie",
  "Lola",
];
const lastNames = [
  "Kolter",
  "Kind",
  "Lamar",
  "Omar",
  "Hutchins",
  "Perry",
  "Port",
  "Yang",
  "Wong",
  "Delta",
  "Barr",
];
const occupations = [
  "Programmer",
  "Doctor",
  "Cook",
  "Maid",
  "Photographer",
  "Salesperson",
  "Nurse",
  "QA Tester",
  "Manager",
  "Mover",
  "Investigator",
];
const imgs = [
    "https://pbs.twimg.com/media/BY8WM4lCYAA-iy6.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0B8ZGK7MIS7Vsp0W_nMfiMvJD-k2biIZusg&s","https://static.wixstatic.com/media/35bb09_7c23bd7306fc4c528b4579b070ed41b4~mv2.jpg/v1/fill/w_572,h_719,al_c,lg_1,q_85,enc_auto/35bb09_7c23bd7306fc4c528b4579b070ed41b4~mv2.jpg","https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Dr._Jack_Griffin.png/220px-Dr._Jack_Griffin.png","https://media.wired.com/photos/593284e24cd5ce6f96c0a5f9/master/pass/WerewolfOfLondon.jpg","https://qph.cf2.quoracdn.net/main-qimg-1d3f769a90990e420b98858770d97c06-lq"
]
class Freelancer {
  constructor(name, occupation, price,img) {
    this.name = name;
    this.occupation = occupation;
    this.price = price;
    this.img = img;
  }
}
const freelancers = [];
// initial two freelancers added
addFreelancer();
addFreelancer();
// initial render
render();
const limit = 20;
const reRender = setInterval(addAndRender, 1000);
// maybe pull over function from my cards to shuffle names...
// clamped range to not go below $25
function genRandomPrice() {
  return Math.round(Math.max(25, Math.random() * 500));
}
function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function generateFreelancer() {
  return new Freelancer(
    getRandomFromArray(firstNames) + " " + getRandomFromArray(lastNames),
    getRandomFromArray(occupations),
    '$'+genRandomPrice(),getRandomFromArray(imgs)
  );
}
function addFreelancer() {
  freelancers.push(generateFreelancer());
}
function render() {
  workersDom.innerHTML = "";
  freelancers.forEach((element) =>
    workersDom.appendChild(assembleFreelancerUI(element, "worker"))
  );
  console.log(avgDom)
  const avg = calcAvgPrice()
  let avgStr = '$'+ avg
  if (Number(avgDom.textContent.split('$')[1]) > avg){
    avgStr = '↑' + avgStr
 avgDom.style.color = 'chartreuse'
  }
  else if (Number(avgDom.textContent.split('$')[1]) < avg){
    avgStr = '↓' + avgStr
   avgDom.style.color = 'red'
  }
  avgDom.textContent = avgStr;
}
function addAndRender() {
  addFreelancer();
  render();
  if (document.querySelector("#workers").childNodes.length == 10) {
    clearInterval(addShapeIntervalId);
  }
}
function calcAvgPrice(){
    //make array
    let arr = [];
    //loop through freelancers and add prices to arr
    freelancers.forEach(element => arr.push(Number(element.price.slice(1))))
    //reduce array via addition and divide by length and return
    return arr.reduce((a, b) => a + b) / arr.length;
}
function fillUIViaClass(frag, className, value) {
  // find on a template doc where to insert something vi ID which should match key in class
//   console.log("." + className +' ' +value);
//   console.log(frag.querySelector('.'+className));

  const obj = frag.querySelector('.'+className);
  //check nodeName which will give stuff like DIV, IMG, P... have code assume it's a text change if no match found
  if (obj.nodeName == "IMG") {
    obj.src = value;
  } else {
    obj.textContent = value;
  }
  // then remove id so confusion cannot happen
  obj.removeAttribute("id");
  return frag;
}
function cloneObjHTML(templateID) {
  let item = document.getElementById(templateID).content;
  //console.log(item);
  return item.cloneNode(true);
}
function assembleFreelancerUI(data, templateID) {
  //makes a fragment to hold the dupe'd template
  const fragment = new DocumentFragment();
  console.log(data)
  //dupe and append template contents to frag
  fragment.appendChild(cloneObjHTML(templateID));
  //get class keys, which should match class name of element needing to be set
  Object.keys(data).forEach((className) => {
    console.log(className)
    fillUIViaClass(fragment, className, data[className]);
  });
  // then once everything is filled out return frag
  return fragment;
}
