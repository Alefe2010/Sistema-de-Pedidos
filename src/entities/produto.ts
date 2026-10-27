/**O readonly no TypeScript torna um atributo imutável, ou seja, ele só pode ser definido no momento da declaração ou dentro do construtor (constructor). Depois disso, o valor não pode ser modificado. */

export class Produto {
  public readonly _id: number; 
  private _preco: number;
  private _nome: string;

  constructor(id: number, nome: string, preco: number) {
    this._id = id;
    this._preco = preco;
    this._nome = nome
  }
  get id(): number{
    return this._id
  }
  get nome(): string{
    return this._nome
  }
  get preco(): number{
    return this._preco
  }
  validarProduto(){
    if(this._preco < 0)
        return "Este é um produto inválido"
  }
  set preco(newValue: number){
        if (newValue < 0) {
            throw new Error("O preço não pode ser menor que zero!");
        }
        this._preco = newValue
    }
}