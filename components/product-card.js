class productCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.cantidad = 1;
    this.agregarCarrito = false;
    this.corazon = false;
    this.puntaje = 1;
  }

  static get observedAttributes() {
    return ["img", "titulo", "desc", "precio", "categoria", "color", "puntaje"];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if(name === "img"){
        this.img = newVal;
    }
    if(name === "titulo"){
        this.titulo = newVal;
    }
    if(name === "desc"){
        this.desc = newVal;
    }
    if(name === "precio"){
        this.precio = newVal;
    }
    if(name === "categoria"){
        this.categoria = newVal;
    }
    if(name === "color"){
        this.color = newVal;
    }
    if(name === "puntaje"){
        this.puntaje = newVal;
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const shadow = this.shadowRoot;

    const btnCarrito = shadow.querySelector(".add-cart");
    const btnAddCantidad = shadow.querySelector(".btn-plus");
    const btnQuitarCantidad = shadow.querySelector(".btn-minus");
    const cantidadElement = shadow.querySelector(".qty-count");
    const corazonElement = shadow.querySelector("#corazon");
    const stars = shadow.querySelectorAll(".star");
    let selectedRating = 0;

    btnCarrito.addEventListener("click", () => {
      this.agregarCarrito = !this.agregarCarrito;
      btnCarrito.textContent = this.agregarCarrito ? "AGREGADO" : "AGREGAR AL CARRITO";
      btnCarrito.style.backgroundColor = this.agregarCarrito ? "#00c853" : "#f4b400";
    });

    btnAddCantidad.addEventListener("click", () => {
      this.cantidad++;
      cantidadElement.textContent = this.cantidad;
    });

    btnQuitarCantidad.addEventListener("click", () => {
      if (this.cantidad > 1) {
        this.cantidad--;
        cantidadElement.textContent = this.cantidad;
      }
    });

    corazonElement.addEventListener("click", () => {
        this.corazon = !this.corazon;
        corazonElement.innerHTML = this.corazon
        ?`
            <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f4b400" stroke-width="1.5"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z" fill="#f4b400"></path></svg>
        `
        :`
            <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f4b400"><path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="#f4b400" stroke-width="1.5" stroke-linejoin="round"></path></svg>
        `;
    });

    stars.forEach(star => {
        star.addEventListener("click", (e) => {
            selectedRating = parseInt(e.target.dataset.index);
            updateStarDisplay();
        });
    });

    const updateStarDisplay = () => {
        stars.forEach((star, index) => {
            star.textContent = index < selectedRating ? "★" : "☆";
        });
    };
  }

  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
    <main class="tarjeta">
        <div class="banner"></div>
        <section class="img-container">
            <img src="${this.img}">
        </section>
        <section class="content">
            <div class="container-flex">
                <span class="collection">${this.categoria}</span>
                <div id="corazon">
                    <?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#f4b400"><path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="#f4b400" stroke-width="1.5" stroke-linejoin="round"></path></svg>
                </div>
            </div>
            <h2>${this.titulo}</h2>
            <p>${this.desc || ''}</p>
            <div class="estrellas">
                ${[...Array(5)].map((_, i) => `<span class="star" data-index="${i + 1}">☆</span>`).join('')}
            </div>
            <div class="price-qty">
                <strong>$${this.precio}</strong>
                <div class="qty-controls">
                    <button class="btn-minus">-</button>
                    <span class="qty-count">${this.cantidad}</span>
                    <button class="btn-plus">+</button>
                </div>
            </div>
            <button class="add-cart">Agregar al Carrito</button>
        </section>
    </main>
      ${this.getStyle()}
    `;
    return template;
  }

  getStyle() {
    return `
    <style>
        * {
            box-sizing: border-box;
        }
    
        :host {
            font-family: 'Segoe UI', sans-serif;
            display: inline-block;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            max-width: 320px;
            background: #fff;
            position: relative;
        }
    
        .tarjeta {
            display: flex;
            flex-direction: column;
            position: relative;
        }
    
        .banner {
            position: absolute;
            top: 0;
            left: -90%;
            width: 200%;
            height: 40%;
            background: ${this.color};
            transform: rotate(-30deg);
        }
    
        .img-container {
            padding: 25px;
            position: relative;
            z-index: 1;
        }
    
        .img-container img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-radius: 20px;
        }
    
        .content {
            padding: 1rem;
        }
        
        .container-flex{
            display: flex;
            justify-content: space-between;
        }
    
        .collection {
            display: inline-block;
            background: #f1f1f1;
            padding: 0.2rem 0.6rem;
            border-radius: 12px;
            font-size: 0.75rem;
            color: #333;
            margin-bottom: 0.5rem;
        }

        #corazon{
            cursor: pointer;
        }
    
        h2 {
            margin: 0.25rem 0;
            color: ${this.color};
            font-size: 1.2rem;
        }
    
        p {
            color: #666;
            font-size: 0.85rem;
        }
    
        .estrellas {
            cursor: pointer;
            color: #f5a623;
            font-size: 1.5rem;
            margin: 0.5rem 0;
        }
    
        .price-qty {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.5rem;
        }
    
        .price-qty strong {
            font-size: 1.5rem;
            color: #222;
        }
    
        .qty-controls {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    
        .qty-controls button {
            cursor: pointer;
            width: 28px;
            height: 28px;
            font-size: 1.2rem;
            font-weight: bold;
            border: none;
            background: #e0e0e0;
            border-radius: 5px;
            cursor: pointer;
        }
    
        .qty-count {
            font-size: 1rem;
            min-width: 20px;
            text-align: center;
        }
    
        .add-cart {
            width: 100%;
            margin-top: 1rem;
            padding: 0.75rem;
            background-color: #f4b400;
            border: none;
            border-radius: 10px;
            color: #000;
            font-weight: bold;
            text-transform: uppercase;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
    </style>
    `;
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
  }
}

customElements.define("product-card", productCard);
