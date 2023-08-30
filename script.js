if (localStorage.getItem('note') === null) {

    var default_txt = "Drink Water Daily \n Walk Daily \n Movie Titanic \n Movie Oppenheimer \n Movie Barbie \n  ";
  
    localStorage.setItem('note', default_txt);
  
  
  }
  
  
  
  
  function saveTxt() {
  
  
    var txt = document.getElementById("note").value;
  
    /* document.getElementById("op").innerText = txt;*/
  
    localStorage.setItem('note', txt);
  
  
  }
  
  
  document.getElementById("note").innerHTML = localStorage.getItem('note');
  
  function freq(string) {
  
    var words = string.replace(/[.]/g, '').split(/\s/); 

    var freqMap = {};
    words.forEach(function(w) {
      if (!freqMap[w]) {
        freqMap[w] = 0;
      }
      freqMap[w] += 1;
    });
  
  
    // Step - 1
    // Create the array of key-value pairs
    var items = Object.keys(freqMap).map(
      (key) => {
        return [key, freqMap[key]]
      });
  
    // Step - 2
    // Sort the array based on the second element (i.e. the value)
    items.sort(
      /*   (first, second) => { return first[1] - second[1] } */
      (first, second) => {
        return second[1] - first[1]
      }
  
    );
  
    // Step - 3
    // Obtain the list of keys in sorted order of the values.
    var sorted = items.map(
      (e) => {
        return e[0]
      });
  
    /* console.log(sorted) */
  
    return sorted;
  }
  


stop_words = [""," ","a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "aren't", "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can't", "cannot", "could", "couldn't", "did", "didn't", "do", "does", "doesn't", "doing", "don't", "down", "during", "each", "few", "for", "from", "further", "had", "hadn't", "has", "hasn't", "have", "haven't", "having", "he", "he'd", "he'll", "he's", "her", "here", "here's", "hers", "herself", "him", "himself", "his", "how", "how's", "i", "i'd", "i'll", "i'm", "i've", "if", "in", "into", "is", "isn't", "it", "it's", "its", "itself", "let's", "me", "more", "most", "mustn't", "my", "myself", "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours	ourselves", "out", "over", "own", "same", "shan't", "she", "she'd", "she'll", "she's", "should", "shouldn't", "so", "some", "such", "than", "that", "that's", "the", "their", "theirs", "them", "themselves", "then", "there", "there's", "these", "they", "they'd", "they'll", "they're", "they've", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was", "wasn't", "we", "we'd", "we'll", "we're", "we've", "were", "weren't", "what", "what's", "when", "when's", "where", "where's", "which", "while", "who", "who's", "whom", "why", "why's", "with", "won't", "would", "wouldn't", "you", "you'd", "you'll", "you're", "you've", "your", "yours", "yourself", "yourselves"]


function removeFromString(arr,str){
  let regex = new RegExp("\\b"+arr.join('|')+"\\b","gi")
  return str.replace(regex, '')
}




  
  function displayTxt() {
  
    var txt = localStorage.getItem('note').toLowerCase().trim();

txt = txt.replace(/[ ]+/g,' ');
txt = txt.replace(/[\n]+/g,'\n');
txt = txt.replace(/( \n)+/g,'\n');
txt = txt.replace(/(\n )+/g,'\n');

/* txt = removeFromString(stop_words, txt); */






  
    var f = freq(txt);

for(i=0;i<stop_words.length;i++)
{
   const index = f.indexOf(stop_words[i]);
if (index > -1) { // only splice array when item is found
  f.splice(index, 1); // 2nd parameter means remove one item only
} 
    
}



var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
var months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
var int_months = ['01','02','03','04','05','06','07','08','09','10','11','12']

var now = new Date();
var today_day = days[ now.getDay() ];
var today_month = months[ now.getMonth() ];
var today_date = now.getFullYear()+'-'+int_months[now.getMonth()]+'-'+now.getDate();


// f = [today_date,today_day,today_month].concat(f);





  
    var task = txt.split('\n');
  
    var msg = ""
  
    for (i = 0; i < f.length; i++) {
  
      var op = '';
  
      /*  console.log(f[i]); */
      for (j = 0; j < task.length; j++) {
        if (task[j].includes(f[i])) {
          op = op + task[j] + '<br>';
        }
      }
  
    /*   console.log(op); */
  
      var t = "<details><summary>" + f[i] + "</summary>" + op + "</details>";
      msg = msg + t;
  
    }
  
    /* console.log(f); */
    /*  console.log(task); */
  
    document.getElementById("op").innerHTML = msg;
  
  
  }
  
  displayTxt();
  