function superHash(password) {
    let hash = 0;
    if (password.length == 0) return hash;
    for (let i = 0; i < password.length; i++) {
        let char = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    // Add a random number to the hash to make it different each time
    hash += Math.floor(Math.random() * 1000);
    return hash.toString();
}
 
const password = 'myTopSecretPassword'
const salt1 = 'aR4dTbojDmuErap.N.9zzu'                 // randomly generated
const hash1 = superHash(salt1 + password)
 
console.log(hash1) // 'aR4dTbojDmuErap.N.9zzujQaCSPyZzAlZ7TQniceLzIHoPrYneGK'
 
const salt2 = '0F7UJjXc4chq6Hh8xMUzwe'                 // randomly generated
const hash2 = superHash(salt2 + password)
 
console.log(hash2) // '0F7UJjXc4chq6Hh8xMUzwe.yn1qqD0KUXGd8AHB6qu21OObiqbwPG'