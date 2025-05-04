let clickCount = 0;

const countryInput = document.getElementById('country');
const countryCodeInput = document.getElementById('countryCode');
const myForm = document.getElementById('form');
const modal = document.getElementById('form-feedback-modal');
const clicksInfo = document.getElementById('click-count');

function handleClick() {
    clickCount++;
    clicksInfo.innerText = clickCount;
}

// async function fetchAndFillCountries() {
//     try {
//         const response = await fetch('https://restcountries.com/v3.1/all');
//         if (!response.ok) {
//             throw new Error('Błąd pobierania danych');
//         }
//         const data = await response.json();
//         const countries = data.map(country => country.name.common);
//         countryInput.innerHTML = countries.map(country => `<option value="${country}">${country}</option>`).join('');
//     } catch (error) {
//         console.error('Wystąpił błąd:', error);
//     }
// }

function getCountryByIP() {
        fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const country = data.country;
            const city = data.city;

            const option = Array.from(countryInput.options)
                .find(opt => opt.value === country);
            if (option) option.selected = true;
            if (city) document.getElementById('city').value = city;
   


            getCountryCode(country);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera GeoJS:', error);
        });
}

function getCountryCode(countryName) {
    const apiUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        return response.json();
    })
    .then(data => {        
        const countryCode = data[0].idd.root + data[0].idd.suffixes.join("")
        countryCodeInput.innerHTML = `<option value="${countryCode}">${countryCode}</option>`;

    })
    .catch(error => {
        console.error('Wystąpił błąd:', error);
    });
}



function setVATSectionVisible(){
    const vatCheckbox = document.getElementById('vatUE');
    const vatSection = document.getElementById('vatSection');

    vatCheckbox.addEventListener('change', function() {
        if (this.checked) {
            vatSection.style.display = 'block';
        } else {
            vatSection.style.display = 'none';
        }
    });
}


let choicesInstance; // <- zmienna globalna dla kontrolowania Choices

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }
        const data = await response.json();
        const countries = data.map(country => country.name.common).sort();

        const countrySelect = document.getElementById('country');
        countrySelect.innerHTML = '<option value="">Wybierz kraj</option>'; // Reset selecta

        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countrySelect.appendChild(option);
        });

        // Usuwamy stare Choices, jeśli był już stworzony
        if (choicesInstance) {
            choicesInstance.destroy();
        }

        // Tworzymy nowe Choices
        choicesInstance = new Choices(countrySelect, {
            searchEnabled: true,    // szukanie włączone
            shouldSort: true,       // sortowanie opcji alfabetycznie
            placeholder: true,
            placeholderValue: 'Wybierz kraj',
            itemSelectText: '',     // brak napisu "Press to select"
            searchPlaceholderValue: 'Szukaj kraju...', // tekst w polu szukania
            removeItemButton: false, // nie pokazuj X do usuwania
        });

    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

// Wywołanie po załadowaniu strony
window.addEventListener('DOMContentLoaded', fetchAndFillCountries);



(() => {
    // nasłuchiwania na zdarzenie kliknięcia myszką
    document.addEventListener('click', handleClick);
    document.addEventListener('DOMContentLoaded', getCountryByIP)
    document.addEventListener('DOMContentLoaded', setVATSectionVisible)
    fetchAndFillCountries();
})()
