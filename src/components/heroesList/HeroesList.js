import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useGetHeroesQuery, useDeleteHeroMutation } from '../../api/apiSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import "./heroesList.scss";

const HeroesList = () => {

    const {
        data: heroes = [],
        isFetching,
        isLoading,
        isError
    } = useGetHeroesQuery();

    const [deleteHero] = useDeleteHeroMutation();

    const activeFilter = useSelector(state => state.filters.activeFilter);
    const filteredHeroes = useMemo(() => {
        const filteredHeroes = heroes.slice();
        return activeFilter === "all" ? filteredHeroes : filteredHeroes.filter(item => item.element === activeFilter);
    }, [heroes, activeFilter]);
    
    const handleDelete = useCallback((id) => {
        deleteHero(id);
        // eslint-disable-next-line  
    }, []);

    if (isLoading || isFetching) {
        return <Spinner/>;
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нету</h5>
                </CSSTransition>
            );
        }

        return arr.map(({id, ...props}) => {
            return (
            <CSSTransition
                timeout={500}
                key={id}
                classNames="hero">
                <HeroesListItem handleDelete={() => handleDelete(id)} {...props}/>
            </CSSTransition>
            );
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;