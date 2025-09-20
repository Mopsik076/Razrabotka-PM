// Класс оружия
class Weapon {
    constructor(name, Damage) {
        this.name = name;
        this.Damage = Damage;
    }

    getDamage() {
        return Math.floor(Math.random() * (this.Damage)) || 1; // Минимальное повреждение 1
    }
}

// Базовый класс персонажа
class Character {
    constructor(name, health, armor, dodgeChance) {
        this.name = name;
        this.health = health;
        this.armor = armor;
        this.dodgeChance = dodgeChance;
        this.weapon = null;
    }

    chooseWeapon(weapon1, weapon2) {
        this.weapon = Math.random() > 0.5 ? weapon1 : weapon2;
        console.log(`${this.name} выбирает ${this.weapon.name}`);
    }

    attack(target) {
        if (Math.random() < target.dodgeChance) {
            console.log(`${target.name}: MISS ME!`);
            return 0;
        }
        const baseDamage = this.weapon.getDamage();
        if (baseDamage === 0) {
            console.log(`${this.name} WEAK!`);
            return 0;
        }

        const actualDamage = Math.max(0, baseDamage - target.armor);
        target.health -= actualDamage;

        console.log(`Броня ${target.name}a поглотила ${target.armor} урона, получил ${actualDamage} урона`);
        console.log(`${target.name} HP: ${target.health > 0 ? target.health : 0}`);

        return actualDamage;
    }

    isAlive() {
        return this.health > 0;
    }
}

// Строитель оружия
class WeaponBuilder {
    constructor() {
        this._reset();
    }

    _reset() {
        this._weapon = {};
    }

    setName(name) {
        this._weapon.name = name;
        return this;
    }

    setDamage(damage) {
        this._weapon.Damage = damage;
        return this;
    }

    build() {
        const result = new Weapon(this._weapon.name, this._weapon.Damage);
        this._reset();
        return result;
    }
}

// Строитель персонажа
class CharacterBuilder {
    constructor() {
        this._reset();
    }

    _reset() {
        this._character = {};
    }

    setName(name) {
        this._character.name = name;
        return this;
    }

    setHealth(health) {
        this._character.health = health;
        return this;
    }

    setArmor(armor) {
        this._character.armor = armor;
        return this;
    }

    setDodgeChance(dodgeChance) {
        this._character.dodgeChance = dodgeChance;
        return this;
    }

    build() {
        const result = new Character(
            this._character.name,
            this._character.health,
            this._character.armor,
            this._character.dodgeChance
        );
        this._reset();
        return result;
    }
}

// Создание оружия с помощью WeaponBuilder
const stickBuilder = new WeaponBuilder().setName("Палка").setDamage(6).build();
const rockBuilder = new WeaponBuilder().setName("Камень").setDamage(8).build();

// Создание персонажей с помощью CharacterBuilder
const humanBuilder = new CharacterBuilder()
    .setName("Чувак")
    .setHealth(16)
    .setArmor(2)
    .setDodgeChance(0.1)
    .build();

const orkBuilder = new CharacterBuilder()
    .setName("Орк")
    .setHealth(14)
    .setArmor(1)
    .setDodgeChance(0.3)
    .build();

const elfBuilder = new CharacterBuilder()
    .setName("Эльф")
    .setHealth(13)
    .setArmor(2)
    .setDodgeChance(0.2)
    .build();

const dwarfBuilder = new CharacterBuilder()
    .setName("Карлик")
    .setHealth(15)
    .setArmor(3)
    .setDodgeChance(0.3)
    .build();

// Персонажи выбирают оружие
humanBuilder.chooseWeapon(stickBuilder, rockBuilder);
orkBuilder.chooseWeapon(stickBuilder, rockBuilder);
elfBuilder.chooseWeapon(stickBuilder, rockBuilder);
dwarfBuilder.chooseWeapon(stickBuilder, rockBuilder);

// Все бойцы
const fighters = [humanBuilder, orkBuilder, elfBuilder, dwarfBuilder];

// Боевая функция
function fight(a, b, fightNumber) {
    console.log(`${a.name} vs ${b.name}`);
    console.log(`${a.name} [HP:${a.health} ARM:${a.armor}] vs ${b.name} [HP:${b.health} ARM:${b.armor}]`);

    while (a.isAlive() && b.isAlive()) {
        console.log("-----------------------");
        console.log("\nFIGHT!!!");

        if (Math.random() > 0.5) {
            a.attack(b);
            if (!b.isAlive()) break;
            b.attack(a);
        } else {
            b.attack(a);
            if (!a.isAlive()) break;
            a.attack(b);
        }
    }

    let winner;
    if (!a.isAlive() && !b.isAlive()) {
        winner = Math.random() > 0.5 ? a : b;
        console.log("\nLOL, BOTH DIE!");
    } else if (a.isAlive()) {
        winner = a;
        console.log(`\nYOU'R ENEMY DIE, YOU WIN, ${winner.name}`);
        console.log("---------------------");
    } else {
        winner = b;
        console.log(`\nYOU'R ENEMY DIE, YOU WIN, ${winner.name}`);
        console.log("---------------------");
    }

    return winner;
}

// Начало войны!
console.log("WAR IS BEGINNING!");

let fightNumber = 1;
const winners = [];

// Организация боев "каждый с каждым"
for (let i = 0; i < fighters.length; i++) {
    for (let j = i + 1; j < fighters.length; j++) {
        const winner = fight(fighters[i], fighters[j], fightNumber++);
        winners.push(winner.name);

        // Восстанавливаем здоровье после боя
        fighters[i].health = 15 + Math.floor(Math.random() * 3);
        fighters[j].health = 15 + Math.floor(Math.random() * 3);
    }
}

// Печать итогов боев
winners.forEach((winner, index) => {
    console.log("---------------");
    console.log(`Бой №${index + 1}: Победил ${winner}`);
});
