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

    let yPos = 10;
  
    // add personal information section
    doc.setFontSize(16);
    doc.text("Personal information", 10, yPos);
    doc.setLineWidth(0.5);
    yPos += 5;
    doc.line(10, yPos, 200, yPos);
    doc.setFontSize(12);
    yPos += 10;
    doc.text("Full name - " + name, 20, yPos);
    yPos += 10;
    doc.text("Email Address - " + email, 20, yPos);
    yPos += 10;
    doc.text("Phone number - " + phone, 20, yPos);
    yPos += 10;
    doc.text("LinkedIn - " + linkedIn, 20, yPos);
    yPos += 10;
    doc.text("GitHub - " + github, 20, yPos);
    yPos += 20;
    
    // add about me section
    doc.setFontSize(16);
    doc.text("About me", 10, yPos);
    doc.setLineWidth(0.5);
    yPos += 5;
    doc.line(10, yPos, 200, yPos);
    doc.setFontSize(12);
    yPos += 10;
    const objectiveLines = doc.splitTextToSize(objective, 180);
    doc.text(objectiveLines, 10, yPos);
    yPos += objectiveLines.length * 12 + 10;
    
    // add education section
    doc.setFontSize(16);
    doc.text("Education", 10, yPos);
    doc.setLineWidth(0.5);
    yPos += 5;
    doc.line(10, yPos, 200, yPos);
    yPos += 10;
    doc.setFontSize(12);
    for (let i = 0; i < education.length; i++) {
      const edu = education[i];
      doc.text(edu.name+ " - " + edu.degree, 10, yPos);
      doc.text(edu.startDate + " - " + edu.endDate, 160, yPos);
      yPos += 12;
    }
    yPos += 10;
    yPos = checkPage(doc, yPos);
    // add projects section
    doc.setFontSize(16);
    doc.text("Projects", 10, yPos);
    doc.setLineWidth(0.5);
    yPos += 5;
    doc.line(10, yPos, 200, yPos);
    doc.setFontSize(12);
    yPos += 10;
    const projectDescriptionHeight = 15;
    for (let i = 0; i < academicProjects.length; i++) {
      const pro = academicProjects[i];
      doc.text(pro.name + ":", 10, yPos);
      doc.text(" - " + pro.description, 20, yPos + 10);
      doc.text("you can find this project in this link : " + pro.link, 10, yPos + 20);
      const descriptionLines = doc.splitTextToSize(pro.description, 180);
      const descriptionHeight = descriptionLines.length * projectDescriptionHeight;
      yPos += descriptionHeight + 20;
      yPos = checkPage(doc, yPos);
    }
    yPos += 10;
    yPos = checkPage(doc, yPos);
    // add experience section
    doc.setFontSize(16);
    doc.text("Experience", 10, yPos);
    doc.setLineWidth(0.5);
    yPos += 5;
    doc.line(10, yPos , 10 + 200, yPos);
    yPos += 10;
    yPos = checkPage(doc, yPos);
    // add experience details for each section
const experienceSections = document.querySelectorAll('.experience-section');
doc.setFontSize(12);
const experienceDescriptionHeight = 15; // adjust this value as needed
const maxWidth = 180; // adjust this value as needed

experienceSections.forEach((section) => {
  const company = section.querySelector('.experience-company-field').value;
  const position = section.querySelector('.experience-position-field').value;
  const startDate = section.querySelector('.experience-start-date-field').value;
  const endDate = section.querySelector('.experience-end-date-field').value;
  const description = section.querySelector('.experience-description-field').value;
  
  // calculate the height of the description
  const descriptionLines = doc.splitTextToSize(description, maxWidth);
  const descriptionHeight = descriptionLines.length * experienceDescriptionHeight;
  
  yPos = checkPage(doc, yPos);
  
  // add the details to the pdf
  doc.text(company + " | " + position, 10, yPos);
  doc.text(startDate + " - " + endDate, 160, yPos);
  
  // add the description one line at a time
  descriptionLines.forEach((line) => {
    doc.text(line, 10, yPos + 5);
    yPos += 5;
    yPos = checkPage(doc, yPos);
  });
  
  yPos += 10; // add additional spacing between sections
});

// add skills section
doc.setFontSize(16);
doc.text("Skills", 10, yPos);
doc.setLineWidth(0.5);
yPos += 5;
doc.line(10, yPos, 10 + 200, yPos);
yPos += 10;

// add skills details
const skillGroup = document.querySelector('#skillGroups');
const skillTextArea = skillGroup.querySelector('textarea');
const skill = skillTextArea.value;

doc.setFontSize(12);
doc.text(skill, 20, yPos);



  doc.save("resume");
}


function checkPage(doc, currentY) {
  const pageHeight = doc.internal.pageSize.height;
  const contentHeight = currentY + 20; // add some padding at the bottom

  if (contentHeight >= pageHeight) {
    doc.addPage();
    return 20; // start writing from top of new page
  } else {
    return currentY;
  }
}
