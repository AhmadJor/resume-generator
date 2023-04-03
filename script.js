
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


function generatePdf() {
  const name = document.querySelector('#nameField').value;
  const contact = document.querySelector('#contactField').value;
  const email = document.querySelector('#emailField').value;
  const phone = document.querySelector('#phoneField').value;
  const linkedin = document.querySelector('#linkedField').value;
  const github = document.querySelector('#githubField').value;
  const objective = document.querySelector('#objectiveField').value;

  const experienceSections = document.querySelectorAll('.experience-section');
  const experiences = [];
  experienceSections.forEach(section => {
    const experience = {
      company: section.querySelector('.company-field').value,
      position: section.querySelector('.position-field').value,
      startDate: section.querySelector('.start-date-field').value,
      endDate: section.querySelector('.end-date-field').value,
      description: section.querySelector('.description-field').value,
    };
    experiences.push(experience);
  });

  const skillSections = document.querySelectorAll('.skill-section');
  const skills = [];
  skillSections.forEach(section => {
    const skill = {
      name: section.querySelector('.skill-name-field').value,
      proficiency: section.querySelector('.skill-proficiency-field').value,
    };
    skills.push(skill);
  });

  const projectSections = document.querySelectorAll('.project-section');
  const projects = [];
  projectSections.forEach(section => {
    const project = {
      name: section.querySelector('.project-name-field').value,
      description: section.querySelector('.project-description-field').value,
    };
    projects.push(project);
  });
  const jsPDF = require('jspdf');
  const doc = new jsPDF();
  doc.text(`Name: ${name}`, 10, 10);
  doc.text(`Contact: ${contact}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Phone: ${phone}`, 10, 40);
  doc.text(`LinkedIn: ${linkedin}`, 10, 50);
  doc.text(`GitHub: ${github}`, 10, 60);
  doc.text(`Objective: ${objective}`, 10, 70);

  let y = 90;
  experiences.forEach(experience => {
    doc.text('Experience', 10, y);
    doc.text(`Company: ${experience.company}`, 10, y + 10);
    doc.text(`Position: ${experience.position}`, 10, y + 20);
    doc.text(`Start Date: ${experience.startDate}`, 10, y + 30);
    doc.text(`End Date: ${experience.endDate}`, 10, y + 40);
    doc.text(`Description: ${experience.description}`, 10, y + 50);
    y += 70;
  });

  doc.text('Skills', 10, y);
  skills.forEach(skill => {
    doc.text(`Name: ${skill.name}`, 10, y + 10);
    doc.text(`Proficiency: ${skill.proficiency}`, 10, y + 20);
    y += 40;
  });

  doc.text('Projects', 10, y);
  projects.forEach(project => {
    doc.text(`Name: ${project.name}`, 10, y + 10);
    doc.text(`Description: ${project.description}`, 10, y + 20);
    y += 40;
  });

  doc.save('my-resume.pdf');
}
// const fs = require('fs');
// const jsPDF = require('jspdf');

function generatePdf() {
  const name = document.querySelector('#nameField').value;
  const contact = document.querySelector('#contactField').value;
  const email = document.querySelector('#emailField').value;
  const phone = document.querySelector('#phoneField').value;
  const linkedin = document.querySelector('#linkedField').value;
  const github = document.querySelector('#githubField').value;
  const objective = document.querySelector('#objectiveField').value;

  const experienceSections = document.querySelectorAll('.experience-section');
  const experiences = [];
  experienceSections.forEach(section => {
    const experience = {
      company: section.querySelector('.company-field').value,
      position: section.querySelector('.position-field').value,
      startDate: section.querySelector('.start-date-field').value,
      endDate: section.querySelector('.end-date-field').value,
      description: section.querySelector('.description-field').value,
    };
    experiences.push(experience);
  });

  const skillSections = document.querySelectorAll('.skill-section');
  const skills = [];
  skillSections.forEach(section => {
    const skill = {
      name: section.querySelector('.skill-name-field').value,
      proficiency: section.querySelector('.skill-proficiency-field').value,
    };
    skills.push(skill);
  });

  const projectSections = document.querySelectorAll('.project-section');
  const projects = [];
  projectSections.forEach(section => {
    const project = {
      name: section.querySelector('.project-name-field').value,
      description: section.querySelector('.project-description-field').value,
    };
    projects.push(project);
  });

  const doc = new jsPDF();
  doc.text(`Name: ${name}`, 10, 10);
  doc.text(`Contact: ${contact}`, 10, 20);
  doc.text(`Email: ${email}`, 10, 30);
  doc.text(`Phone: ${phone}`, 10, 40);
  doc.text(`LinkedIn: ${linkedin}`, 10, 50);
  doc.text(`GitHub: ${github}`, 10, 60);
  doc.text(`Objective: ${objective}`, 10, 70);

  let y = 90;
  experiences.forEach(experience => {
    doc.text('Experience', 10, y);
    doc.text(`Company: ${experience.company}`, 10, y + 10);
    doc.text(`Position: ${experience.position}`, 10, y + 20);
    doc.text(`Start Date: ${experience.startDate}`, 10, y + 30);
    doc.text(`End Date: ${experience.endDate}`, 10, y + 40);
    doc.text(`Description: ${experience.description}`, 10, y + 50);
    y += 70;
  });

  doc.text('Skills', 10, y);
  skills.forEach(skill => {
    doc.text(`Name: ${skill.name}`, 10, y + 10);
    doc.text(`Proficiency: ${skill.proficiency}`, 10, y + 20);
    y += 40;
  });

  doc.text('Projects', 10, y);
  projects.forEach(project => {
    doc.text(`Name: ${project.name}`, 10, y + 10);
    doc.text(`Description: ${project.description}`, 10, y + 20);
    y += 40;
  });

  const outputFilename = 'my-resume.pdf';
  fs.writeFile(outputFilename, doc.output('blob'), (err) => {
    if (err) {
      console.error('Error while generating the PDF: ', err);
      } else {
      console.log('PDF generated successfully!');
      }
      });
      }
