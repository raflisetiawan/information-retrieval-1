"use strict";
var fs = require('fs');
var natural = require('natural');
// Import library untuk stemming
var WordTokenizer = natural.WordTokenizer, StemmerId = natural.StemmerId;
var tokenizer = new WordTokenizer();
// Fungsi untuk membaca isi dokumen dari file txt
function readDocument(filename) {
    try {
        return fs.readFileSync(filename, 'utf8');
    }
    catch (error) {
        console.error("Gagal membaca file ".concat(filename, ":"), error);
        return '';
    }
}
// Fungsi untuk melakukan filtering (pada contoh ini, filtering dilakukan terhadap stop words)
function filter(words) {
    // Daftar kata-kata stop words yang akan dihapus
    var stopWords = ['dan', 'di', 'dari', 'yang', 'atau', 'sehingga', 'pada', 'ke', 'tidak'];
    // Filter kata-kata yang bukan stop words
    var filteredWords = words.filter(function (word) { return !stopWords.includes(word.toLowerCase()); });
    return filteredWords;
}
// Fungsi untuk melakukan stemming
function stem(words) {
    // Lakukan stemming pada setiap kata dalam array
    var stemmedWords = words.map(function (word) { return StemmerId.stem(word); });
    return stemmedWords;
}
// Nama file dokumen
var filename = 'dokumen1.txt';
// Baca isi dokumen dari file txt
var dokumen = readDocument(filename);
// Tokenisasi dokumen
var tokens = tokenizer.tokenize(dokumen);
console.log("Hasil tokenisasi:", tokens);
// Filtering stop words
var filteredTokens = filter(tokens);
console.log("Setelah filtering:", filteredTokens);
// Stemming kata-kata
var stemmedTokens = stem(filteredTokens);
console.log("Setelah stemming:", stemmedTokens);
