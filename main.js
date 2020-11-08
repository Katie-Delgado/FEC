(function () {
	  // VARIABLES
	  const IMAGE_COUNT = 50;
	  const PAGINATE_BY = 10;
	

	  const challengeImgChoicesList = document.querySelector('#challengeImgChoicesList');
	  const thumbnailContainerElement = document.querySelector(
	    '#thumbnailContainerElement'
	  );
	  const challengeImgChoiceInput = document.querySelector('#challengeImgChoiceInput');
	  const paginationElement = document.querySelector('#paginationElement');
	  const imageModal = document.querySelector('#imageModal');
	  const imageModalDisplay = document.querySelector('#imageModalDisplay');
	

	  // API FUNCTIONS
	

	  async function getChallengeImgChoices() {
	    // CANDIDATE ACTION: Update API call with chosen topic URL
	    // Returns all images in candidate-specified list
	    let response = await fetch('https://www.google.com');
	    let challengeChoices = await response.json();
	    return Object.keys(challengeChoices.message);
	  }
	

	  async function getChoiceImages(challengeChoice, count) {
	    // CANDIDATE ACTION: Update API call with chosen topic URL
	    // Returns a maximum count images in candidate-specified topic list
	    let response = await fetch(
	      `http://www.google.com/search?q=${challengeChoice}&tbm=isch&num=${count}`
	    );
	    let images = await response.json();
	    return images.message;
	  }
	

	  // FUNCTIONS

	  async function setupChallengeImgChoiceOptions() {
	    const challengeChoices = await getChallengeImgChoices();
	    // Calls API for candidate-specified topic list
	    // Populates challenge choices into datalist for users to select from
	    for (const challengeChoices of challengeChoice) {
	      const optionElement = document.createElement('option');
	      optionElement.setAttribute('value', challengeChoice);
	      challengeImgChoicesList.appendChild(optionElement);
	    }
	  }
	

	  function populateThumbnails(images, start) {
	    thumbnailContainerElement.innerHTML = '';
	

	    for (const image of images.slice(start, start + PAGINATE_BY)) {
	      const imageElement = document.createElement('div');
	      imageElement.innerHTML = `<img src=${image}>`;
	      thumbnailContainerElement.appendChild(imageElement);
	      imageElement.addEventListener('click', function () {
	        displayModal(image);
	      });
	    }
	  }
	

	  async function changeSelectedChoice(challengeChoice) {
	    const images = await getChoiceImages(challengeChoice, IMAGE_COUNT);
	

	    paginationElement.innerHTML = '';
	

	    for (let pageNumber = 0; pageNumber < images.length / 10; pageNumber += 1) {
	      const pageNumberElement = document.createElement('button');
	      if (pageNumber === 0) {
	        pageNumberElement.classList.add('active');
	      }
	      pageNumberElement.innerHTML = `${pageNumber + 1}`;
	      pageNumberElement.addEventListener('click', function (event) {
	        let oldActivePage = document.querySelector(
	          '#paginationElement button.active'
	        );
	        if (oldActivePage) {
	          oldActivePage.classList.remove('active');
	        }
	        event.target.classList.add('active');
	        populateThumbnails(images, pageNumber * 10);
	      });
	      paginationElement.appendChild(pageNumberElement);
	    }
	    populateThumbnails(images, 0);
	  }
	

	  function displayModal(image) {
	    // Sets the src to the image URL that was passed and makes it visible
	    imageModalDisplay.setAttribute('src', image);
	    imageModal.style.visibility = 'visible';
	  }
	

	  function hideModal() {
	    // returns modal to default view
	    imageModal.style.visibility = 'hidden';
	  }
	

	  // EVENT HANDLERS
	

	  function onChallengeImgChoiceSelected(event) {
	    const challengeChoice = event.target.value;
	    changeSelectedChoice(challengeChoice);
	  }
	

	  // INIT

	  function init() {
	    setupChallengeImgChoiceOptions();

	    challengeImgChoiceInput.addEventListener('change', onChallengeImgChoiceSelected);
	    imageModal.addEventListener('click', hideModal);
	  }
	
	  init();
	})();
