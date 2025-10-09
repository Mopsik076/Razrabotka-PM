function id (matrix, target) {
    for (let i = 0; i < matrix.length; i++){
        const Neko = matrix[i];
        const Nekoid = Neko.indexOf(target)
        if (Nekoid !== -1) {
            return [i,Nekoid]
        };
    };
};


a = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
];


alert(id(a, 8));

