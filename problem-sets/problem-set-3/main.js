const eventsListContainer = document.querySelector('#thumbnails');
const titleContainer = document.querySelector('#selected-title');
const imgContainer = document.querySelector('#selected-image');
const dateContainer = document.querySelector('#selected-date');
const descContainer = document.querySelector('#selected-description');
let timerID = false;
const timeout = 10000; // time after which rotation should happen
let data = [];

const eventsList = getUMEventsWithImages((data) => {
    data.forEach((UMEvent, index) => {
        const img = document.createElement('img');
        img.classList.add('image');
        img.setAttribute('id', `image${index}`);
        img.src = UMEvent.styled_images.event_thumb;
        img.alt = UMEvent.title;
        if (index === 0) {
            img.classList.add('selected')
            renderpage(UMEvent);
        }

        eventsListContainer.appendChild(img);

        img.addEventListener('click', () => {
            const images = document.querySelectorAll('.image');
            images.forEach((image) => {
                image.classList.remove('selected');
            });
            img.classList.add('selected');
            renderpage(data[index]);
            clearTimeout(timerID);
            timerID = setTimeout(() => {
                rotateCarousel(data);
            }, timeout);
        });
    });
    clearTimeout(timerID);
    timerID = setTimeout(() => {
        rotateCarousel(data);
    }, timeout);
});

function rotateCarousel(data) {
    const images = document.querySelectorAll('.image');
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (image.classList.contains('selected')) {
            currSelected = i;
            image.classList.remove('selected');
            let nextSelected = (currSelected + 1) % images.length;
            document.querySelector(`#image${nextSelected}`).classList.add('selected');
            renderpage(data[nextSelected]);
            if (timerID) { clearTimeout(timerID); }
            timerID = setTimeout(() => {
                rotateCarousel(data);
            }, timeout);
            break; // Exit the loop once the currently selected image is found
        }
    }
}

function renderpage(UMEvent) {
    titleContainer.innerText = UMEvent.event_title;
    titleContainer.setAttribute('href', UMEvent.permalink);
    imgContainer.setAttribute('src', UMEvent.image_url);
    dateContainer.innerText = getReadableTime(UMEvent.datetime_start);
    descContainer.innerText = UMEvent.description;
};