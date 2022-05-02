class Card{
    constructor(name, cost = 0){
        this.name = name;
        this.cost = cost;
    }
    showCard(){
        console.log(`${this.name} costs ${this.cost}`)
    }
}

// Unit class inherits from Card Class and has default power and res of 0
// Units can attack other Units, decreasing the target's resilience by the attacker's power
class Unit extends Card{
    constructor(name, cost, power = 0, res = 0){
        super(name, cost);
        this.power = power;
        this.res = res;
    }
    showStats(){
        const unit = super.showCard()
        console.log(`Power: ${this.power}, Resilience: ${this.res}`)
    }
    attack(target){
        // reduce target res by power of attacking card
        target.res -= this.power;
        console.log(`${target.name} has been attacked by ${this.name}! ${target.name} now has ${target.res} resilience!`)
    }
}

// Effect class inherits from Card class and has additional attributes text, stat, and magnitude
// Effects increase or decrease the power or resilience of the card they target
class Effect extends Card{
    constructor(name, cost, text, stat, magnitude){
        super(name, cost);
        this.text = text;
        this.stat = stat;
        this.magnitude = magnitude;
    }
    play(target){
        if (target instanceof Unit){
            if (this.stat == "resilience"){
                target.res += this.magnitude;
                console.log(`${this.name} was played to ${this.text}! ${target.name} now has ${target.res} resilience!`);
            }
            else {
                target.power += this.magnitude;
                console.log(`${this.name} was played to ${this.text}! ${target.name} now has ${target.power} power!`);
            }
        }
        else {
            throw new Error ("Target must be a unit!")
        }
    }
}

const unit1 = new Unit ("Red Belt Ninja", 3, 4, 4)
const unit2 = new Unit ("Black Belt Ninja", 4, 5, 4)

const effect1 = new Effect ("Hard Algorithm", 2, "increase target's resilience by 3", "resilience", 3)
const effect2 = new Effect ("Unhandled Promise Rejection", 1, "reduce target's resilience by 2", "resilience", -2)
const effect3 = new Effect ("Pair Programming", 3, "increase target's power by 2", "power", 2)

// turn 1
unit1.showStats();
effect1.play(unit1);
// turn 2
unit2.showStats();
effect2.play(unit1);
// turn 3
effect3.play(unit1);
unit1.attack(unit2);

