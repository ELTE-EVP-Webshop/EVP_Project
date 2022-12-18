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
    const [availableVariations, setAvailableVariations] = useState()
    const [availableCategories, setAvailableCategories] = useState()

    //Form values (Getters & Setters)
    const [prodName, setProdName] = useState("");
    const [prodDesc, setProdDesc] = useState("");
    const [availCat, setAvailCat] = useState([]);
    const [availVar, setAvailVar] = useState([]);
    const [prodPrice, setProdPrice] = useState(0);
    const [prodSalePrice, setProdSalePrice] = useState(0);
    const [prodStock, setProdStock] = useState(0);
    const [prodImage, setProdImage] = useState("");
    const [prodVisible, setProdVisible] = useState(false)

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
        getVariations();
        getCategories();
        }, []);

        const handleChange = (event, id) => {
            //this.setState({count: event.target.value})
            switch(id) {
                    case 'prodName':
                            setProdName(event.target.value)
                    break;
                    case 'prodDesc':
                            setProdDesc(event.target.value)
                    break;
                    case 'availCat':
                            setAvailCat[0](event.target.key)
                            setAvailCat[1](event.target.value)
                    break;
                    case 'availVar':
                        setAvailCat[0](event.target.key)
                        setAvailCat[1](event.target.value)
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
                        break;
                    case 'prodVisible':
                        setProdVisible(event.target.value)
                            break;
            }
            console.log(event.target.value)

          };

          const handleSubmit= (prodName, prodDesc, prodCategory, prodVariation, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible) => {
            
          }

    const hideAll = () => {
        setProductVisible(false);
        setCategoryVisible(false);
        setProductVariationVisible(false);
        setCategoriesVisible(false);
        setVariationsVisible(false);
    }
    const newProduct = () => {
        hideAll();
        setProductVisible(true);

        if(productVisible) {
            setProductVisible(false)
        }
        
       console.log(availableCategories)
        
    }
 
            if(user.roles.includes('ROLE_ADMIN1') || user.roles.includes('ROLE_ADMIN2') ) {
                return (
                    
                        <div>
                               <h1 className='text-center'>Admin panel</h1>
                               <button onClick={() => newProduct()} type='button' className='btn btn-primary'>Új termék létrehozása</button>
                               <button type='button' className='btn btn-primary'>Kategória létrehozása</button>
                               <button type='button' className='btn btn-primary'>Termék variáció létrehozása</button>
                               <button type='button' className='btn btn-primary'>Kategóriák lekérése</button>
                               <button type='button' className='btn btn-primary'>Variációk lekérése</button>
                   
                        

                        {productVisible && 
                            <div>
                                <h3>Új termék adatai</h3>
                                <label for="prodName">Termék neve: </label>
                                <input onChange={(e) => handleChange(e,"prodName")} id="prodName" type="text" required></input>
                                <label for="prodDesc">Termék leírása: </label>
                                <input onChange={(e) => handleChange(e,"prodDesc")} id="prodDesc" type="text" required></input>
                                <label for="prodCategory">Termék kategória: </label>
                                <select onChange={(e) => handleChange(e,"availCat")}>
                                    {availableCategories.map(cat =>
                                    <option key={cat.id} value={cat.category}>{cat.category}</option>
                                    )};
                                </select>
                                <label for="prodVariation">Termék variációja: </label>
                                <select onChange={(e) => handleChange(e,"availVar")}>
                                    {availableVariations.map(vari =>
                                    <>
                                    <option key={vari.id} value={vari.name}>{vari.name}</option>
                                    </>
                                    )};
                                </select>
                                <label for="prodPrice">Termék ára: </label>
                                <input onChange={(e) => handleChange(e,"prodPrice")} id="prodPrice" type="number" required></input>
                                <label for="prodSalePrice">Termék eladási ára: </label>
                                <input onChange={(e) => handleChange(e,"prodSalePrice")} id="prodSalePrice" type="number" required></input>
                                <label for="prodStock">Termék Készlet: </label>
                                <input onChange={(e) => handleChange(e,"prodStock")} id="prodStock" type="number" required></input>
                                <label for="prodImage">Termék kép: </label>
                                <input onChange={(e) => handleChange(e,"prodImage")} id="prodImage" type="file" required></input>
                                <label for="prodVisible">Termék láthatósága: </label>
                                <select onChange={(e) => handleChange(e,"prodVisible")}>
                                    <option id="prodVisible" value="true">Igaz</option>
                                    <option  id="prodVisible" value="false">Hamis</option>
                                    </select>
                                <button onClick={() => handleSubmit(prodName, prodDesc, availCat, availVar, prodPrice, prodSalePrice, prodStock, prodImage, prodVisible)} className='btn btn-primary' type='button'>Új termék felvétele</button>
                            </div>
                            
                        }
                        </div>
                )
            } else {
                return (
                    <div>
                               <h1 className='text-center'>Nincs admin jogosítványod!</h1>
                        </div>
                )
            }
                
        
}


