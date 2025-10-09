function findElementIndex(matrix, target) {
    for (let i = 0; i < matrix.length; i++) {
        let neko = matrix[i];
        let j = neko.indexOf(target);
        if (j !== -1) {
            return [i, j];
        }
    }
    return null;
}

const a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
alert(a)
let Find = Number(prompt("Введите число:"));

let result = findElementIndex(a, Find);

if (result === null) {
    alert("Элемент не найден");
} else {
    alert(`Элемент ${Find} найден в позиции (${result[0]}, ${result[1]})`);
}
