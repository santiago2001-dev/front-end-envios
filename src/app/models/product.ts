export  class product{

producto : string;
codigoProuducto : number ;
precio : number ;
cantidad : number ;
constructor(producto : string, codigoProuducto : number , precio: number , cantidad : number){
    this.codigoProuducto = codigoProuducto ;
    this.producto = producto;
    this.precio = precio;
    this.cantidad = cantidad;
}


}