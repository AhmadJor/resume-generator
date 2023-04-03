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
function generatePDF() {
  window.jsPDF = window.jspdf.jsPDF;
  // create a new jsPDF instance
  const doc = new jsPDF();

  // get personal information
  const name = document.getElementById("nameField").value;
  const email = document.getElementById("emailField").value;
  const phone = document.getElementById("phoneField").value;
  const linkedIn = document.getElementById("linkedField").value;
  const github = document.getElementById("githubField").value;

  // get professional information
  const objective = document.getElementById("objectiveField").value;

  // get education details
  const educationList = document.getElementsByClassName("education-section");
  const education = [];
  for (let i = 0; i < educationList.length; i++) {
    const name = educationList[i].querySelector("#education-name-field").value;
    const degree = educationList[i].querySelector("#education-degree-field").value;
    const startDate = educationList[i].querySelector("#education-start-date-field").value;
    const endDate = educationList[i].querySelector("#education-end-date-field").value;
    education.push({ name, degree, startDate, endDate });
  }

  // get academic projects details
  const academicProjectsList = document.getElementsByClassName("academic-projects-section");
  const academicProjects = [];
  for (let i = 0; i < academicProjectsList.length; i++) {
    const name = academicProjectsList[i].querySelector("#academic-projects-name-field").value;
    const description = academicProjectsList[i].querySelector("#academic-projects-description-field").value;
  
    const link = academicProjectsList[i].querySelector("#academic-projects-link-field").value;
    academicProjects.push({ name, description, link });
  }

  // add data to pdf
  doc.setFontSize(16);
  doc.text("Personal information", 10, 10);
  doc.setLineWidth(0.5);
  doc.line(10, 10 + 2, 10 + 200, 10 + 2);
  doc.setFontSize(12);
  doc.text("Full name - " + name, 20, 20);
  doc.text("Email Address - " + email, 20, 30);
  doc.text("Phone number" + phone, 20, 40);
  doc.text("Linkedin -" + linkedIn, 20, 50);
  doc.text("GitHub - " + github, 20, 60);
  doc.setFontSize(16);
  doc.text("About me", 10, 80);
  doc.setLineWidth(0.5);
  doc.line(10, 80 + 2, 10 + 200, 80 + 2);
  doc.setFontSize(12);
  doc.text(objective, 10, 90);
  // make it depending on the objective length
  const objectiveLines = doc.splitTextToSize(objective, 200);
  const objectiveHeight = objectiveLines.length * 12;
  doc.text(objectiveLines, 10, 90 + objectiveHeight);
  doc.setFontSize(16);
  doc.text("Education", 10, 110 + objectiveHeight);
  doc.setLineWidth(0.5);
  doc.line(10, 110 + 2 + objectiveHeight, 10 + 200, 110 + 2 + objectiveHeight);
  // add education details
  let yPos = 120 + objectiveHeight;
  for (let i = 0; i < education.length; i++) {
    const edu = education[i];
    doc.text(edu.name, 10, yPos);
    doc.text(" - " + edu.degree, 24, yPos);
    doc.text(edu.startDate + " - " + edu.endDate, 160, yPos);
    yPos += 12;
  }
  doc.setFontSize(16);
  yPos += 10;
  doc.text("Projects", 10, yPos);
  doc.setLineWidth(0.5);
  doc.line(10, yPos + 2, 10 + 200, yPos + 2);
  yPos += 10;
  doc.setFontSize(12);
  const projectDescriptionHeight = 15; // adjust this value as needed
  for (let i = 0; i < academicProjects.length; i++) {
    const pro = academicProjects[i];
    doc.text(pro.name + ":", 10, yPos);
    doc.text(" - " + pro.description, 10, yPos + 10);
    doc.text("you can find this project in this link : " + pro.link, 10, yPos + 20);
    yPos += projectDescriptionHeight;
  }
  doc.setFontSize(16);
yPos += 20;
doc.text("Experience", 10, yPos);
doc.setLineWidth(0.5);
doc.line(10, yPos + 2, 10 + 200, yPos + 2);
yPos += 10;
const experienceDescriptionHeight = 15; // adjust this value as needed
const experienceSections = document.querySelectorAll('.experience-section');
doc.setFontSize(12);
experienceSections.forEach((section) => {
  const company = section.querySelector('.experience-company-field').value;
  const position = section.querySelector('.experience-position-field').value;
  const startDate = section.querySelector('.experience-start-date-field').value;
  const endDate = section.querySelector('.experience-end-date-field').value;
  const description = section.querySelector('.experience-description-field').value;
  doc.text(company, 10, yPos);
  doc.text(position, 24, yPos);
  doc.text(startDate + " - " + endDate, 160, yPos);
  doc.text(description, 10, yPos + 10);
  
  const descriptionLines = doc.splitTextToSize(description, 180); // adjust width as needed
  const descriptionHeight = descriptionLines.length * experienceDescriptionHeight;
  yPos += descriptionHeight + 15; // add 15 units for additional spacing
});
const skills = document.querySelectorAll('#skillGroups textarea[name="skills[]"]');
doc.setFontSize(16);
yPos += 10;
doc.text("Skills", 10, yPos);
doc.setLineWidth(0.5);
doc.line(10, yPos + 2, 10 + 200, yPos + 2);
doc.setFontSize(12);
yPos += 10;
let x = 10;
for (let i = 0; i < skills.length; i++) {
  const skill = skills[i].value;
  doc.text(skill+",", x+10, yPos);
}

  doc.save("resume");
}


function addSkill() {
  var skillGroup = document.createElement("div");
  skillGroup.className = "skill-group";
  skillGroup.innerHTML = `
      <div class="form-group mt-2">
          <label for="skillsField">Skills</label>
          <textarea name="skills[]" placeholder="Enter your skills" class="form-control" rows="5"></textarea>
      </div>
      
      <div class="form-group mt-2">
          <button type="button" class="btn btn-danger" onclick="removeSkill(this)">Remove Skill</button>
      </div>
  `;
  
  var skillGroups = document.getElementById("skillGroups");
  skillGroups.appendChild(skillGroup);
}

function removeSkill(button) {
  var skillGroup = button.parentNode.parentNode;
  var skillGroups = document.getElementById("skillGroups");
  skillGroups.removeChild(skillGroup);
}