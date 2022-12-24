import { Product,Products } from "../products";

const store = new Products

describe("Products Model",()=>{
    it('should have an index method',()=>{
        expect(store.index).toBeDefined()
    });

    it("index method return list of products",async ()=>{
        const result = await store.index()
        expect(result).toEqual([])
    })
})