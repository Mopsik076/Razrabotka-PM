function romanToInt(s) {
    const list = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let total = 0;
    let last = 0;
    
    for (let i = 0; i < s.length; i++) {
        const current = list[s[i]];
        
        if (current > last) {
            total += current - 2 * last;
        } else {
            total += current;
        }
        
        last = current;
    }
    
    return total;
}
