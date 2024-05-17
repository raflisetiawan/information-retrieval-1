// Import dependencies
import preprocess from "./preprocess";
import { TfIdf } from 'natural/lib/natural/tfidf';

// Dokumen-dokumen
const dokumenDokumen: string[] = [
  "Airlangga Aldi Pratama bangun pagi. Dia berkuliah di UISI Gresik",
  "UISI berjaya sebagai peringkat 3 Nasional PTN/ PTS Liga 3 bidang kemahasiswaan",
  "gerakan membangun Gresik kurang mendapat tanggapan masyarakat",
  "masyarakat diharapkan tanggap dengan persoalan di sekitar universitas",
  "usaha di sini sukses karena adanya Universitas Internasional Semen Indonesia (UISI)"
];

// Query
const query = "membangun gresik yang sukses dan berjaya";

// Preprocessing dokumen dan query
const processedDocuments = dokumenDokumen.map(doc => preprocess(doc).join(' '));
const processedQuery = preprocess(query).join(' ');

// Inisialisasi TfIdf dan menambahkan dokumen yang sudah diproses
const tfidf = new TfIdf();
processedDocuments.forEach(doc => tfidf.addDocument(doc));

// Fungsi untuk menghitung panjang vektor dokumen dan query
const calculateVectorLengths = (tfidf: TfIdf, docs: string[], query: string) => {
  const docVectorLengths: number[] = docs.map((_, i) => {
    let length = 0;
    tfidf.listTerms(i).forEach(({ tfidf }) => {
      length += tfidf * tfidf;
    });
    return Math.sqrt(length);
  });

  let queryVectorLength = 0;
  tfidf.tfidfs(query, (_, measure) => {
    queryVectorLength += measure * measure;
  });

  return {
    docVectorLengths,
    queryVectorLength: Math.sqrt(queryVectorLength)
  };
};

const { docVectorLengths, queryVectorLength } = calculateVectorLengths(tfidf, processedDocuments, processedQuery);

// Fungsi untuk menghitung cosine similarity antara query dan setiap dokumen
const calculateCosineSimilarity = (tfidf: TfIdf, docs: string[], query: string, docVectorLengths: number[], queryVectorLength: number) => {
  const similarities: number[] = Array(docs.length).fill(0);

  tfidf.tfidfs(query, (i, measure) => {
    similarities[i] += measure / (docVectorLengths[i] * queryVectorLength);
  });

  return similarities;
};

const similarities = calculateCosineSimilarity(tfidf, processedDocuments, processedQuery, docVectorLengths, queryVectorLength);


console.log(tfidf);

// Mengurutkan dokumen berdasarkan kemiripan
const rankedDocuments = similarities
  .map((similarity, index) => ({ index, similarity }))
  .sort((a, b) => b.similarity - a.similarity);

console.log("Ranking dokumen berdasarkan kemiripan dengan query:");
rankedDocuments.forEach(({ index, similarity }) => {
  console.log(`Dokumen ${index + 1}: ${similarity}`);
});
