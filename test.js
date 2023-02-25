var cars = [
    // {id:0, createdBy:'chihab'}, 
    // // {id:1, createdBy:'john'},  
    // // {id:2, createdBy:'chihab'}, 
    // {id:3, createdBy:'john'}, 
    // // {id:4, createdBy:'ab'}, 
    // { make: "kia", model: "k", year: "2012" },
    // { make: "audi", model: "a", year: "2012" },
    // { make: "audi", model: "a", year: "2013" },
    // { make: "ford", model: "f", year: "2012" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
    // { make: "ford", model: "f", year: "2015" },
  ];
  var moment = require('moment'); // require

  const result = cars.reduce(function (r, a) {
    r[a.make] = r[a.make] || [];

    r[a.make].push(a);
    return r;
  }, Object.create(null));


  const carsModel = {
    make:[]
  }
const test = cars.map(car => {
    // console.log('car', car);

    // get the make and create car array
carsModel.make.push({make:car.make})


// console.log(carsModel);
})
// console.log(result);
 let sorted = {}
 const items = cars.reduce((groupedCars, car) => {
    const make = car.make
    if(groupedCars[make] == null ) groupedCars[make] = []
    groupedCars[make].push(car)
    return groupedCars
 },{})

 
let itemsSorted = []
for (let i = 0; i< cars.length; i++ ){
  let currentCar = cars[i]

  // check if array has any item
  // if there is no item, create insert the first item and created object with a new key and current iee

  // itemsSorted.map(item => {
  //   if(item.createdBy === currentCar.createdBy){

  //     item.item.push(currentCar)
  //   // itemsSorted.push(item.item == currentCar)
  //   }else {

  //   itemsSorted.push({createdBy:currentCar.createdBy, item:[currentCar]})
  //   }
    
  // })
}
// itemsSorted.map(g => console.log(g));
// console.log(itemsSorted);


const array = [

  {id:0, createdBy:'chihab'}, 
    {id:1, createdBy:'john'},  
    {id:2, createdBy:'chihab'}, 
    {id:3, createdBy:'john'}, 
    {id:4, createdBy:'ab'}, 

  // { name: "Apple", category: "Fruits" },
  
  // { name: "Orange", category: "Colors" },
  
  // { name: "Mango", category: "Fruits" },
  
  // { name: "Peach", category: "Colors" },
  
  // { name: "Orange", category: "Fruits" },
  
  // { name: "Grapes", category: "Fruits" },
  
  ];

  const bookings = [{
    a: 1,
    createdBy:'chihab', 
    created_on: '2021-04-23 10:00:01',
  }, 
  
  {
    b: 1,
    createdBy:'chihab', 
    created_on: '2021-04-24 09:03:01',
  }, 
  
  {
    b: 1,
    createdBy:'sudan', 
    created_on: '2021-04-23 10:00:01',
  }, 
  
  {
    b: 1,
    createdBy:'adam', 
    created_on: '2021-04-24 13:03:01',
  }];


  const groupArrayObject = bookings.reduce((group, arr, index, array) => {
 
    const { createdBy, created_on } = arr;
    let eDate = moment(created_on).format('YYYY-MM-DD');
    // const eDate = moment(e.created_on).format('YYYY-MM-DD');


    group[created_on] = group[created_on] ?? [];

    group[created_on].push(arr);
  
    // console.log(group);
    return group;
  
  },
  
  {});

 
const keys = Object.keys(groupArrayObject);
console.log(groupArrayObject);
keys.forEach((key, index) => {
  // console.log(key);
    // groupArrayObject[key].map(item => console.log(item));
});

let directory = [
  {
      "id": 37,
      "job": "Electrician",
      "name": "Alan"
  },
  {
      "id": 32,
      "job": "Writer",
      "name": "Mark"
  },
  {
      "id": 37,
      "job": "DIY",
      "name": "Alan"
  },
  {
      "id": 134,
      "job": "Director",
      "name": "Philip"
  },
  {
      "id": 37,
      "job": "Plumber",
      "name": "Alan"
  },
  {
      "id": 85,
      "job": "Teacher",
      "name": "Oliver"
  },
]

let newDirectory = Object.values(directory.reduce((acc, item) => {
  if (!acc[item.name]) acc[item.name] = {
      name: item.name,
      job: []
  };
  acc[item.name].job.push(item.job);
  return acc;
}, {}))

console.log(newDirectory)