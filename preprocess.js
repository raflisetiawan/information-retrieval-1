"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokenizers_1 = require("natural/lib/natural/tokenizers");
var stemmers_1 = require("natural/lib/natural/stemmers");
var stopword_1 = require("stopword");
var preprocess = function (dokumen) {
    var tokenizer = new tokenizers_1.WordTokenizer();
    // Fungsi untuk melakukan filtering (pada contoh ini, filtering dilakukan terhadap stop words)
    function filter(words) {
        var filteredWords = (0, stopword_1.removeStopwords)(words, stopword_1.ind);
        return filteredWords;
    }
    // Fungsi untuk melakukan stemming
    function stem(words) {
        var stemmedWords = words.map(function (word) { return stemmers_1.StemmerId.stem(word); });
        return stemmedWords;
    }
    var tokens = tokenizer.tokenize(dokumen);
    var filteredTokens = filter(tokens);
    var stemmedTokens = stem(filteredTokens);
    return stemmedTokens;
};
exports.default = preprocess;
