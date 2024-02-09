document.addEventListener('DOMContentLoaded', function () {
  fetch('./preprints.csv')
    .then(response => response.text())
    .then(data => {
      const preprints = parseCSV(data);
      displayPreprints(preprints);
    })
    .catch(error => console.error('Error fetching CSV:', error));
});

function parseCSV(csv) {
  const lines = csv.split('\n');
  const preprints = [];

  for (let i = 1; i < lines.length; i++) {
    const [id, authors, season, year, urllink] = lines[i].split(';');
    preprints.push({ id, authors, season, year, urllink });
  }

  return preprints;
}

function displayPreprints(preprints) {
  const preprintsDiv = document.getElementById('list_preprints');

  if (preprintsDiv) {
    const ol = document.createElement('ol');

    preprints.forEach(preprint => {
      // creating list element
      const li = document.createElement('li');
      // creating div element for list
      const div = document.createElement('div');
      div.className = 'div_list_element'; // specifying class helps with styling

      // creating div element for preprint title
      const div_title = document.createElement('div');
      div_title.className = 'div_list_element_title';
      const p_title = document.createElement('p');
      p_title.textContent = `${preprint.id}`
      div_title.appendChild(p_title);
      div.appendChild(div_title);

      // creating div element for link
      const div_link = document.createElement('div');
      div_link.className = 'div_list_element_link';
      const p_link = document.createElement('p');
      // bold and underlined sign for downloading
      const bold_link = document.createElement('b');
      bold_link.textContent = "Link:";
      p_link.appendChild(bold_link);
      div_link.appendChild(p_link);
      // image for download
      const anchor_link = document.createElement('a');
      const image_link = document.createElement('img');
      image_link.src = '../../icons/link_icon.png';
      image_link.alt = 'Link to Preprint';
      image_link.width = 15;
      anchor_link.appendChild(image_link);
      anchor_link.href = `${preprint.urllink}`;
      anchor_link.setAttribute('target', '_blank');
      div_link.append(anchor_link);
      div.appendChild(div_link);

      // creating div element for authors
      const div_authors = document.createElement('div');
      div_authors.className = 'div_list_element_authors';
      const p_authors = document.createElement('p');
      // bold sign for prize
      const bold_authors = document.createElement('b');
      bold_authors.textContent = "Authors: ";
      p_authors.appendChild(bold_authors);
      p_authors.innerHTML += `${preprint.authors}`;
      div_authors.appendChild(p_authors);
      div.appendChild(div_authors);
      
      // creating div element for rest of preprint info
      const div_other_info_spacetime = document.createElement('div');
      div_other_info_spacetime.className = 'div_list_element_info_spacetime';
      const p_info = document.createElement('p');
      p_info.textContent = `${preprint.season} ${preprint.year}`;
      div_other_info_spacetime.appendChild(p_info);
      div.appendChild(div_other_info_spacetime);

      li.appendChild(div);
      ol.appendChild(li);

    });

    preprintsDiv.appendChild(ol);
  } else {
    console.error('Div with id "list_preprints" not found.');
  }
}