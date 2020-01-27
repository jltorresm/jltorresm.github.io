/*******************************************************************************
 * Flashcard logic
 ******************************************************************************/
/**
 * Init the flashcard module.
 *
 * @param selector DOM selector for container of the flashcard.
 * @param lang Which language are we loading this time.
 */
function flashcards(selector, lang) {
	loadVocabulary(selector, lang).then(function (response) {
		handleWordSuccess(selector, response);
	}, handleWordFailure);
}

/**
 * Loads via AJAX the vocabulary of the specified language.
 *
 * @param selector DOM selector for container of the flashcard.
 * @param lang Which language are we loading this time.
 * @returns {Promise<json>}
 */
function loadVocabulary(selector, lang) {
	return new Promise(function (resolve, reject) {
		const wordFile = "/assets/words/" + lang + ".json";

		let req = new XMLHttpRequest();
		req.open("GET", wordFile, true);

		req.onreadystatechange = function () {
			if (req.readyState !== 4) {
				return;
			}

			if (req.status === 200) {
				resolve(req.responseText);
			}

			reject(req.responseText);
		};

		req.send();
	});
}

/**
 * Handles an error occurred when loading the vocabulary.
 *
 * @param response Response when trying to load the vocabulary.
 */
function handleWordFailure(response) {
	console.error(response);
}

/**
 * Handles the success when loading the vocabulary.
 *
 * @param selector DOM selector for container of the flashcard.
 * @param response Which language are we loading this time.
 */
function handleWordSuccess(selector, response) {
	// Parse response to get words
	let vocabulary = JSON.parse(response);

	// Randomize words in memory
	// TODO: randomize me

	// Select max 300 words, discard the rest
	vocabulary.words = vocabulary.words.slice(0, 300);

	// Render the first flashcard and bind the events to navigate the vocabulary
	renderFlashcard(selector, vocabulary, 0);
}

const flashcardTpl = `
<div class="arrow-prev" data-num="{{ prev }}"><i class="fas fa-arrow-left"></i></div>
<div class="card">
	<h1>{{ displayName }}</h1>
	<p class="meta">{{ meta }}</p>
	<p class="cta">{{ cta }}<i class="fas fa-eye"></i></p>
	<p class="definition hidden">{{ definition }}</p>
	<p class="extra-title{{ extraClass }}">{{ extraTitle }}<i class="fas fa-sort-amount-down-alt"></i></p>
	<ul class="extra-info hidden">{{ extraInfo }}</ul>
</div>
<div class="arrow-next" data-num="{{ next }}"><i class="fas fa-arrow-right"></i>
`;

/**
 * Renders in DOM the flashcard.
 *
 * @param selector DOM selector for container of the flashcard.
 * @param vocabulary List of words and metadata to render.
 * @param idx Which word to render.
 */
function renderFlashcard(selector, vocabulary, idx) {
	const word = vocabulary.words[idx];

	if (word === "undefined") {
		// TODO here handle error.
	}

	const $container = document.querySelector(selector);
	const prev = Math.max(0, parseInt(idx) - 1);
	const next = Math.min(vocabulary.words.length - 1, parseInt(idx) + 1);

	let meta = vocabulary.meta.types[word.type];
	if (typeof vocabulary.meta.genres[word.genre] !== "undefined") {
		meta += " - " + vocabulary.meta.genres[word.genre];
	}

	let extraTitle = "", extraInfo = "", extraClass = " hidden";
	if (word.conjugation !== null) {
		extraClass = "";
		extraTitle = vocabulary.meta.conjugation;
		extraInfo = word.conjugation.reduce(function (carry, item) {
			return carry + "<li>" + item + "</li>";
		}, "");
	}

	$container.innerHTML = flashcardTpl
		.replace("{{ prev }}", prev)
		.replace("{{ displayName }}", word.displayName)
		.replace("{{ meta }}", meta)
		.replace("{{ cta }}", vocabulary.meta.definition)
		.replace("{{ definition }}", word.definition)
		.replace("{{ extraClass }}", extraClass)
		.replace("{{ extraTitle }}", extraTitle)
		.replace("{{ extraInfo }}", extraInfo)
		.replace("{{ next }}", next)
	;

	setTimeout(function () {
		bindListeners(selector, vocabulary, $container);
	}, 300);
}

/**
 * Bind all listeners to handle interaction within the card.
 *
 * @param selector DOM selector for container of the flashcard.
 * @param vocabulary List of words and metadata to render.
 * @param $container DOM element container.
 */
function bindListeners(selector, vocabulary, $container) {
	// Bind arrow for prev
	$container.querySelector(".arrow-prev").onclick = function (e) {
		renderFlashcard(selector, vocabulary, this.getAttribute("data-num"));
	};

	// Bind arrow for next
	$container.querySelector(".arrow-next").onclick = function (e) {
		renderFlashcard(selector, vocabulary, this.getAttribute("data-num"));
	};

	// Bind definition reveal
	$container.querySelector(".cta").onclick = function (e) {
		$container.querySelector(".cta + .definition").classList.remove("hidden");
		this.classList.add("hidden");
	};

	// Bind extras reveal
	$container.querySelector(".extra-title").onclick = function (e) {
		const $element = $container.querySelector(".extra-title + .extra-info");
		if ($element.classList.contains("hidden")) {
			$element.classList.remove("hidden");
		} else {
			$element.classList.add("hidden");
		}
	};
}