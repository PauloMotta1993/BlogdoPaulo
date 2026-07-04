// Selecionar os elementos que a API vai preencher
const fotoPerfil = document.querySelector("header img");
const nomePerfil = document.querySelector("header h1");
const cargoPerfil = document.querySelector(".cargo");
const containerProjetos = document.querySelector(".projetos");

// Usuário do GitHub
const usuarioGithub = "PauloMotta1993";

// ==================== PERFIL ====================

const carregarPerfil = async () => {
  try {
    const resposta = await fetch(
      `https://api.github.com/users/${usuarioGithub}`
    );

    if (!resposta.ok) {
      throw new Error(`Erro ao buscar perfil (${resposta.status})`);
    }

    const dados = await resposta.json();

    fotoPerfil.src = dados.avatar_url;
    fotoPerfil.alt = dados.name || usuarioGithub;

    nomePerfil.textContent = dados.name || "Paulo Motta";
    cargoPerfil.textContent = dados.bio || "Analista de Suporte";
  } catch (erro) {
    console.error("Não foi possível carregar o perfil:", erro);

    nomePerfil.textContent = "Perfil não encontrado";
    cargoPerfil.textContent = "Não foi possível carregar os dados.";
  }
};

// ==================== PROJETOS ====================

const gradientes = ['projeto-1', 'projeto-2', 'projeto-3'];

const carregarProjetos = async () => {
  // loading
  containerProjetos.innerHTML = '<p>Carregando projeto...</p>';

  try {
    // Busca DIRETAMENTE apenas o repositório "bethacode"
    const resposta = await fetch(
      `https://api.github.com/repos/${usuarioGithub}/bethacode`
    );
    
    // Se der erro (ex: nome do repo estiver incorreto), interrompe o fluxo
    if (!resposta.ok) {
      throw new Error('Erro ao buscar o repositório: ' + resposta.status);
    }

    const repo = await resposta.json();
    
    // Como é apenas um projeto, usamos o primeiro gradiente da lista (índice 0)
    const gradiente = gradientes[0];

    // Cria o HTML apenas para o projeto específico, sem precisar usar map()
    const html = `
      <article>
        <div class="projeto-imagem ${gradiente}"></div>
        <h3>${repo.name}</h3>
        <p>${repo.description || 'Repositório sem descrição.'}</p>
        <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
      </article>
    `;

    containerProjetos.innerHTML = html;
  } catch (erro) {
    console.error("Erro ao carregar o projeto:", erro);
    containerProjetos.innerHTML = '<p>Não foi possível encontrar o projeto especificado.</p>';
  }
};

carregarPerfil();
carregarProjetos();