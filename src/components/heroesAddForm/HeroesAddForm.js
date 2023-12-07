import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import store from "../../store";
import { useHttp } from "../../hooks/http.hook";
import {heroAdded} from "../../slices/heroesSlice";
import { selectAll } from "../../slices/filtersSlice";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState("");
    const [heroDescr, setHeroDescr] = useState("");
    const [heroElement, setHeroElement] = useState("");

    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement
        };

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(res => console.log(res, "POST is successful"))
            .then(dispatch(heroAdded(newHero)))
            .catch(err => console.log(err));

        setHeroName("");
        setHeroDescr("");
        setHeroElement("");
    }

    const renderFilters = (filters, status) => {
        console.log("filter");
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, label}) => {
                if (name === "all") {
                    // eslint-disable-next-line
                    return;
                }

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    const memoizedFilters = useMemo(() => renderFilters(filters, filtersLoadingStatus), [filters, filtersLoadingStatus]);

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name"
                    placeholder="Как меня зовут?" 
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {memoizedFilters}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;