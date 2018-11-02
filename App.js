class Product{
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

class UI{
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card shadow-lg p-3 mb-5 bg-white rounded">
                <div class="card-header">
                    <h4>${product.name}</h4>
                </div>
                <div class="card-body text-center">                                       
                    ${product.price}                    
                </div>
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if (element.name === 'delete') {
            element.parentElement.parentElement.remove()
            this.showMessage('Product Deleted Successfully', 'danger');
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2 shadow-lg p-3 mb-5 rounded`;
        div.appendChild(document.createTextNode(message));
        // Show Element in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

//DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;        
        const price = document.getElementById('price').value;

        const product = new Product(name, price);        
        
        const ui = new UI();

        if(name === '' || price === ''){
           return ui.showMessage('Complete Form Please', 'info');            
        }
        ui.addProduct(product);
        ui.resetForm();

        ui.showMessage('Product Added Successfully', 'success');

        e.preventDefault();
})

document.getElementById('product-list')
    .addEventListener('click', function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);    
})