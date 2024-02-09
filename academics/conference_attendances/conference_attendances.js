document.addEventListener('DOMContentLoaded', function () {
  fetch('./conference_attendances.csv')
    .then(response => response.text())
    .then(data => {
      const conferences = parseCSV(data);
      displayConferences(conferences);
    })
    .catch(error => console.error('Error fetching CSV:', error));
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const conferences = [];

  for (let i = 1; i < lines.length; i++) {
    const [id, venue, location, season, year] = lines[i].split(';');
    conferences.push({ id, venue, location, season, year });
  }

  return conferences;
}

function displayConferences(conferences) {
  const conferencesDiv = document.getElementById('list_conferences');

  if (conferencesDiv) {
    const ol = document.createElement('ol');

    conferences.forEach(conference => {
      // creating list element
      const li = document.createElement('li');
      // creating div element for list
      const div = document.createElement('div');
      div.className = 'div_list_element'; // specifying class helps with styling

      // creating div element for name of conference
      const div_title = document.createElement('div');
      div_title.className = 'div_list_element_title';
      const p_title = document.createElement('p');
      p_title.textContent = `${conference.id}`;
      div_title.appendChild(p_title);
      div.appendChild(div_title);

      // creating div element for venue
      const div_venue = document.createElement('div');
      div_venue.className = 'div_list_element_venue';
      const p_venue = document.createElement('p');
      // creating bold text
      const bold_venue = document.createElement('b');
      bold_venue.textContent = 'Venue: ';
      p_venue.appendChild(bold_venue);
      p_venue.innerHTML += `${conference.venue}`;
      div_venue.appendChild(p_venue);
      div.appendChild(div_venue);
      
      // creating div element for rest of conference info
      const div_other_info = document.createElement('div');
      div_other_info.className = 'div_list_element_info_spacetime';
      const p_info = document.createElement('p');
      p_info.textContent = `${conference.location}, ${conference.season} ${conference.year}`;
      div_other_info.appendChild(p_info);
      div.appendChild(div_other_info);

      li.appendChild(div);
      ol.appendChild(li);

    });

    conferencesDiv.appendChild(ol);
  } else {
    console.error('Div with id "list_conferences" not found.');
  }
}