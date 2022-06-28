const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "266888fd04mshaa78cdeda0cd802p17fe90jsn6f49473e033a",
    "X-RapidAPI-Host": "genius.p.rapidapi.com",
  },
};

const input = document.getElementById("nameArtist");
const titleEl = document.getElementById("title");
const lyricsEl = document.getElementById("lyrics");
const dateEl = document.getElementById("date");
const imgEl = document.getElementById("thumnail-img");
const videoEl = document.getElementById("video");
const loaderEl = document.getElementById("loade");
const nextButtonEl = document.getElementById("next");
const backButtonEl = document.getElementById("back");
const musicCreatorEl = document.getElementById("musicMaker-img");


let i = 0;

function next() {
  i += 1;
  getSong();
  nextButtonEl.disabled = true;
  nextButtonEl.style.background = "grey";
  setTimeout(() => {
    nextButtonEl.disabled = false;
    nextButtonEl.style.background = `linear-gradient(-180deg, #00d775, #00bd68)`;
  }, 3300);
}

function back() {
  if (i !== 0) {
    i -= 1;
    getSong();

    backButtonEl.disabled = true;
    backButtonEl.style.background = `grey`;
    setTimeout(() => {
      backButtonEl.disabled = false;
      backButtonEl.style.background = `linear-gradient(-180deg, #00d775, #00bd68)`;
    }, 3300);
  } else {
    console.log("cananot go back");
  }
}

function getSong() {
  fetch(`https://genius.p.rapidapi.com/search?q=${input.value}`, options)
    .then((response) => response.json())
    .then((data) => {
      if (i !== data.response.hits[i].result.length) {
        console.log(data);
        musicCreatorEl.src =
          data.response.hits[i].result.primary_artist.image_url;

        findSongs(data.response.hits[i].result.id);
        nextButtonEl.style.display = "block";
        backButtonEl.style.display = "block";
      } else {
        console.log("end");
      }
    })
    .catch((error) => (titleEl.textContent = "Song not found"));
}

async function findSongs(id) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "266888fd04mshaa78cdeda0cd802p17fe90jsn6f49473e033a",
      "X-RapidAPI-Host": "genius.p.rapidapi.com",
    },
  };
  loaderEl.classList.add("loader");
  await fetch(`https://genius.p.rapidapi.com/songs/${id}`, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const {
        full_title: title,
        url: lyrics,
        release_date: date,
        song_art_image_url: img,
      } = data.response.song;

      try {
        var youtube = data.response.song.media[0].url;
        videoEl.innerHTML = `<div class = "video-conn"><a href = ${youtube} target="_blank">Video</a> <img class = "link-img" src = "link-icon.png"/></div>`;
      } catch (error) {
        console.log("hello");
        videoEl.innerHTML = `Video Not Found`;
      }

      console.log(youtube);
      console.log(title, lyrics, date, img);
      titleEl.textContent = title;
      lyricsEl.innerHTML = `<div class = "video-conn"> <a href = ${lyrics} target="_blank">Lyrics</a> <img class = "link-img" src = "link-icon.png"/></div>`;
      dateEl.innerHTML = `<p class = "date">release-date</p>: ${date}`;
      imgEl.src = img;

      if (date == null) {
        dateEl.textContent = "Date not found";
      }

      loaderEl.classList.remove("loader");
    })
    .catch((err) => console.error(err));
}
