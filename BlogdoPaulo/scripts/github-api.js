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
  containerProjetos.innerHTML = '<p>Carregando projetos...</p>';

  try {
    // Busca DIRETAMENTE apenas os dois repositórios desejados
    const respostaBetha = await fetch(
      `https://api.github.com/repos/${usuarioGithub}/bethacode`
    );
    const respostaBlog = await fetch(
      `https://api.github.com/repos/${usuarioGithub}/BlogdoPaulo`
    );

    // Se qualquer um dos dois der erro, interrompe o fluxo
    if (!respostaBetha.ok || !respostaBlog.ok) {
      throw new Error('Erro ao buscar os repositórios');
    }

    const repoBetha = await respostaBetha.json();
    const repoBlog = await respostaBlog.json();
    
    // Cria o HTML para o primeiro projeto (bethacode) usando o primeiro gradiente
    const htmlBetha = `
      <article>
        <div class="projeto-imagem ${gradientes[0]}"></div>
        <h3>${repoBetha.name}</h3>
        <p>${repoBetha.description || 'Curso de Programação'}</p>
        <a href="${repoBetha.html_url}" target="_blank">Ver no GitHub</a>
      </article>
    `;

    // Cria o HTML para o segundo projeto (BlogdoPaulo) usando o segundo gradiente
    const htmlBlog = `
      <article>
        <div class="projeto-imagem ${gradientes[1]}"></div>
        <h3>${repoBlog.name}</h3>
        <p>${repoBlog.description || 'Projeto Website Blog do Paulo'}</p>
        <a href="${repoBlog.html_url}" target="_blank">Ver no GitHub</a>
      </article>
    `;

    // Junta os dois HTMLs e coloca no container
    containerProjetos.innerHTML = htmlBetha + htmlBlog;

  } catch (erro) {
    console.error("Erro ao carregar os projetos:", erro);
    containerProjetos.innerHTML = '<p>Não foi possível encontrar os projetos especificados.</p>';
  }
};

carregarPerfil();
carregarProjetos();