import React, {useState, useEffect} from 'react'
import {user} from './Header'
import ProductService from '../services/ProductService';


export default function ShoppingCart() {
    //Visibility of administrative features
    const [productVisible, setProductVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [productVariationVisible, setProductVariationVisible] = useState(false);
    const [categories, setCategoriesVisible] = useState(false);
    const [variations, setVariationsVisible] = useState(false);
    const [productToCategoryVisible, setProductToCategoryVisible] = useState(false)
    const [availableVariations, setAvailableVariations] = useState()
    const [availableCategories, setAvailableCategories] = useState()
    const [availableProducts, setAvailableProducts] = useState()
    //Form values (Getters & Setters)
    //Product
    const [prodId, setProdId] = useState(2)
    const [prodName, setProdName] = useState("");
    const [prodDesc, setProdDesc] = useState("");
    const [availCatId, setAvailCatId] = useState(1);
    const [availCatName, setAvailCatName] = useState("none");
    const [availVarId, setAvailVarId] = useState(1);
    const [availVarName, setAvailVarName] = useState("none");
    const [prodPrice, setProdPrice] = useState(0);
    const [prodSalePrice, setProdSalePrice] = useState(0);
    const [prodStock, setProdStock] = useState(0);
    const [prodImage, setProdImage] = useState("");
    const [prodVisible, setProdVisible] = useState(false)
    const [allProdVisible, setAllProdVisible] = useState(false)
    //Category
    const [catId, setCatId] = useState(1)
    const [catName, setCatName] = useState("");
    const [catDesc, setCatDesc] = useState("");
    const [catPrior, setCatPrior] = useState(0);
    const [updateCategoryVisible, setUpdateCategoryVisible] = useState(false);
    //Variation
    const [varId, setVarId] = useState(1);
    const [varName, setVarName] = useState("");
    const [updateVariationVisible, setUpdateVariationVisible] = useState(false);

    useEffect(() => {
        // React advises to declare the async function directly inside useEffect
        async function getVariations() {
            var vari = await ProductService.getVariations();
            setAvailableVariations(vari)
        }
        async function getCategories() {
            var vari = await ProductService.getCategories();
            setAvailableCategories(vari)
        }
        async function getProducts() {
            var vari = await ProductService.getProducts();

            setAvailableProducts(vari)
        }
        getVariations();
        getCategories();
        getProducts();
        }, []);

        const handleChange = (event, selected) => {
            //this.setState({count: event.target.value})
            switch(selected) {
                    case 'prodName':
                            setProdName(event.target.value)
                    break;
                    case 'prodDesc':
                            setProdDesc(event.target.value)
                    break;
                    case 'availCat':
                        var index = event.target.selectedIndex
                        var optionElement = event.target.childNodes[index];
                        var optionElementId = optionElement.getAttribute('id');
                            setAvailCatId(optionElementId)
                            setAvailCatName(event.target.value)
                    break;
                    case 'availVar':
                        var index = event.target.selectedIndex
                        var optionElement = event.target.childNodes[index];
                        var optionElementId = optionElement.getAttribute('id');
                        setAvailVarId(optionElementId)
                        setAvailVarName(event.target.value)
                    break;
                    case 'prodPrice':
                            setProdPrice(event.target.value)
                    break;
                    case 'prodSalePrice':
                            setProdSalePrice(event.target.value)
                    break;
                    case 'prodStock':
                           setProdStock(event.target.value)
                    break;
                    case 'prodImage':
                        setProdImage(event.target.value)
                       // console.log(event.target.files[0])
                        break;
                    case 'prodVisible':
                        setProdVisible(event.target.value)
                        break;
                    case 'catName':
                            setCatName(event.target.value)
                        break;
                    case 'catDesc':
                            setCatDesc(event.target.value)
                         break;
                    case 'catPrior':
                            setCatPrior(event.target.value)
                         break;
                    case 'varName':
                        setVarName(event.target.value)
                        break;
                    case 'availProd':
                        setProdId(event.target.value)
                        break;
                    case 'availCat2':
                        setCatId(event.target.value)
                        break;
                    case 'updateVarName':
                        setVarName(event.target.value)
                        break;
                    case 'updateCatName':
                        setCatName(event.target.value)
                        break;
                    case 'updateCatDesc':
                        setCatDesc(event.target.value)
                        break;
                    case 'updateCatPrior':
                        setCatPrior(event.target.value)
                        break;

            }
            
            console.log(event.target.value)
            console.log(availVarName)
            console.log(availCatName)
          };

          const handleProdSubmit= (prodName, prodDesc, prodCategoryId, prodCategoryName, prodVariationId, prodVariationName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
            ProductService.addProduct(prodName, prodDesc, prodCategoryId, prodCategoryName, prodVariationId, prodVariationName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible);
          }
          const handleCatSubmit= (catName, catDesc, catPrior) => {
            if(catName != "" && catDesc != "") {
            ProductService.createCategory(catName, catDesc, catPrior);
            } else {
                alert("Kérlek töltsd ki a kategória adatait!")
            }
            clearCatFields();
          }

          const handleVarSubmit = (varName) => {
            if(varName != "") {
                ProductService.createVariation(varName)
            } else {
                alert("Kérlek add meg a variáció nevét!")
            }
            setVarName("")
          }

          const handleProdToCatSubmit = (prodId, catId) => {
            if(prodId != 0 && catId != 0) {
                ProductService.addProductToCategory(prodId, catId)
            } else {
                alert("Kérlek válaszd ki a terméket és a hozzá tartozó kategóriát!")
            }

          }

          const clearCatFields = () => {
            setCatName("");
            setCatDesc("");
            setCatPrior(0);
          }

    const hideAll = () => {
        setProductVisible(false);
        setCategoryVisible(false);
        setProductVariationVisible(false);
        setCategoriesVisible(false);
        setVariationsVisible(false);
        setProductToCategoryVisible(false)
        setUpdateCategoryVisible(false)
        setUpdateVariationVisible(false)
        setAllProdVisible(false)
    }
    const newProduct = () => {
        hideAll();
        setProductVisible(true);

        if(productVisible) {
            setProductVisible(false)
        }
        
       console.log(availableCategories)
       console.log(availableVariations)
        
    }

    const getProducts = () => {
        hideAll();
        setAllProdVisible(true);

        if(allProdVisible) {
            setAllProdVisible(false)
        }
        
    console.log(availableProducts)
        
    }

    const getVariations = () => {
        hideAll();
        setProductVariationVisible(true);

        if(productVariationVisible) {
            setProductVariationVisible(false)
        }
        
    
        
    }

    const getCategories = () => {
        hideAll();
        setCategoryVisible(true);

        if(categoryVisible) {
            setCategoryVisible(false)
        }
        
        console.log(availableCategories)
        
    }

    const addCategory = () => {
        hideAll();
        setCategoriesVisible(true);

        if(categories) {
            setCategoriesVisible(false);
        }
    }

        const addVariation = () => {
            hideAll();
            setVariationsVisible(true);
    
            if(variations) {
                setVariationsVisible(false);
            }


    }

    const addProductToCategory = () => {
        hideAll();
        setProductToCategoryVisible(true);

        if(productToCategoryVisible) {
            setProductToCategoryVisible(false)
        }
    }

    const updateVariation = (varId) => {
        hideAll();
        setUpdateVariationVisible(true)
        //setProductVariationVisible(true)
        setVarId(varId)
        if(updateVariationVisible) {
            setUpdateVariationVisible(false)
        }



    }

   const updateVariationConfirm = (varId, varName) => {
    hideAll();
    if(varName != "") {
    ProductService.updateVariation(varId, varName)
    }  else {
        alert("Kérlek töltsd ki az új variáció nevét!")
    }
    setVarName("");
   }

    const updateCategory = (id) => {
        hideAll();
        setUpdateCategoryVisible(true)
        setCatId(id);
        if(updateCategoryVisible) {
            setUpdateCategoryVisible(false)
        }
    }

    const updateCategoryConfirm = (id,  category, smallDesc,  priority) => {
        hideAll();
        if(category != "" && smallDesc != "") {
        ProductService.updateCategory(id, category, smallDesc, priority)
        } else {
            alert("Kérlek töltsd ki az új kategória adatait!")
        }
        setCatName("");
        setCatDesc("");
       }
 
            if(user.roles.includes('ROLE_ADMIN1') || user.roles.includes('ROLE_ADMIN2') ) {
                return (
                    
                        <div>
                               <h1 className='text-center'>Admin panel</h1>
                               <button onClick={() => newProduct()} type='button' className='btn btn-primary'>Új termék létrehozása</button>
                               <button onClick={() => addCategory()} type='button' className='btn btn-primary'>Kategória létrehozása</button>
                               <button onClick={() => addVariation()} type='button' className='btn btn-primary'>Variáció létrehozása</button>
                               <button onClick={() => getProducts()} type='button' className='btn btn-primary'>Termékek lekérése</button>
                               <button onClick={() => getCategories()} type='button' className='btn btn-primary'>Kategóriák lekérése</button>
                               <button onClick={() => getVariations()} type='button' className='btn btn-primary'>Variációk lekérése</button>
                               <button onClick={() => addProductToCategory()} type='button' className='btn btn-primary'>Termék felvétele kategóriához</button>
                   
                        {allProdVisible &&
                            <div>
                                <h3>Összes termék</h3>
                                {availableProducts.map(product =>
                                    <p>Név: {product.p.name}</p>
                                    )}

                            </div>
                        
                        
                        }

                        {productVisible && 
                            <div>
                                <h3>Új termék adatai</h3>
                                <label for="prodName">Termék neve: </label>
                                <input onChange={(e) => handleChange(e,"prodName")} id="prodName" type="text" required></input>
                                <label for="prodDesc">Termék leírása: </label>
                                <input onChange={(e) => handleChange(e,"prodDesc")} id="prodDesc" type="text" required></input>
                                <label for="prodCategory">Termék kategória: </label>
                                <select onChange={(e) => handleChange(e,"availCat")}>
                                <option id="nincs" value="none">Nincs</option>
                                    {availableCategories.map(cat =>
                                    <>
                                    
                                    <option id={cat.id} value={cat.id}>{cat.category}</option>
                                    </>
                                    )};
                                </select>
                                <label for="prodVariation">Termék variációja: </label>
                                <select onChange={(e) => handleChange(e,"availVar")}>
                                <option id="nincs" value="none">Nincs</option>
                                    {availableVariations.map(vari =>
                                    <>
                                    
                                    <option id={vari.id} value={vari.name}>{vari.name}</option>
                                    
                                    </>
                                    )};
                                </select>
                                <label for="prodPrice">Termék ára: </label>
                                <input onChange={(e) => handleChange(e,"prodPrice")} id="prodPrice" type="number" required></input>
                                <label for="prodSalePrice">Termék eladási ára: </label>
                                <input onChange={(e) => handleChange(e,"prodSalePrice")} id="prodSalePrice" type="number" required></input>
                                <label for="prodStock">Termék Készlet: </label>
                                <input onChange={(e) => handleChange(e,"prodStock")} id="prodStock" type="number" required></input>
                                <label for="prodImage">Termék kép URL: </label>
                                <input onChange={(e) => handleChange(e,"prodImage")} id="prodImage" type="text" required></input>
                                <label for="prodVisible">Termék láthatósága: </label>
                                <select onChange={(e) => handleChange(e,"prodVisible")}>
                                    <option id="prodVisible" value="true">Igaz</option>
                                    <option  id="prodVisible" value="false">Hamis</option>
                                    </select>
                                <button onClick={() => handleProdSubmit(prodName, prodDesc, availCatId, availCatName, availVarId, availVarName, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible)} className='btn btn-primary' type='button'>Új termék felvétele</button>
                            </div>
                            
                        }
                        {productVariationVisible &&
                            availableVariations.map(variation =>
                                <>
                                    <p>{variation.id} - {variation.name}</p><button onClick={() => updateVariation(varId)} type='button' className='btn btn-danger'>Módosítás</button>
                                   
                                    </>
                                )
                                

                         }
                          {updateVariationVisible &&
                                    <>
                                        <p>Variáció neve:</p>
                                        <input onChange={(e) => handleChange(e, "updateVarName")} type="text" required></input>
                                        <button type="button" className='btn btn-info' onClick={() => updateVariationConfirm(varId, varName)}>Módosít</button>
                                        </>
                                    }
                         {categoryVisible &&
                            
                            availableCategories.map(cat =>
                                <>
                                    <p>{cat.id} - {cat.category}</p><button onClick={() => updateCategory(cat.id)} type='button' className='btn btn-danger'>Módosítás</button>
                                    </>
                                )  
                                
                         }
                         {updateCategoryVisible &&
                            <>
                                        <p>Kategória neve:</p>
                                        <input className='mx-3' onChange={(e) => handleChange(e, "updateCatName")} id="updCatName" type="text" required></input>
                                        <p>Kategória leírása:</p>
                                        <input className='mx-3' onChange={(e) => handleChange(e, "updateCatDesc")}  id="updCatDesc" type="text" required></input>
                                        <p>Kategória prioritása:</p>
                                        <input onChange={(e) => handleChange(e, "updateCatPrior")}  id="updCatPrior" type="text" required></input>
                                        <button type="button" className='btn btn-info' onClick={() => updateCategoryConfirm(catId, catName, catDesc, catPrior)}>Módosít</button>
                            </>
                         
                         }
                         {categories &&
                            <div>
                                <h3>Új kategória adatai</h3>
                                <label for="catName">Kategória neve: </label>
                                <input onChange={(e) => handleChange(e,"catName")} id="catName" type="text" required></input>
                                <label for="catDesc">Kategória leírása: </label>
                                <input onChange={(e) => handleChange(e,"catDesc")} id="catDesc" type="text" required></input>
                                <label for="catPrior">Kategória prioritása: </label>
                                <input onChange={(e) => handleChange(e,"catPrior")} id="prodDesc" type="number" required></input>
                                <button onClick={() => handleCatSubmit(catName, catDesc, catPrior)} className='btn btn-primary' type='button'>Új kategória felvétele</button>
                            </div>
                                
                         }
                         {variations &&
                            <div>
                                <h3>Új variáció adatai</h3>
                                <label for="varName">Variáció neve: </label>
                                <input onChange={(e) => handleChange(e,"varName")} id="varName" type="text" required></input>
    
                                <button onClick={() => handleVarSubmit(varName)} className='btn btn-primary' type='button'>Új variáció felvétele</button>
                            </div>
                                
                         }
                         {productToCategoryVisible && 
                            <div>
                                 <h3>Termék felvétele kategóriához</h3>
                                <label>Termék: </label>
                                <select onChange={(e) => handleChange(e,"availProd")}>
                                    {availableProducts.map(prod =>
                                    <>
                                    <option id={prod.p.id} value={prod.p.id}>{prod.p.name}</option>
                                    </>
                                    )};
                                </select>
                                <label>Kategória: </label>
                                <select onChange={(e) => handleChange(e,"availCat2")}>
                                    {availableCategories.map(cat =>
                                    <>
                                    <option id={cat.id} value={cat.id}>{cat.category}</option>
                                    </>
                                    )};
                                </select>
    
                                <button onClick={() => handleProdToCatSubmit(prodId, catId)} className='btn btn-primary' type='button'>Termék felvétele a kiválasztott kategóriához</button>
                            </div>
                         
                         }
                        </div>
                        
                )
                
            }

            
            else {
                return (
                    <div>
                               <h1 className='text-center'>Nincs admin jogosítványod!</h1>
                        </div>
                )
            }

            
                
        
}


