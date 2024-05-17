import { WordTokenizer } from 'natural/lib/natural/tokenizers'
import { StemmerId } from 'natural/lib/natural/stemmers'
import { removeStopwords, ind } from 'stopword'

const preprocess = (dokumen: string) => {
    const tokenizer = new WordTokenizer();

    // Fungsi untuk melakukan filtering (pada contoh ini, filtering dilakukan terhadap stop words)
    function filter(words: string[]): string[] {
      const filteredWords = removeStopwords(words, ind);
      return filteredWords;
    }
    
    // Fungsi untuk melakukan stemming
    function stem(words: string[]): string[] {
      const stemmedWords = words.map((word) => StemmerId.stem(word));
      return stemmedWords;
    }
    
    const tokens = tokenizer.tokenize(dokumen);
    const filteredTokens = filter(tokens);
    const stemmedTokens = stem(filteredTokens);

    return stemmedTokens;
}

export default preprocess;