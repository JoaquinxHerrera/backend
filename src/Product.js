function notNull(valor, etiqueta){
    if (valor === null || valor === undefined || valor === ""){
        throw new Error(`${etiqueta} value can't be null`)
    }
    return valor;
}

export class Product {
    #price
    #title

    constructor({id, title, description, price, thumbnail, code, stock}) {
        this.id = notNull(id, 'id')
        this.#title = notNull(title, 'title')
        this.description = notNull(description, 'description')
        if(isNaN(parseFloat(price)) || parseFloat(price) <= 0){
            throw new Error ('The price should be higher than 0')
        } 
        this.#price = parseFloat(price, 'price')
        this.thumbnail = notNull(thumbnail, 'thumbnail')
        this.code = notNull(code, 'code')
        if(isNaN(parseFloat(stock)) || parseFloat(stock) < 0){
            throw new Error ('The stock should not be negative')
        } 
        this.stock = parseFloat(stock, 'stock')
    }

    toPOJO() {
        return{
            id: this.id,
            title: this.#title,
            description: this.description,
            price: this.#price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
        }
        
    }
}


 