function flickr_start(class_name) {
document.getElementById(class_name).style.opacity = "1";
}

function flickr_stop(class_name) {
document.getElementById(class_name).style.opacity = "0";
}

function generateTableRow(image1, image2, imageId, paperTitle, publisherDetailsLinks, description) {

return `
    <tr onmouseout="flickr_stop('${imageId}')" onmouseover="flickr_start('${imageId}')">
    <td style="padding:20px;vertical-align:middle">
        <div class="one">
        <div class="two" id='${imageId}' style="opacity:0">
            <img src=${image2} width="160" style="border-radius:5%">
        </div>
        <img src=${image1} width="160" style="border-radius:5%">
        </div>
    </td>
    <td style="padding:20px;vertical-align:middle;border-bottom:1px solid black">
        <div class="paper_title">
        <div class="paper_title_center">
        <papertitle>${paperTitle}</papertitle>
        <br>
        ${publisherDetailsLinks}
        </div>
        </div>
        <p></p>
        <div style="text-align: left">
        <div class="text_just">
            ${description}
        </div>
        </div>
    </td>
    </tr>`;
}


function scrollFunction() {
  var btnContainer = document.getElementById("navbar");
  var btns = btnContainer.getElementsByClassName("navbar");

  var research_location = document.getElementById('Research').getBoundingClientRect().top
  var proj_location = document.getElementById('Projects').getBoundingClientRect().top + window.scrollY - window.outerHeight/2
  var teaching_location = document.getElementById('Teaching').getBoundingClientRect().top + window.scrollY - window.outerHeight/2


  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    document.getElementById("navbar").style.padding = "16px 0px";
    //document.getElementById("logo").style.fontSize = "25px";

    if (document.body.scrollTop > research_location || document.documentElement.scrollTop > research_location) {
      btns[0].className = "navbar";
      btns[1].className = "navbar active";
      btns[2].className = "navbar";
      btns[3].className = "navbar";
    }

    if (document.body.scrollTop > proj_location || document.documentElement.scrollTop > proj_location) {
      btns[0].className = "navbar";
      btns[1].className = "navbar";
      btns[2].className = "navbar active";
      btns[3].className = "navbar";
    }
    if (document.body.scrollTop > teaching_location || document.documentElement.scrollTop > teaching_location) {
      btns[0].className = "navbar";
      btns[1].className = "navbar";
      btns[2].className = "navbar";
      btns[3].className = "navbar active";
    }

  }

  else {
    document.getElementById("navbar").style.padding = "22px 0px";
    // document.getElementById("logo").style.fontSize = "30px";
    btns[0].className = "navbar active";
    btns[1].className = "navbar";
    btns[2].className = "navbar";
    btns[3].className = "navbar";

  }
  }


//// Add active class to the current button (highlight it)
// var btnContainer = document.getElementById("navbar");
// var btns = btnContainer.getElementsByClassName("navbar");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function(){
//     var current = document.getElementsByClassName("active");
//     current[0].className = current[0].className.replace(" active", "");
//     this.className += " active";
//   });
// }