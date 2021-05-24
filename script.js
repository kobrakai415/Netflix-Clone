const toggleMuteButton = () => {
    const mute = document.getElementById("mute")
    const unMute = document.getElementById("un-mute")
    
    unMute.classList.toggle("d-none")
     mute.classList.toggle("d-none")
 }

window.onload = () => {
    let parent = document.getElementById("parent")

    setTimeout(function () {
        document.getElementById("banner").classList.remove("img-fluid", "w-100", "banner-opacity")
        parent.classList.add("video-wrapper")
        onYouTubeIframeAPIReady()
    }, 2000)

    // function to load trailer iframe

    function onYouTubeIframeAPIReady() {
        let player = null;
        player = new YT.Player('banner', {
            videoId: 'p_PJbmrX4uk', // YouTube Video ID
            width: 1800,               // Player width (in px)
            height: 800,              // Player height (in px)
            playerVars: {
                autoplay: 1,        // Auto-play the video on load
                controls: 0,        // hide pause/play buttons in player
                showinfo: 0,        // Hide the video title
                modestbranding: 1,  // Hide the Youtube Logo
                loop: 1,            // Run the video in a loop
                fs: 0,              // Hide the full screen button
                cc_load_policy: 0, // Hide closed captions
                iv_load_policy: 3,  // Hide the Video Annotations
                autohide: 0,         // Hide video controls when playing
                playerVars: { rels: 0 },
                events: {
                    'onReady': onPlayerReady   // force play incase browser prevents
                  }
            }
        });

        function onPlayerReady(event) {
            event.target.playVideo();
        }

        function toggleSound() {
            if (player.isMuted()) {
                player.unMute()
            } else {
                player.mute()
            }
        }

        document.getElementById("mute-buttons").addEventListener('click', toggleSound);
    }

    // loading and populating films 

    const genreArray = [{ genreCode: 28, genreName: "Action" }, { genreCode: 35, genreName: "Comedy" }, { genreCode: 18, genreName: "Drama" }, { genreCode: 878, genreName: "Science Fiction" }]

    genreArray.forEach(async (genre) => {

        await displayMovies(genre)

    })

}


const apiKey = "06749b45454775d74e6ecb748ff27029"

// api fetching films

const getMovies = async (genre) => {
    try {
        let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=06749b45454775d74e6ecb748ff27029&with_genres=${genre.genreCode}`)
        let data = await response.json()
        return data.results
    }
    catch (error) {
        console.log(error)
    }
}

// display movies 

const displayMovies = async (genre) => {
    films = await getMovies(genre)
    console.log(films)

    let mainContent = document.getElementById("main")

    mainContent.innerHTML += `<div  class="mt-5 px-5 container-fluid"> <h3>${genre.genreName}</h3> <div id="${genre.genreName}" class="d-flex"> </div>   </div>`

    genreRow = document.getElementById(`${genre.genreName}`)
    genreRow.style.overflowX = "scroll"

    films.forEach(film => {

        let filmCard = `<div id="pop-out" onClick="popout()" class="col-xs-3 p-1 shadow-lg img-wrapper"> <img  width="225" src="https://image.tmdb.org/t/p/original/${film.poster_path}" /> 
        <div id="hidden" class="d-none" style="background-color: black;">

        <div class="d-flex justify-content-between mt-3">
            <div>
                <img width="25px"
                    src="https://img.icons8.com/material-sharp/48/ffffff/play-button-circled--v4.png" />
                <img width="25px"
                    src="https://img.icons8.com/material-outlined/48/ffffff/plus--v2.png" />
                <img width="25px"
                    src="https://img.icons8.com/ios/50/ffffff/good-quality.png" />
                <img width="25px"
                    src="https://img.icons8.com/ios/50/ffffff/poor-quality.png" />
            </div>
            <div>
                <img width="25px"
                    style="border: 2px solid white; border-radius: 50%;"
                    src="https://img.icons8.com/material-outlined/48/ffffff/expand-arrow--v1.png" />
            </div>
        </div>
        <div class="d-flex align-items-center mt-2">
            <h6 style="color: rgb(6, 231, 6);" class="m-0">98% Match</h6>
            <img class="pl-2" width="35px"
                src="https://img.icons8.com/color/64/000000/18-plus.png" />
            <span class="pl-2">5 Seasons</span>
            <img class="pl-2"
                src="https://img.icons8.com/material-outlined/24/ffffff/hd.png" />
        </div>
        <div class="my-2 d-flex">
            <span>Violent</span>
            <span class="px-2">·</span>
            <span>Period Piece</span>
            <span class="px-2">·</span>
            <span> Drama</span>
        </div>
    </div>
</div>
</div>
`
        genreRow.innerHTML += filmCard
    });

}


// navbar scroll animation
window.addEventListener("scroll", function () {
    let nav = document.getElementById("navbar")
    nav.classList.toggle("sticky", window.scrollY > 1)
})

// replace trailer with image
window.addEventListener("scroll", function () {
    let vid = document.getElementById("banner")
    let parent = document.getElementById("parent")
    if (window.scrollY > 10) {
        vid.outerHTML = `<img id="banner" class="w-100 img-fluid banner-opacity" src="./assets/banner3.webp" alt="">`
        parent.classList.remove("video-wrapper")
    }
})

// film card popout animation
const popout = () => {
    console.log("hello")
    let img = document.getElementById("hidden")
    img.classList.toggle("d-none")
}

const popin = () => {
    let img = document.getElementById("hidden")
    img.classList.toggle("d-none")
}

document.getElementById("pop-out").addEventListener("click", popout)
document.getElementById("pop-out").addEventListener("mouseout", popin)

