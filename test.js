var cars = [
    { make: "kia", model: "k", year: "2012" },
    { make: "audi", model: "a", year: "2012" },
    { make: "audi", model: "a", year: "2013" },
    { make: "ford", model: "f", year: "2012" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
    { make: "ford", model: "f", year: "2015" },
  ];


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

 for (let i =0; i < cars.length; i++ ){
    let make = cars[i].make
    if(sorted[make]== null) sorted[make] = []
    // console.log(sorted);
    sorted[make].push(cars[i])
 }
console.log('sorted after',sorted );