class Layout {
  constructor(main_input_id, acdh_data_url) {
    this.COLORS = {1:"#E85F63",2:"#E8B15F",12:"#FF9F76"}
    this.main_input = document.getElementById(main_input_id);
    this.acdh_data_url = acdh_data_url;
    this.autocomplete_list = []
  }

  init_interface(){

    /*Build the Autocomplete input box*/
    var inp = this.main_input
    var colors_palette = this.COLORS;
    var autocomplete_list = []
    $.ajax({
            type: "GET",
            url: this.acdh_data_url+"institutions.json",
            dataType: "json",
            async: true,
            success: function(data) {
              //Build the autocomplete_list
              for (var i = 0; i < data.length; i++) {
                autocomplete_list.push(data[i]["name"].trim())
              }
              set_interface();
            }
    });

    function set_interface(){

      main_input_autocomplete();
      /*set the onclick function for the add button*/
      function add_btn_onclick(){
        var input_box_val = document.getElementById("main_input").value.trim()
        if(autocomplete_list.indexOf(input_box_val) > 0){
          if (!($("#boxes_container .a-box").length >= 2)) {
            var color_index = $("#boxes_container .a-box").length + 1;
            $("#boxes_container").append('<div class="a-box" style="background-color:'+colors_palette[color_index]+'">'+input_box_val+'<div class="del-btn">X</div></div>');
          }

          if ($("#boxes_container .a-box").length == 2) {
            $("#boxes_container").append('<div class="a-box auto" style="background-color:'+colors_palette[12]+'">Both</div>');
          }
        }

        $(".del-btn").on( "click", function () {
          $(this).parent().remove();
          if ($(".a-box.auto").length ) {
            $(".a-box.auto").remove();
          }
        });
      }

      $("#add_btn").on( "click", add_btn_onclick);
    }

    function main_input_autocomplete() {
      var arr = autocomplete_list;
      /*the autocomplete function takes two arguments,
      the text field element and an array of possible autocompleted values:*/
      var currentFocus;
      /*execute a function when someone writes in the text field:*/
      inp.addEventListener("input", function(e) {
          var a, b, i, val = this.value;
          /*close any already open lists of autocompleted values*/
          closeAllLists();
          if (!val) { return false;}
          currentFocus = -1;
          /*create a DIV element that will contain the items (values):*/
          a = document.createElement("DIV");
          a.setAttribute("id", this.id + "autocomplete-list");
          a.setAttribute("class", "autocomplete-items");
          /*append the DIV element as a child of the autocomplete container:*/
          //this.parentNode.appendChild(a);
          document.getElementById("main_input_container").appendChild(a);

          /*for each item in the array...*/
          for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
              /*create a DIV element for each matching element:*/
              b = document.createElement("DIV");
              /*make the matching letters bold:*/
              b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
              b.innerHTML += arr[i].substr(val.length);
              /*insert a input field that will hold the current array item's value:*/
              b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
              /*execute a function when someone clicks on the item value (DIV element):*/
                  b.addEventListener("click", function(e) {
                  /*insert the value for the autocomplete text field:*/
                  inp.value = this.getElementsByTagName("input")[0].value;
                  /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
                  closeAllLists();
              });
              a.appendChild(b);
            }
          }
      });
      /*execute a function presses a key on the keyboard:*/
      inp.addEventListener("keydown", function(e) {
          var x = document.getElementById(this.id + "autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
          }
      });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
    }

  }

}
