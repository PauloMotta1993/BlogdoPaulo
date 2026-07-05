// ==================== ELEMENTOS ====================

const fotoPerfil = document.querySelector("header img");
const nomePerfil = document.querySelector("header h1");
const cargoPerfil = document.querySelector(".cargo");
const containerProjetos = document.querySelector(".projetos");

// Usuário do GitHub
const usuarioGithub = "PauloMotta1993";

// ==================== PERFIL ====================

const carregarPerfil = async () => {
  try {
    const resposta = await fetch("perfil.json");

    if (!resposta.ok) {
      throw new Error("Erro ao carregar perfil.");
    }

    const dados = await resposta.json();

    fotoPerfil.src = dados.foto;
    fotoPerfil.alt = dados.nome;

    nomePerfil.textContent = dados.nome;
    cargoPerfil.textContent = dados.cargo;

  } catch (erro) {
    console.error("Erro:", erro);

    nomePerfil.textContent = "Paulo Henrique Milanez Motta";
    cargoPerfil.textContent = "Analista de Suporte";
  }
};

// ==================== PROJETOS ====================

const gradientes = [
  "projeto-1",
  "projeto-2",
  "projeto-3"
];

const carregarProjetos = async () => {

  containerProjetos.innerHTML = "<p>Carregando projetos...</p>";

  try {

    const resposta = await fetch(
      `https://api.github.com/users/${usuarioGithub}/repos?sort=updated&per_page=9`
    );

    if (!resposta.ok) {
      throw new Error("Erro ao carregar repositórios.");
    }

    const repositorios = await resposta.json();


const htmls = repos.map((repo, index) => {
      // index % 3 cicla entre os gradientes: 0, 1, 2, 0, 1, 2...
      const gradiente = gradientes[index % 3];

      return `
        <article>
          <div class="projeto-imagem ${gradiente}"></div>
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Repositório sem descrição.'}</p>
          <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
        </article>
      `;
    });

    containerProjetos.innerHTML = htmls.join('');
  } catch (erro) {}
};

carregarPerfil();
carregarProjetos();