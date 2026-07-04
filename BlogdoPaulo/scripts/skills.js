// AULA 5 =============================

const formSkill = document.querySelector('.form-skill');
const inputSkill = document.getElementById('nova-skill');
const listaSkills = document.querySelector('.lista-skills');

const skillsPadrao = [
  'HTML',
  'CSS',
  'JavaScript',
  'Flexbox',
  'Responsividade',
  'Arrow Function',
  'DOM',
  'Template literals',
];

let skills = skillsPadrao;

const renderizarSkills = () => {
  const skillsHTML = skills.map((skill) => {
    return `<li>${skill}</li>`;
  });

  console.log(skillsHTML);
  listaSkills.innerHTML = skillsHTML.join('');
};

//pegar um valor do localstorage
const skillsSalvas = localStorage.getItem('skills');

if (skillsSalvas) {
  skills = JSON.parse(skillsSalvas);
}

const salvarSkills = () => {
  localStorage.setItem('skills', JSON.stringify(skills));
};

formSkill.addEventListener('submit', (evento) => {
  evento.preventDefault();

  const novaSkill = inputSkill.value.trim();

  if (!novaSkill) {
    return;
  }

  skills.push(novaSkill);
  salvarSkills();
  renderizarSkills();

  formSkill.reset();
  inputNome.focus();
});

renderizarSkills();
