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
  
  
  function displayTxt() {
  
    var txt = localStorage.getItem('note').toLowerCase().trim();

txt = txt.replace(/[ ]+/g,' ');
txt = txt.replace(/[\n]+/g,'\n');
txt = txt.replace(/( \n)+/g,'\n');
txt = txt.replace(/(\n )+/g,'\n');
  
    var f = freq(txt);
  
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
  