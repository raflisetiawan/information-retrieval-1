"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import dependencies
var preprocess_1 = require("./preprocess");
var tfidf_1 = require("natural/lib/natural/tfidf");
// Dokumen-dokumen
var dokumenDokumen = [
    "Airlangga Aldi Pratama bangun pagi. Dia berkuliah di UISI Gresik",
    "UISI berjaya sebagai peringkat 3 Nasional PTN/ PTS Liga 3 bidang kemahasiswaan",
    "gerakan membangun Gresik kurang mendapat tanggapan masyarakat",
    "masyarakat diharapkan tanggap dengan persoalan di sekitar universitas",
    "usaha di sini sukses karena adanya Universitas Internasional Semen Indonesia (UISI)"
];
// Query
var query = "membangun gresik yang sukses dan berjaya";
// Preprocessing dokumen dan query
var processedDocuments = dokumenDokumen.map(function (doc) { return (0, preprocess_1.default)(doc).join(' '); });
var processedQuery = (0, preprocess_1.default)(query).join(' ');
// Inisialisasi TfIdf dan menambahkan dokumen yang sudah diproses
var tfidf = new tfidf_1.TfIdf();
processedDocuments.forEach(function (doc) { return tfidf.addDocument(doc); });
// Fungsi untuk menghitung panjang vektor dokumen dan query
var calculateVectorLengths = function (tfidf, docs, query) {
    var docVectorLengths = docs.map(function (_, i) {
        var length = 0;
        tfidf.listTerms(i).forEach(function (_a) {
            var tfidf = _a.tfidf;
            length += tfidf * tfidf;
        });
        return Math.sqrt(length);
    });
    var queryVectorLength = 0;
    tfidf.tfidfs(query, function (_, measure) {
        queryVectorLength += measure * measure;
    });
    return {
        docVectorLengths: docVectorLengths,
        queryVectorLength: Math.sqrt(queryVectorLength)
    };
};
var _a = calculateVectorLengths(tfidf, processedDocuments, processedQuery), docVectorLengths = _a.docVectorLengths, queryVectorLength = _a.queryVectorLength;
// Fungsi untuk menghitung cosine similarity antara query dan setiap dokumen
var calculateCosineSimilarity = function (tfidf, docs, query, docVectorLengths, queryVectorLength) {
    var similarities = Array(docs.length).fill(0);
    tfidf.tfidfs(query, function (i, measure) {
        similarities[i] += measure / (docVectorLengths[i] * queryVectorLength);
    });
    return similarities;
};
var similarities = calculateCosineSimilarity(tfidf, processedDocuments, processedQuery, docVectorLengths, queryVectorLength);
console.log(tfidf);
// Mengurutkan dokumen berdasarkan kemiripan
var rankedDocuments = similarities
    .map(function (similarity, index) { return ({ index: index, similarity: similarity }); })
    .sort(function (a, b) { return b.similarity - a.similarity; });
console.log("Ranking dokumen berdasarkan kemiripan dengan query:");
rankedDocuments.forEach(function (_a) {
    var index = _a.index, similarity = _a.similarity;
    console.log("Dokumen ".concat(index + 1, ": ").concat(similarity));
});
