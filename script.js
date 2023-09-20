const productList = document.getElementById('productList');
        const searchInput = document.getElementById('searchInput');
        const sortBySelect = document.getElementById('sortBy');

        let products = [];

        function fetchProducts() {
            fetch('https://raw.githubusercontent.com/CynthiaEstherMetilda/Xhrdemo/main/products.json')
                .then(response => response.json())
                .then(data => {
                    products = data;
                    displayProducts();
                })
                .catch(error => console.error('Error fetching products:', error));
        }

        function displayProducts() {
            productList.innerHTML = '';

            const searchTerm = searchInput.value.toLowerCase();
            const sortBy = sortBySelect.value;

            const filteredProducts = products.filter(product => {
                return product.name.toLowerCase().includes(searchTerm);
            });

            filteredProducts.sort((a, b) => {
                if (sortBy === 'name') {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === 'price') {
                    return a.price - b.price;
                }
            });

            filteredProducts.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.name;

                const productInfoDiv = document.createElement('div');
                productInfoDiv.className = 'product-info';

                const productName = document.createElement('h2');
                productName.textContent = product.name;

                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;

                const productPrice = document.createElement('p');
                productPrice.textContent = `Price: $${product.price}`;

                productInfoDiv.appendChild(productName);
                productInfoDiv.appendChild(productDescription);
                productInfoDiv.appendChild(productPrice);

                productDiv.appendChild(productImage);
                productDiv.appendChild(productInfoDiv);

                productList.appendChild(productDiv);
            });
        }

        searchInput.addEventListener('input', displayProducts);
        sortBySelect.addEventListener('change', displayProducts);

        fetchProducts();