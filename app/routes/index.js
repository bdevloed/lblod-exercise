import Route from '@ember/routing/route';

const query = `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX eli: <http://data.europa.eu/eli/ontology#>
PREFIX aw: <https://data.vlaanderen.be/id/concept/AardWetgeving/>

SELECT DISTINCT * WHERE {
  ?decree
    eli:type_document
      aw:Decreet;
    eli:is_realized_by
      ?verschijningsvorm.

  ?verschijningsvorm
    eli:date_publication
      ?date;
    eli:title
      ?title.
 }
ORDER BY DESC(?date)
LIMIT 5`

export default class IndexRoute extends Route {
  async model() {
    // using https://codex.api.vlaanderen.be:8888 to work around
    // CORS restrictions https://codex.vlaanderen.be/sparql
    // const endpoint = `https://codex.vlaanderen.be/sparql?query=${encodeURIComponent(query)}`;
    const endpoint = `https://codex.opendata.api.vlaanderen.be:8888/sparql?query=${encodeURIComponent(query)}`;
    const response = await fetch(endpoint, { headers: { 'Accept': 'application/sparql-results+json'} } );
    const decisions = await response.json();

    // only interested in the bindings
    let { 'results' : { bindings } } = decisions;

    // The title contains decimal encoded characters.
    // Ideally this is fixed at server side
    return bindings.map(model => {
      let decree = model.decree;
      let date = model.date;
      let title = model.title;
      let verschijningsvorm = model.verschijningsvorm;
      title.value = decode(title.value);
      return { decree, date, verschijningsvorm, title };
    });
  }
}

// cf https://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
function decode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}
