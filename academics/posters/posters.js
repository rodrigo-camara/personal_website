document.addEventListener('DOMContentLoaded', function () {
  fetch('./posters.csv')
    .then(response => response.text())
    .then(data => {
      const posters = parseCSV(data);
      displayPosters(posters);
    })
    .catch(error => console.error('Error fetching CSV:', error));
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const posters = [];

  for (let i = 1; i < lines.length; i++) {
    const [id, conference, venue, location, season, year, document] = lines[i].split(';');
    posters.push({ id, conference, venue, location, season, year, document });
  }

  return posters;
}

function displayPosters(posters) {
  const postersDiv = document.getElementById('list_posters');

  if (postersDiv) {
    const ol = document.createElement('ol');

    posters.forEach(poster => {
      // creating list element
      const li = document.createElement('li');
      // creating div element for list
      const div = document.createElement('div');
      div.className = 'div_list_element'; // specifying class helps with styling

      // creating div element for title of poster
      const div_title = document.createElement('div');
      div_title.className = 'div_list_element_title';
      const p_title = document.createElement('p');
      p_title.textContent = `${poster.id}`
      div_title.appendChild(p_title);
      div.appendChild(div_title);
      
      // creating div element for downloading document
      const div_download = document.createElement('div');
      div_download.className = 'div_list_element_download';
      const p_download = document.createElement('p');
      // bold and underlined sign for downloading
      const bold_download = document.createElement('b');
      bold_download.textContent = "Download:";
      p_download.appendChild(bold_download);
      div_download.appendChild(p_download);
      // image for download
      anchor_download = document.createElement('a');
      image_download = document.createElement('img');
      image_download.src = '../../icons/download_icon.png';
      image_download.alt = 'Download Poster';
      image_download.width = 19;
      anchor_download.appendChild(image_download);
      anchor_download.href = `./poster_documents/${poster.document}`;
      anchor_download.setAttribute('download', `${poster.document}`);
      div_download.append(anchor_download);

      div.appendChild(div_download);

      // creating div element for conference
      const div_conference = document.createElement('div');
      div_conference.className = 'div_list_element_conference';
      const p_conference = document.createElement('p');
      // bold sign for conference
      const bold_conference = document.createElement('b');
      bold_conference.textContent = "Conference: ";
      p_conference.appendChild(bold_conference);
      p_conference.innerHTML += `${poster.conference}`;
      div_conference.appendChild(p_conference);
      div.appendChild(div_conference);

      // creating div element for venue
      const div_venue = document.createElement('div');
      div_venue.className = 'div_list_element_venue';
      const p_venue = document.createElement('p');
      const bold_venue = document.createElement('b');
      // bold sign for venue
      bold_venue.textContent = "Venue: ";
      p_venue.appendChild(bold_venue);
      p_venue.innerHTML += `${poster.venue}`;
      div_venue.appendChild(p_venue);
      div.appendChild(div_venue);
      
      // creating div element for rest of talk info
      const div_other_info_spacetime = document.createElement('div');
      div_other_info_spacetime.className = 'div_list_element_info_spacetime';
      const p_info = document.createElement('p');
      p_info.textContent = `${poster.location}, ${poster.season} ${poster.year}`;
      div_other_info_spacetime.appendChild(p_info);
      div.appendChild(div_other_info_spacetime);

      li.appendChild(div);
      ol.appendChild(li);

    });

    postersDiv.appendChild(ol);
  } else {
    console.error('Div with id "list_talks" not found.');
  }
}