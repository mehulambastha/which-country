const matchList = document.querySelector('#match-list');

//searching data.json and filter it
const searchBrand = async searchText => {
	const res = await fetch('data.json');
	const brands = await res.json();

	// get matches to current text input
	let matches = brands.filter(brand => {
		const regex = new RegExp('^' + searchText, 'gi');

		return brand.name.match(regex) || brand.category.match(regex);
	});

	if (searchText.length === 0) {
		matches = [];
		matchList.innerHTML = '';
	} else {
		outputHTML(matches);
	}
};

//Show HTML
const outputHTML = matches => {
	console.log(matches.length);
	if (matches.length > 0) {
		const html = matches
			.map(match => {
				if (match.country === 'foreign') {
					return `
            <div class="card card-body mb-4">
            <h5 class="text-capitalize"><span class="text-primary"><strong>${match.name}</strong></span> <span class="text-danger">(${match.country})</span></h5>
            <span><mark>category: ${match.category}</mark></span>
            </div>
          `;
				} else {
					return `
            <div class="card card-body mb-4">
            <h5 class="text-capitalize"><strong class="text-primary">${match.name}</strong> <span class="text-success">(${match.country}n)</span></h5>
            <span><mark>category: ${match.category}</mark></span>
            </div>
          `;
				}
			})
			.join('');
		matchList.innerHTML = html;
	} else {
		matchList.innerHTML = `
			<div class="card card-body mb-4">
      <h5 class="text-danger">Sorry, this brand does not exist in the database.</h5>
      <big class="text-warning">If you think this is a valid brand name, then please email me this brand name at <a href="mailto:mehul.213amb@gmail.com">mehul.213amb@gmail.com</a> and I will add it to the database.</big>
      </div>`;
	}
};

const search = document.querySelector('#search');

search.addEventListener('input', () => {
	searchBrand(search.value);
});
