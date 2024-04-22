const fs = require('fs');
const natural = require('natural')

// Import library untuk stemming
const { WordTokenizer, StemmerId } = natural;
const tokenizer = new WordTokenizer();

// Fungsi untuk membaca isi dokumen dari file txt
function readDocument(filename: string): string {
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (error) {
        console.error(`Gagal membaca file ${filename}:`, error);
        return '';
    }
}

// Fungsi untuk melakukan filtering (pada contoh ini, filtering dilakukan terhadap stop words)
function filter(words: string[]): string[] {
    // Daftar kata-kata stop words yang akan dihapus
    const stopWords = ['dan', 'di', 'dari', 'yang', 'atau', 'sehingga', 'pada', 'ke', 'tidak'];
    // Filter kata-kata yang bukan stop words
    const filteredWords = words.filter(word => !stopWords.includes(word.toLowerCase()));
    return filteredWords;
}

// Fungsi untuk melakukan stemming
function stem(words: string[]): string[] {
    // Lakukan stemming pada setiap kata dalam array
    const stemmedWords = words.map(word => StemmerId.stem(word));
    return stemmedWords;
}

// Nama file dokumen
const filename = 'dokumen1.txt';
// Baca isi dokumen dari file txt
const dokumen = readDocument(filename);

// Tokenisasi dokumen
const tokens = tokenizer.tokenize(dokumen);
console.log("Hasil tokenisasi:", tokens);

// Filtering stop words
const filteredTokens = filter(tokens);
console.log("Setelah filtering:", filteredTokens);

// Stemming kata-kata
const stemmedTokens = stem(filteredTokens);
console.log("Setelah stemming:", stemmedTokens);
