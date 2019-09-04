/* global d3 */
/* usage
	import loadData from './load-data'
	loadData().then(result => {

	}).catch(console.error)
*/

const categoryMatches = {
  'color': 'color-noun',
  'royalty': 'royalty-noun',
  'inn': 'noun-inn',
  'noun': 'noun-noun'
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function loadA(file) {
  return new Promise((resolve, reject) => {
    d3.csv(`assets/data/${file}`)
      .then(result => {
        // clean here
        const clean = result.map(d => ({
          ...d,
          pub: toTitleCase(d.pub),
          count: +d.count,
          category: categoryMatches[d.tag]
        }))
        console.log(clean)
        resolve(clean);
      })
      .catch(reject);
  });
}

export default function loadData() {
  const loads = [loadA('pub-counts.csv')];
  return Promise.all(loads);
}