var images = ['https://images.unsplash.com/photo-1610624764045-5255643109c6?q=80&amp;w=1470&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'];

var currentIndex = 0;
var totalClicks = 0;

function randomizeImage() {
  let root = document.documentElement;
  root.style.setProperty('--image', 'url(' + images[currentIndex] + ')');
  currentIndex++;
  if (currentIndex &gt;= images.length) {
    currentIndex = 0;
  }
  var puzzleItems = document.querySelectorAll('#puzz i');
  for (var i = 0; i &lt; puzzleItems.length; i++) {
    puzzleItems[i].style.left = Math.random() * (window.innerWidth - 100) + &#039;px&#039;;
    puzzleItems[i].style.top = Math.random() * (window.innerHeight - 100) + &#039;px&#039;;
  }
}

randomizeImage();

function reloadPuzzle() {
  var doneItems = document.querySelectorAll(&#039;.done&#039;);
  doneItems.forEach(function (element) {
    element.classList.toggle(&#039;done&#039;);
  });
  var droppedItems = document.querySelectorAll(&#039;.dropped&#039;);
  droppedItems.forEach(function (element) {
    element.classList.toggle(&#039;dropped&#039;);
  });
  var allDoneElement = document.querySelector(&#039;.allDone&#039;);
  allDoneElement.style = &#039;&#039;;
  allDoneElement.classList.toggle(&#039;allDone&#039;);
}

// mobile functionality
var puzzleItemsMobile = document.querySelectorAll(&#039;#puzz i&#039;);
puzzleItemsMobile.forEach(function (element) {
  element.addEventListener(&#039;mousedown&#039;, function () {
    totalClicks++;
    document.querySelector(&#039;#clicks&#039;).innerHTML = totalClicks;
  });
  element.addEventListener(&#039;click&#039;, function () {
    if (document.querySelector(&#039;.clicked&#039;)) {
      document.querySelector(&#039;.clicked&#039;).classList.toggle(&#039;clicked&#039;);
      element.classList.toggle(&#039;clicked&#039;);
    } else {
      element.classList.toggle(&#039;clicked&#039;);
    }
  });
});

var puzzleItemsDesktop = document.querySelectorAll(&#039;#puz i&#039;);
puzzleItemsDesktop.forEach(function (element) {
  element.addEventListener(&#039;click&#039;, function () {
    if (document.querySelector(&#039;.clicked&#039;)) {
      var clickedElement = document.querySelector(&#039;.clicked&#039;);
      if (clickedElement.classList.contains(element.classList)) {
        element.classList.add(&#039;dropped&#039;);
        clickedElement.classList.add(&#039;done&#039;);
        clickedElement.classList.toggle(&#039;clicked&#039;);

        if (document.querySelectorAll(&#039;.dropped&#039;).length == 9) {
          document.querySelector(&#039;#puz&#039;).classList.add(&#039;allDone&#039;);
          document.querySelector(&#039;#puz&#039;).style.border = &#039;none&#039;;
          document.querySelector(&#039;#puz&#039;).style.animation = &#039;allDone 1s linear forwards&#039;;

          setTimeout(function () {
            reloadPuzzle();
            randomizeImage();
          }, 1500);
        }
      }
    }
  });
});

// desktop drag and drop
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData(&quot;text&quot;, ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData(&quot;text&quot;);

  if (ev.target.className == data) {
    ev.target.classList.add(&#039;dropped&#039;);
    document.querySelector(&#039;.&#039; + data + &quot;[draggable=&#039;true&#039;]&quot;).classList.add(&#039;done&#039;);

    if (document.querySelectorAll(&#039;.dropped&#039;).length == 9) {
      document.querySelector(&#039;#puz&#039;).classList.add(&#039;allDone&#039;);
      document.querySelector(&#039;#puz&#039;).style.border = &#039;none&#039;;
      document.querySelector(&#039;#puz&#039;).style.animation = &#039;allDone 1s linear forwards&#039;;

      setTimeout(function () {
        reloadPuzzle();
        randomizeImage();
      }, 1500);
    }
  }
}