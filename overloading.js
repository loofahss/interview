class Car{
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    // JS并不支持overloading（重载），下面两种写法，后者会覆盖前者
    // 因此只能通过参数默认值和类型检查来模拟重载行为
    // printDetails(prefix='What'){
    //     console.log(`${prefix} Car: ${this.year} ${this.make} ${this.model}`);
    // }
    printDetails(prefix='Your'){
        console.log(`${prefix} Car: ${this.year} ${this.make} ${this.model}`);
    }
}
const myCar = new Car('Toyota', 'Corolla', 2020);
// myCar.printDetails(); // Your Car: 2020 Toyota Corolla
// myCar.printDetails('My'); // My Car: 2020 Toyota Corolla
class ChildCar extends Car{
    constructor(make, model, year, color){
        super(make, model, year);
        this.color = color;
    }
    printDetails(prefix='His' ){
        // 调用父类的方法
        super.printDetails(prefix);
        console.log(`Color: ${this.color}`);
    }
}
const myChildCar = new ChildCar('Honda', 'Civic', 2021, 'Red');
myChildCar.printDetails('Child');   // Child Car: 2021 Honda Civic
                                    // Color: Red