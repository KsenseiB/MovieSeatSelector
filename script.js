// query selector selects only one element and  since we have a few it will grab the 1st.
const container = document.querySelector('.container');



// we want only the available seats in the row
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// the diff between these is that ALL puts them into a 'node list' as if it were an array. diff between nodeList and array 
// https://attacomsian.com/blog/javascript-nodelist-vs-array



const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
// we want the inintial selected ticket price, the above ^ will give the actual element. 

populateUI();

//we want it as a number and not a string("movieSelect.value" == string).one way is to pstseInt(), another is to just +
// when used CONST "const ticketPrice" it threw an error because we are directly re-assigning ticketPrice later. need to use LET
let ticketPrice = +movieSelect.value;


// save selected movie index
function setMovieData(movieIndex, moviePrice)
{
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);

}


// UPDATE TOTAL AND COUNT
function updateSelectedCount()
{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //make an array out of the seats nodeList and iterate them
    const seatsIndex = [ ...selectedSeats ].map((seat) => [ ...seats ].indexOf(seat));

    // local storage is built-in js
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    // checks how many seats have been chosen
    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage and populate UI
function populateUI()
{
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) =>
        {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


// MOVIE SELECT EVENT
movieSelect.addEventListener('change', e =>
{
    ticketPrice = +e.target.value;
    // selectedIndex built in js gives out the index of an item:
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});




// SEAT CLICK EVENT
// to change the class of a selected seat one wey to do that is to loop over the seats array (querySelectorAll made it a node list) and add an event listener on each seat but a better wy is to add the event listener to the container.
// .contains() is a method. e.target gives the exact element that's been clicked inside the containet == other elements in it as well like the screen. console.log(e.target) to see
container.addEventListener('click', e =>
{
    if (e.target.classList.contains('seat')
        && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});

// Initial count and total set
updateSelectedCount();