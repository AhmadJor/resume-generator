function addExperience() {
  const experienceList = document.getElementById('experience-list');
  const experienceSection = document.querySelector('.experience-section');

  // clone the first experience section element
  const newExperienceSection = experienceSection.cloneNode(true);

  // clear the input fields
  const inputFields = newExperienceSection.querySelectorAll('.form-control');
  inputFields.forEach(field => field.value = '');

  // add the new experience section to the list
  experienceList.appendChild(newExperienceSection);
}

function removeExperience(button) {
  const experienceSection = button.parentNode;
  experienceSection.parentNode.removeChild(experienceSection);
}

function addAcademicProject() {
  const academicProjectsList = document.getElementById('academic-projects-list');
  const academicProjectsSection = document.querySelector('.academic-projects-section');

  // clone the first academic projects section element
  const newAcademicProjectsSection = academicProjectsSection.cloneNode(true);

  // clear the input fields
  const inputFields = newAcademicProjectsSection.querySelectorAll('.form-control');
  inputFields.forEach(field => field.value = '');

  // add the new academic projects section to the list
  academicProjectsList.appendChild(newAcademicProjectsSection);
}

function removeAcademicProject(button) {
  const academicProjectsSection = button.parentNode;
  academicProjectsSection.parentNode.removeChild(academicProjectsSection);
}

function addEducation() {
  const educationSection = `
    <div class="education-section form-group">
      <label for="education-name-field">Name:</label>
      <input type="text" id="education-name-field" class="form-control">
      <label for="education-degree-field">Degree:</label>
      <input type="text" id="education-degree-field" class="form-control">
      <label for="education-start-date-field">Start Date:</label>
      <input type="date" id="education-start-date-field" class="form-control">
      <label for="education-end-date-field">End Date:</label>
      <input type="date" id="education-end-date-field" class="form-control">
      <label for="education-courses-field">Courses:</label>
      <textarea id="education-courses-field" class="form-control"></textarea>
      <button type="button" class="btn btn-danger" onclick="removeEducation(this)">Remove Education</button>
    </div>
  `;
  const educationSectionContainer = document.querySelector('.education-section');
  educationSectionContainer.insertAdjacentHTML('beforeend', educationSection);
}

// Remove Education Section
function removeEducation(button) {
  button.closest('.education-section').remove();
}
