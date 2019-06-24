const showSpoiler = "Show answer"
const hideSpoiler = "Hide answer"

function createSpoilerCover(spoiler) {
	spoilerCover = document.createElement("a")
	spoilerCover.href = "javascript:void(0)"
	spoilerCover.className = "btn btn--inverse"
	spoilerCover.innerHTML = showSpoiler
	spoilerCover.style.marginBottom = "25px"

	spoilerCover.onclick = function() {
		spoiler.classList.toggle("hidden")
		toggleSpoilerCover(this)
	}

	return spoilerCover
}

function toggleSpoilerCover(element) {
	element.classList.toggle("btn--warning")
	element.classList.toggle("btn--inverse")

	if (element.className.match(/\bbtn--inverse\b/) != null) {
		element.innerHTML = showSpoiler
	} else {
		element.innerHTML = hideSpoiler
	}
}

spoilers = document.getElementsByClassName("spoiler")

for (var i = 0; i < spoilers.length; i++) {
	spoilers.item(i).insertAdjacentElement("beforebegin", createSpoilerCover(spoilers.item(i)))
	spoilers.item(i).classList.add("hidden")
}
