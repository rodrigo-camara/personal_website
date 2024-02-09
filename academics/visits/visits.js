document.addEventListener('DOMContentLoaded', function () {
  fetch('./visits.csv')
    .then(response => response.text())
    .then(data => {
      const visits = parseCSV(data);
      displayVisits(visits);
    })
    .catch(error => console.error('Error fetching CSV:', error));
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const visits = [];

  for (let i = 1; i < lines.length; i++) {
    const [id, location, duration] = lines[i].split(';');
    visits.push({id, location, duration});
  }

  return visits;
}

function displayVisits(visits) {
  const visitsDiv = document.getElementById('list_visits');

  if (visitsDiv) {
    const ol = document.createElement('ol');

    visits.forEach(visit => {
      // creating list element
      const li = document.createElement('li');
      // creating div element for list
      const div = document.createElement('div');
      div.className = 'div_list_element'; // specifying class helps with styling

      // creating div element for name of award
      const div_title = document.createElement('div');
      div_title.className = 'div_list_element_title';
      const p_title = document.createElement('p');
      p_title.textContent = `${visit.id}`;
      div_title.appendChild(p_title);
      div.appendChild(div_title);

      // creating div element for rest of award info
      const div_other_info_spacetime = document.createElement('div');
      div_other_info_spacetime.className = 'div_list_element_info_spacetime';
      const p_info = document.createElement('p');
      p_info.textContent = `${visit.location}, ${visit.duration}`;
      div_other_info_spacetime.appendChild(p_info);
      div.appendChild(div_other_info_spacetime);

      li.appendChild(div);
      ol.appendChild(li);

    });

    visitsDiv.appendChild(ol);
  } else {
    console.error('Div with id "list_visits" not found.');
  }
}