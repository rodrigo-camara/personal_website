document.addEventListener('DOMContentLoaded', function () {
  fetch('./awards.csv')
    .then(response => response.text())
    .then(data => {
      const awards = parseCSV(data);
      displayConferences(awards);
    })
    .catch(error => console.error('Error fetching CSV:', error));
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const awards = [];

  for (let i = 1; i < lines.length; i++) {
    const [id, conference, venue, prize, location, season, year] = lines[i].split(';');
    awards.push({ id, conference, venue, prize, location, season, year});
  }

  return awards;
}

function displayConferences(awards) {
  const awardsDiv = document.getElementById('list_awards');

  if (awardsDiv) {
    const ol = document.createElement('ol');

    awards.forEach(award => {
      // creating list element
      const li = document.createElement('li');
      // creating div element for list
      const div = document.createElement('div');
      div.className = 'div_list_element'; // specifying class helps with styling

      // creating div element for name of award
      const div_title = document.createElement('div');
      div_title.className = 'div_list_element_title';
      const p_title = document.createElement('p');
      p_title.textContent = `${award.id}`;
      div_title.appendChild(p_title);
      div.appendChild(div_title);

      // creating div element for prize
      const div_prize = document.createElement('div');
      div_prize.className = 'div_list_element_prize';
      const p_prize = document.createElement('p');
      // bold sign for prize
      const bold_prize = document.createElement('b');
      bold_prize.textContent = "Prize: ";
      p_prize.appendChild(bold_prize);
      p_prize.innerHTML += `${award.prize}`;
      div_prize.appendChild(p_prize);
      div.appendChild(div_prize);

      // creating div element for conference
      const div_conference = document.createElement('div');
      div_conference.className = 'div_list_element_conference';
      const p_conference = document.createElement('p');
      // bold sign for conference
      const bold_conference = document.createElement('b');
      bold_conference.textContent = "Conference: ";
      p_conference.appendChild(bold_conference);
      p_conference.innerHTML += `${award.conference}`;
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
      p_venue.innerHTML += `${award.venue}`;
      div_venue.appendChild(p_venue);
      div.appendChild(div_venue);

      // creating div element for rest of talk info
      const div_other_info_spacetime = document.createElement('div');
      div_other_info_spacetime.className = 'div_list_element_info_spacetime';
      const p_info = document.createElement('p');
      p_info.textContent = `${award.location}, ${award.season} ${award.year}`;
      div_other_info_spacetime.appendChild(p_info);
      div.appendChild(div_other_info_spacetime);

      li.appendChild(div);
      ol.appendChild(li);

    });

    awardsDiv.appendChild(ol);
  } else {
    console.error('Div with id "list_awards" not found.');
  }
}