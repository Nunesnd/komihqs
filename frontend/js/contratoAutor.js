document.addEventListener('DOMContentLoaded', () => {
  console.log('JS carregado');
  const checkbox = document.getElementById('aceitarContrato');
  const campos = document.getElementById('camposAutor');

  if (!checkbox || !campos) {
    console.error('Elementos não encontrados');
    return;
  }

  checkbox.addEventListener('change', () => {
    console.log('Checkbox clicado. Estado:', checkbox.checked);
    campos.style.display = checkbox.checked ? 'block' : 'none';
  });
});
