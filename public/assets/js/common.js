$(document).ready(function () {
  $(function () { objectFitImages(); });
  $(".animsition-overlay").animsition({
    inClass: 'overlay-slide-in-top',
    outClass: 'overlay-slide-out-top',
    inDuration: 600,
    outDuration: 200,
    linkElement: '.animsition-link',
    loading: true,
    loadingParentElement: 'body',
    loadingClass: 'animsition-loading',
    loadingInner: '',
    timeout: false,
    timeoutCountdown: 100,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    overlay: true,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body',
    transition: function (url) { window.location.href = url; }
  });
});


var count = 0;
function populate() {
  if (quiz.questions != "") {
    quess = quiz.getQuestionIndex();
    qz = quess.text;
    chs = quess.choices;
    ans = quess.answer;
    console.log(count);
  } else if (quiz.questions == "") {
    showScores();
  }

  if (quiz.isEnded()) {
    showScores();
  }

  if (count == 5 || count == 10 || count == 14) {
    showStop();
  }

  if (count == 15) {
    showScores();
  }

  else {
    count += 1;
    if ($(".option").hasClass("active")) {
      $(".option").removeClass("active");
    }
    // show question
    var element = document.getElementById("question");
    element.innerHTML = qz;
    function time() {
      var timeleft, time;
      timeleft = time = 15;
      $("#time").html(timeleft);
      $("#time").fadeTo("slow", 1);
      var i = 0;
      remainingtime = setInterval(function () {
        $("#time").html(timeleft);
        timeleft -= 1;
        i += 1;
        if (timeleft <= 0 && i >= time) {
          clearInterval(remainingtime);
          $("#time").html("Time Out!");
        }
      }, 1000);
    }

    // setTimeout(time, 5000)

    // show options
    for (var i = 0; i < chs.length; i++) {
      var element = document.getElementById("choice" + i);
      element.innerHTML = chs[i];
      guess("btn" + i, chs[i]);
      $(".show").removeClass("active");
      document.getElementById("money").style.display = "none";
      document.getElementById("btn0").style.animation = "none";
      document.getElementById("btn1").style.animation = "none";
      document.getElementById("btn2").style.animation = "none";
      document.getElementById("btn3").style.animation = "none";
      document.getElementById("btn0").style.display = "block";
      document.getElementById("btn1").style.display = "block";
      document.getElementById("btn2").style.display = "block";
      document.getElementById("btn3").style.display = "block";
    }
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  var answer = ans;
  button.onclick = function () {
    if ($(".option").hasClass("active")) {
      $(".option").removeClass("active");
    }
    $(this).toggleClass("active");
    quiz.guess(guess);
    setTimeout(populate, 5000)
    if (button.childNodes[1].innerText == answer) {
      document.getElementById(button.id).style.animation = "color-animation 0.2s infinite linear alternate";
      var audio = document.getElementById("correct");
      audio.play();
      document.getElementById("money").style.display = "block";
      $(".show").addClass("active");
      $(".moneyList .moneyList__item").removeClass("active");
      showProgress();
      if (quiz.questions != "") {
        removedIndx = quiz.questions.indexOf(quess);
        while (removedIndx > -1) {
          quiz.questions.splice(removedIndx, 1);
          removedIndx = quiz.questions.indexOf(quess);
        }
        console.log(quess);
        console.log(quiz.questions);
      } else {

      }
    } else {
      document.getElementById("myModal").style.display = "flex";
      var audio = document.getElementById("wrong");
      audio.play();
    }
  }
  // $(".hideQues").click(function () {
  //   var $ele = $('.option');
  //   var hide = "";
  //   var answer = ans;
  //   btn0 = document.getElementById("btn0");
  //   btn1 = document.getElementById("btn1");
  //   btn2 = document.getElementById("btn2");
  //   btn3 = document.getElementById("btn3");
  //   if (answer == btn0.childNodes[1].innerText || answer == btn1.childNodes[1].innerText) {
  //     hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2)) + 2).attr('id');
  //     document.getElementById(hide).style.display = "none";
  //   } else if (answer == btn2.childNodes[1].innerText || answer == btn3.childNodes[1].innerText) {
  //     hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2))).attr('id');
  //     document.getElementById(hide).style.display = "none";
  //   }
  // });
};



function showProgress() {
  var currentQuestionNumber = quiz.questionIndex;
  var element = document.getElementById(currentQuestionNumber);
  element.classList.add("active");
};

function showScores() {
  document.getElementById("modal1").style.display = "flex";
  var audio = document.getElementById("end");
  audio.play();
};

function showStop() {
  document.getElementById("modal2").style.display = "flex";
  var audio = document.getElementById("end");
  audio.play();
};
$('#closemodal').click(function () {
  setTimeout(function () {
    document.getElementById("modal2").style.display = "none";
    $(".animsition-overlay-slide").removeClass("overlay-slide-out-top");
    $(".animsition-overlay-slide").addClass("overlay-slide-in-top");
  }, 1000);
});

// create questions
var questions = [
  new Question("BinhDev t??n th???t l?? g???", ["Ph???m V??n B??nh", "L?? V??n B??nh", "Nguy???n V??n B??nh", "Ng?? B??nh"], "Nguy???n V??n B??nh"),
  new Question("BinhDev sinh n??m bao nhi??u?", ["27/10/1997", "22/10/1997", "02/07/1997", "10/02/1997"], "27/10/1997"),
  new Question("C??ng Vi???c ch??nh c???a BinhDev l?? g???", ["Developer", "Youtuber", "Singer", "freelancer"], "Developer"),
  new Question('Nh??n v???t ch??? D???u trong t??c ph???m "T???t ????n" c???a Ng?? T???t T??? c?? t??n th???t l?? g???', ["L?? Th??? ????o", "L?? Th??? Mai", "L?? Th??? Xu??n", "L?? Th??? Lan"], "L?? Th??? ????o"),
  new Question('Theo m???t c??u h??t th??: "Ba th????ng con v?? con gi???ng m???. M??? th????ng con th?? con gi???ng ..." ai?', ["??ng h??ng x??m", "Ch?? c???nh nh??", "Ba", "B??c ?????u ng??"], "Ba"),
  new Question('B???y ch?? l??n trong truy???n c??? t??ch "N??ng B???ch Tuy???t v?? b???y ch?? l??n" l??m ngh??? g???', ["Th??? r??n", "Th??? m???", "Th??? s??n", "Th??? may"], "Th??? m???"),
  new Question('????u l?? t??n 1 lo???i m???', ["L?????i h??i", "L?????i trai", "L?????i l??", "L?????i r???n"], "L?????i trai"),
  new Question('????u l?? t??n m???t lo???i b??nh Hu????', ["Kho??i", "S?????ng", "Th??ch", "Vui"], "Kho??i"),
  new Question('Nh???c s?? n??o l?? ng?????i s??ng t??c ca kh??c "C??y ????n sinh vi??n"?', ["B???o Ch???n", "Tr???nh C??ng S??n", "Qu???c An", "Tr???n Ti???n"], "Qu???c An"),
  new Question('Th??nh vi??n ?????u ti??n gia nh???p v??o b??ng h???i t???c M?? R??m l?? ai?', ["Zoro", "Nami", "Sanji", "Usopp"], "Zoro"),
  new Question('T??n ti???ng Nh???t c???a b??ng h???i t???c m?? r??m l?? g???', ["Mugshiwara", "Muguwara", "Mugiwara", "Moguwari"], "Mugiwara"),
  new Question('T??c gi??? c???a truy???n Vua H???i T???c l?? ai?', ["Eiichiro Oda", "Masashi Kishimoto", "Yoshihiro Togashi", "Rumiko Takahashi"], "Eiichiro Oda"),
  new Question('C?? 1 ??ng ??i s??n, ???ng ??i v??o 3 c??i hang. Hang 1 ??ng ???y g???p m???t con ma, hang 2 ??ng g???p tr??i c??, hang 3 ??ng g???p m???t con r???ng. H???i hang th??? t?? ??ng g???p con g???', ["C????ng thi", "Ma c?? t??ng", "Ma c?? r???ng", "Ai bi???t!"], "Ai bi???t!"),
  new Question('C?? c??ch n??o x???p 5 que di??m th??nh 11 h??nh tam gi??c kh??ng?', ["X???p ???????c", "Kh??ng x???p ???????c", "B??? nh??? que di??m ra", "X???p ???????c c?? 1 h??nh"], "X???p ???????c"),
  new Question('N???m gi???a Th??i B??nh D????ng l?? g???', ["N?????c", "C??", "B??nh", "Ai bi???t"], "B??nh"),
  new Question('1 ng?????i ??i v??o r???p chi???u phim g???p 1 con h??? ch???t, h???i t???i sao ng?????i ???? quay v????', ["S??? h??i khi nh??n th???y x??c con h???", "M???t v??", "Qu??n ????? ??? nh??", "H???t ch???"], "H???t ch???"),
  new Question('C?? m???t ng?????i ????n b?? n??? ??inh ??i mua m??o v??? nu??i. B???ng nh??n th???y c??i b??n h??nh tr??n, b?? quay v??o trong nh??. B?? ???? bi???t tr?????c ???????c ??i???u g???', ["??? ????y kh??ng b??n m??o", "B?? kh??ng h???p v???i m??o", "B?? kh??ng th??? ?????n c???a h??ng mua m??o", "B?? b???n b??ng b??n v??o nh??"], "??? ????y kh??ng b??n m??o"),
  new Question('Con g?? b??? c??i ??u??i th??nh con ng???a?', ["Con m??o", "Con h???", "Con b??", "Con Kh???"], "Con m??o"),
  new Question('C??i g?? ch???a nhi???u n?????c nh???t m?? ko ?????t t?? ti n??o?', ["Gi???ng n?????c", "C??i b??t", "B???n ?????", "????m m??y"], "B???n ?????"),
  new Question('C??i g?? khi x??i th?? qu??ng ??i, kh??ng x??i th?? l???y l???i?', ["Ti???n", "C??i neo thuy???n", "B??ng chuy???n", "C???c ????"], "C??i neo thuy???n"),
];


// create quiz
quiz = new Quiz(questions);
// display quiz
populate();

$(".show").click(function () {
  $("#money").toggle("fast");
  $(this).toggleClass("active");
});

$(".menu__right .hideQues").click(function () {
  if ($(this).hasClass("delete")) {

  } else {
    youSure();
  }
});

$(".menu__right .callDue").click(function () {
  if ($(this).hasClass("delete")) {

  } else {
    callDue();
  }
});

$(".menu__right .choseViewer").click(function () {
  if ($(this).hasClass("delete")) {

  } else {
    choseViewer();
  }
});

function youSure() {
  document.getElementById("modal3").style.display = "flex";
  $("#sure").css("display", "inline-block");
  $("#call").css("display", "none");
  $("#viewer").css("display", "none");
}
function callDue() {
  document.getElementById("modal3").style.display = "flex";
  $("#sure").css("display", "none");
  $("#call").css("display", "inline-block");
  $("#viewer").css("display", "none");
}
function choseViewer() {
  document.getElementById("modal3").style.display = "flex";
  $("#sure").css("display", "none");
  $("#call").css("display", "none");
  $("#viewer").css("display", "inline-block");
}
$('#notSure').click(function () {
  setTimeout(function () {
    document.getElementById("modal3").style.display = "none";
    $(".animsition-overlay-slide").removeClass("overlay-slide-out-top");
    $(".animsition-overlay-slide").addClass("overlay-slide-in-top");
  }, 1000);
});
$('#sure').click(function () {
  actionBtn("hideQues");
  hideQuest();
});
$('#call').click(function () {
  actionBtn("callDue");
  var result = '';
  var sound = ["a", "b", "c", "d"];
  result = sound[Math.floor(Math.random() * sound.length)];
  setTimeout(function () {
    var audio = document.getElementById("answ" + result + "");
    audio.play();
  }, 2000);
});
$('#viewer').click(function () {
  actionBtn("choseViewer");
  setTimeout(function () {
    document.getElementById("modal4").style.display = "flex";
  }, 1000);
  var licount = $(".listAns .listAns__item .listAns__row").length;
  var randomnumber = Math.floor(Math.random() * (licount + 1));
  var randomnumber1 = Math.floor(Math.random() * (licount + 1));
  var randomnumber2 = Math.floor(Math.random() * (licount + 1));
  var randomnumber3 = Math.floor(Math.random() * (licount + 1));
  $(".listAns .listAns__item:nth-child(" + randomnumber + ") .listAns__row").addClass("r50");
  $(".listAns .listAns__item:nth-child(" + randomnumber1 + ") .listAns__row").addClass("r30");
  $(".listAns .listAns__item:nth-child(" + randomnumber2 + ") .listAns__row").addClass("r10");
  $(".listAns .listAns__item:nth-child(" + randomnumber3 + ") .listAns__row").addClass("r10");
  setTimeout(function () {
    document.getElementById("modal4").style.display = "none";
  }, 10000);
});

function actionBtn(txt) {
  $("." + txt).addClass("delete");
  $("." + txt).attr("disabled", "disabled");
  setTimeout(function () {
    document.getElementById("modal3").style.display = "none";
    $(".animsition-overlay-slide").removeClass("overlay-slide-out-top");
    $(".animsition-overlay-slide").addClass("overlay-slide-in-top");
  }, 1000);
}

function hideQuest() {
  var quess = quiz.getQuestionIndex();
  var chs = quess.choices;
  for (var i = 0; i < chs.length; i++) {
    var $ele = $('.option');
    var hide = "";
    var answer = ans;
    btn0 = document.getElementById("btn0");
    btn1 = document.getElementById("btn1");
    btn2 = document.getElementById("btn2");
    btn3 = document.getElementById("btn3");
    if (answer == btn0.childNodes[1].innerText || answer == btn1.childNodes[1].innerText) {
      hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2)) + 2).attr('id');
      document.getElementById(hide).style.display = "none";
    } else if (answer == btn2.childNodes[1].innerText || answer == btn3.childNodes[1].innerText) {
      hide = $ele.eq(Math.floor(Math.random() * ($ele.length - 2))).attr('id');
      document.getElementById(hide).style.display = "none";
    }
  }
};

function play() {
  var audio = document.getElementById("audio");
  audio.play();
}

$(document).keydown(function (event) {
  if (event.keyCode == 123) { // Prevent F12
    return false;
  } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
    return false;
  }
});
document.addEventListener('contextmenu', event => event.preventDefault());