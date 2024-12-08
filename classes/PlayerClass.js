class Player {
    constructor (name, email, record) {
        this.name = name;
        this.email = email;
        this.record = record;
    }
    
    sayHi() {
        console.log(`${this.name} says hi!`);
    };

    displayPlayer() {
        console.log(`This is player ${this.name} with email ${this.email} and a record of ${this.record}`)
    };
};

// const player1 = new Player('Robert', 'krobert9@vt.edu', '1972-0');
// player1.sayHi();
// player1.displayPlayer();

export { Player };