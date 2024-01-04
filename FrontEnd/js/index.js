async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  const works = await reponse.json();

  return works;
}

async function showWorks() {
  const works = await getWorks();
  for (let i = 0; i < works.length; i++) {
    const article = works[i];

    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = article.imageUrl;
    image.alt = article.title;
    const figcaption = document.createElement("figcaption");
    figcaption.innerText = article.title;

    gallery.appendChild(figure);
    figure.appendChild(image);
    figure.appendChild(figcaption);
  }
}

showWorks();
