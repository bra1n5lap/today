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



function moreTxt() {

  var txt = localStorage.getItem('note');
  var doc = nlp(txt);

  var freq = doc.unigrams();

  let final_text = "";

  for (let i = 0; i < freq.length; i++) {
    let thing = freq[i].normal;
    // let thing_count = freq[i].count;
    var matches = doc.match("* " + thing + " *").text() + "\n" + doc.match("^" + thing + " *").text();
    matches = matches.replaceAll("\n\n", "\n");
    // matches = matches.replaceAll("\n","<br>");

    let output = "<div><h1>" + thing + "</h1><textarea onKeyPress=\"updateTxt(event,this,\'" + thing + "\')\" class=\"topic\" style = \"width:100%;height:30vw\">" + matches + "</textarea></div>";
    final_text += output;

  }

  // var x = doc.tfidf()

  document.getElementById("todo_list").innerHTML = final_text;

}




function updateTxt(evnt, elm, topic) {


  var code = (evnt.keyCode ? evnt.keyCode : evnt.which);
  if (code != 13) { //Enter keycode
    return;
  }


  var txt = localStorage.getItem('note');
  var doc = nlp(txt);



  t = elm.value.split("\n");

  a = doc.match("* " + topic + " *").out('array');

  b = doc.match("^" + topic + " *").out('array');

  a.push(...b);

  a_set = new Set(a);

  t_set = new Set(t);


  let to_remove = new Set([...a_set].filter(x => !t_set.has(x)));
  let to_add = new Set([...t_set].filter(x => !a_set.has(x)));


  for (let i of to_remove) {

    doc.match(i).remove();

  }

  var final_txt = doc.text();

  for (let i of to_add) {

    var final_txt = i + "\n" + final_txt;

  }


  localStorage.setItem('note', final_txt);



}



function top_three() {

  var txt = localStorage.getItem('note');
  clean_txt = txt.replaceAll("\n\n", "\n");
  txt_list = clean_txt.split("\n");
  max_length = txt_list.length - 1;

  var d = new Date();

  var seed = d.getFullYear() + "" + d.getMonth() + "" + d.getDate();
  seed = seed * 1;


  var seededRandom = function (min, max) {
    max = max || 1;
    min = min || 0;

    seed = (seed * 9301 + 49297) % 233280;
    var rnd = seed / 233280;

    return Math.floor(min + rnd * (max - min));
  }

  var first = seededRandom(1, max_length);
  var second = seededRandom(1, max_length);
  var third = seededRandom(1, max_length);

  var top3 = [first, second, third];

  top3 = new Set(top3);

  var final_result = "<ul>";

  for (let i of top3) {

    final_result += "<li>" + txt_list[i] + "</li>";

  }

  final_result += "</ul>";

  document.getElementById("today_section").innerHTML = final_result;


}




















//   displayTxt();

moreTxt();

top_three();











